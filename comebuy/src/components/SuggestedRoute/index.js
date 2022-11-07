/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

import { Grid, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuDropDown from '../MenuDropDown';

import RequestItem from '../RequestItem';
import SnackBarAlert from '../SnackBarAlert';
import style from './style';
import { DEPLOYED_WS } from '../../constant';
import { currentUser } from '../../redux/selectors';
import requestProdApi from '../../api/requestProductAPI';
import callToast from '../../helperToast/index';

export default function SuggestedRoute() {
    const _currentUser = useSelector(currentUser);
    const socket = io(DEPLOYED_WS, {
        transports: ['websocket'],
    });
    const [listRequestPending, setListRequestPending] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openBackdrop, setOpenBackdrop] = useState(false);
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

    const fetchReq = async () => {
        await requestProdApi
            .getReqToMine(_currentUser.branch.branchid)
            .then((data) => {
                let temp1 = [];
                data.data.map((i) => {
                    if (i.status === 'pending') {
                        temp1.push(i);
                    }
                });
                setIsLoading(false);
                setListRequestPending(temp1.reverse());
            })
            .catch(() => {
                console.log('Error load request list');
            });
    };

    const handleSocket = () => {
        socket.on('new-product-request', (message) => {
            const data = JSON.parse(message);
            if (data.toBranchId === _currentUser.branch.branchid) {
                if (listRequestPending.find((ite) => ite.requestId === data.requestId) === undefined) {
                    fetchReq();
                    callToast.newReqToast(data.fromBranchId);
                }
            }
        });
    };

    const listenStatusReqChange = () => {
        socket.on('update-status-product-request', (message) => {
            const data = JSON.parse(message);
            if (data.type === '1' && data.request.toBranchId === _currentUser.branch.branchid) {
                setIsLoading(true);
                fetchReq();
                callToast.cancelOneToast(data);
            }
            if (data.type === '2' && data.request.fromBranchId === _currentUser.branch.branchid) {
                callToast.declineOneToast(data);
            }
            if (data.type === '2' && data.request.toBranchId === _currentUser.branch.branchid) {
                setIsLoading(true);
                fetchReq();
            }
            if (data.type === '10' && data.userId !== _currentUser.userID) {
                callToast.cancelAllToast(data);
                fetchReq();
            }
            if (data.type === '20' && data.userId !== _currentUser.userID) {
                setIsLoading(true);
                fetchReq();
                callToast.declineAllToast(data);
            }
        });
    };

    const listenDealRequest = () => {
        socket.on('deal-request', (message) => {
            const data = JSON.parse(message);
            if (data.type === 'single') {
                if (data.request.toBranchId === _currentUser.branch.branchid) {
                    fetchReq();
                }
            }
            if (data.type === 'multiple' && data.userID === _currentUser.userID) {
                fetchReq();
            }
        });
    };

    useEffect(async () => {
        handleSocket();
        listenStatusReqChange();
        listenDealRequest();
        fetchReq();
        return () => {};
    }, []);

    const handleAction = async (e) => {
        if (listRequestPending.length === 0) {
            setAlert({
                ...alert,
                open: true,
                severity: 'warning',
                message: 'No records found',
            });
        } else {
            let params = {
                type: '20',
                request: {},
                myBranchId: _currentUser.branch.branchid,
                userID: _currentUser.userID,
                role: _currentUser.role,
            };
            handleCloseMenu();
            if (e === 'decline-all' && listRequestPending.length > 0) {
                setOpenBackdrop(true);
                const temp = { ...params, type: '20' };
                await requestProdApi.updateReqStatus(temp).then(() => {
                    setOpenBackdrop(false);
                    setAlert({
                        ...alert,
                        open: true,
                        severity: 'success',
                        message: 'Declined all requests successfully',
                    });
                });
            } else if (e === 'supply-all') {
                setOpenBackdrop(true);
                const pars = {
                    branchId: _currentUser.branch.branchid,
                    userID: _currentUser.userID,
                    role: _currentUser.role,
                };
                await requestProdApi.dealMultiReq(pars).then(() => {
                    setOpenBackdrop(false);
                });
            }
        }
    };

    return (
        <Grid item xs={_currentUser.role !== 'admin' ? 4 : 6} sx={{ pl: 2, pr: 1 }}>
            <Stack direction="row" spacing={1} sx={{ pb: 0.5, mt: 1 }}>
                <Tooltip title="Handle suggest request">
                    <IconButton
                        onClick={handleClickBigIcon}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={openMenu ? 'handle-request-route-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                    >
                        <AssistantDirectionRoundedIcon sx={style.bigIcon} />
                    </IconButton>
                </Tooltip>
                <MenuDropDown
                    role={_currentUser.role}
                    anchorEl={anchorEl}
                    id="handle-request-route-menu"
                    open={openMenu}
                    handleClose={handleCloseMenu}
                    handleClickMenuItem={(e) => handleAction(e)}
                />
                <Typography sx={style.tabTitle}>Request</Typography>
            </Stack>
            {isLoading ? (
                <CircularProgress sx={{ width: '100%', alignSelf: 'center' }} color="secondary" />
            ) : (
                <Stack sx={style.stackContent} direction="column">
                    {listRequestPending?.map((request) => (
                        <RequestItem key={request.requestProductId} request={request} currUser={_currentUser} />
                    ))}
                </Stack>
            )}
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
