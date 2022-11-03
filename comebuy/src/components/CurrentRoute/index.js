/* eslint-disable no-useless-return */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import BranchItem from '../BranchItem';
import style from './style';

import { DEPLOYED_WS } from '../../constant';
import SnackBarAlert from '../SnackBarAlert';
import { currentUser } from '../../redux/selectors';
import { getBranchAndTotalStock } from '../../redux/slices/branchSlice';
import requestProdApi from '../../api/requestProductAPI';
import RequestItem from '../RequestItem/index';
import CreateProdReqModal from '../CreateProdReqModal/index';
import MenuDropDown from '../MenuDropDown';
import DistributionModalVer2 from '../DistributionModalVer2/index';
import callToast from '../../helperToast/index';

export default function CurrentRoute() {
    const _currentUser = useSelector(currentUser);
    const socket = io(DEPLOYED_WS, {
        transports: ['websocket'],
    });
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openModalDistribution, setOpenModalDistribution] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClickBigIcon = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const closeAlert = () => setAlert({ ...alert, open: false });

    const fetchData = async () => {
        if (_currentUser.role !== 'admin') {
            await requestProdApi
                .getReqFromMe(_currentUser.branch.branchid)
                .then((data) => {
                    let temp1 = [];
                    data.data.map((i) => {
                        if (i.status === 'pending') {
                            temp1.push(i);
                        }
                    });
                    setList(temp1.reverse());
                })
                .catch(() => {
                    console.log('Error load request list');
                });
        } else {
            try {
                const temp = await dispatch(getBranchAndTotalStock());
                const result = unwrapResult(temp);
                setList(result);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSocket = () => {
        socket.on('new-product-request', (message) => {
            const data = JSON.parse(message);
            if (data.fromBranchId === _currentUser.branch.branchid) {
                if (list.find((ite) => ite.requestId === data.requestId) === undefined) {
                    setList((prev) => [data, ...prev]);
                }
            }
        });
    };

    const listenStatusReqChange = () => {
        socket.on('update-status-product-request', () => {
            fetchData();
        });
    };

    const listenDealRequest = () => {
        socket.on('deal-request', (message) => {
            const data = JSON.parse(message);
            if (data.type === 'single') {
                if (data.request.fromBranchId === _currentUser.branch.branchid) {
                    callToast.dealSingleToast(data);
                    fetchData();
                }
            }
            if (data.type === 'multiple' && data.userID !== _currentUser.userID) {
                callToast.dealMultipleToast(data);
                fetchData();
            }
        });
    };

    useEffect(() => {
        handleSocket();
        listenStatusReqChange();
        listenDealRequest();
        fetchData();
        setIsLoading(false);
        return () => {};
    }, []);

    const handleAction = async (e) => {
        if (e === 'create-new') {
            handleCloseMenu();
            setOpenModal(true);
        } else if (e === 'cancel-all') {
            if (list.length !== 0) {
                handleCloseMenu();
                setOpenBackdrop(true);
                const params = {
                    type: '10',
                    request: {},
                    myBranchId: _currentUser.branch.branchid,
                    userID: _currentUser.userID,
                    role: _currentUser.role,
                };
                await requestProdApi.updateReqStatus(params).then(() => {
                    setOpenBackdrop(false);
                    setAlert({
                        ...alert,
                        open: true,
                        severity: 'success',
                        message: 'Cancelled all requests successfully',
                    });
                });
            } else {
                setAlert({
                    ...alert,
                    open: true,
                    severity: 'warning',
                    message: 'No records found',
                });
            }
        } else {
            handleCloseMenu();
            setOpenModalDistribution(true);
        }
    };

    return (
        <Grid item xs={_currentUser.role !== 'admin' ? 4 : 6} sx={{ pt: 2, pl: 2, pr: 1 }}>
            <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
                <Tooltip title="Current route actions">
                    <IconButton
                        onClick={handleClickBigIcon}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={openMenu ? 'current-request-route-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                    >
                        <AddCircleIcon sx={style.bigIcon} />
                    </IconButton>
                </Tooltip>
                <MenuDropDown
                    role={_currentUser.role}
                    anchorEl={anchorEl}
                    id="current-request-route-menu"
                    open={openMenu}
                    handleClose={handleCloseMenu}
                    handleClickMenuItem={(e) => handleAction(e)}
                />
                {_currentUser.role === 'admin' ? (
                    <Typography sx={style.tabTitle}>Current branches</Typography>
                ) : (
                    <Typography sx={style.tabTitle}>Current Request</Typography>
                )}
            </Stack>
            {isLoading ? (
                <CircularProgress sx={{ width: '100%', alignSelf: 'center' }} color="secondary" />
            ) : (
                <Stack sx={style.stackContent} direction="column">
                    {_currentUser.role === 'admin'
                        ? list.map((item) => <BranchItem key={item.branchid} branch={item} admin={_currentUser} />)
                        : list.map((request) => (
                              <RequestItem key={request.requestProductId} request={request} currUser={_currentUser} />
                          ))}
                </Stack>
            )}

            <CreateProdReqModal open={openModal} closeModal={() => setOpenModal(false)} />
            <DistributionModalVer2
                type="all"
                user={_currentUser}
                branchId={list}
                open={openModalDistribution}
                closeModal={() => setOpenModalDistribution(false)}
                currentMainBranchId={_currentUser.branch.branchid}
            />
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <SnackBarAlert
                open={alert.open}
                handleClose={closeAlert}
                severity={alert.severity}
                message={alert.message}
            />
        </Grid>
    );
}
