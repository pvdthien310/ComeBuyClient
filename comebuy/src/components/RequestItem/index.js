/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IconButton, Stack, Typography, Button, Box, dialogActionsClasses } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import DialpadIcon from '@mui/icons-material/Dialpad';
import CheckIcon from '@mui/icons-material/Check';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import style from './style';
import ProductReqDetail from '../ProductReqDetail';
import requestProdApi from '../../api/requestProductAPI';
import DealRequestConfirmDialog from '../DealRequestConfirmDialog';
import SnackBarAlert from '../SnackBarAlert';

export default function RequestItem(prop) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [request, setRequest] = useState(prop.request);
    const [openDetailReq, setOpenDetailReq] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });
    const [dialog, setDialog] = useState({
        open: false,
        message: '',
    });
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseDialog = () => setDialog({ ...dialog, open: false, message: '' });

    const closeAlert = () => setAlert({ ...alert, open: false });

    const handleClickDetail = async () => {
        if (request.fromBranchId !== prop.currUser.branch.branchid) {
            const temp = {
                requestId: request.requestProductId,
                message: request.message,
                status: request.status,
                isChecked: true,
            };
            if (request.isChecked) {
                setOpenDetailReq(true);
            } else {
                try {
                    await requestProdApi.updateReq(temp).then((data) => {
                        setRequest({
                            ...request,
                            isChecked: true,
                        });
                        setOpenDetailReq(true);
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            setOpenDetailReq(true);
        }
    };

    const handleUpdateStatus = async (type) => {
        setOpenBackdrop(true);
        const params = {
            type,
            request,
            myBranchId: prop.currUser.branch.branchid,
            userID: prop.currUser.userID,
            role: prop.currUser.role,
        };
        await requestProdApi.updateReqStatus(params).then((data) => {
            setOpenBackdrop(false);
        });
    };

    const openSupplyConfirm = () => {
        setDialog({
            ...dialog,
            open: true,
            message: 'Are you sure to supply this request ?',
        });
    };

    const handleSingleDeal = async () => {
        setDialog({
            ...dialog,
            open: false,
        });
        setOpenBackdrop(true);
        const params = {
            request,
            userID: prop.currUser.userID,
            role: prop.currUser.role,
        };
        await requestProdApi.dealSingleReq(params).then((res) => {
            setOpenBackdrop(false);
            console.log(res);
        });
    };

    return (
        <Stack direction="column" sx={style.stack1} spacing={1}>
            <Box
                sx={{
                    borderRadius: '5px',
                    backgroundColor: `${
                        request.isChecked || prop.currUser.branch.branchid === request.fromBranchId
                            ? 'white'
                            : alpha('#161717', 0.05)
                    }`,
                }}
            >
                <Stack direction="row" sx={style.stack2}>
                    <Button onClick={handleClickDetail} sx={style.button1}>
                        <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                            <Stack direction="row" spacing={2}>
                                <Badge badgeContent={request.total} color="primary">
                                    <AddBusinessIcon color="action" sx={style.icon} />
                                </Badge>
                                <Typography
                                    sx={{
                                        ...style.typo1,
                                        color: `${
                                            request.isChecked || prop.currUser.branch.branchid === request.fromBranchId
                                                ? 'gray'
                                                : 'red'
                                        }`,
                                    }}
                                >
                                    {request.fromBranchId === prop.currUser.branch.branchid
                                        ? `Request to ${request.toBranchId}`
                                        : ` Request from: ${request.fromBranchId}`}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <AccessTimeFilledIcon color="action" sx={style.icon} />
                                <Typography sx={style.typo2}>At {request.timeRequest}</Typography>
                            </Stack>
                        </Stack>
                    </Button>
                    <Stack direction="column">
                        {request?.status === 'pending' && request?.fromBranchId !== prop.currUser.branch.branchid ? (
                            <IconButton onClick={openSupplyConfirm}>
                                <CheckCircleIcon sx={{ color: 'green' }} />
                            </IconButton>
                        ) : null}
                        {request?.status === 'pending' && request.toBranchId === prop.currUser.branch.branchid ? (
                            <IconButton onClick={() => handleUpdateStatus('2')}>
                                <CancelScheduleSendIcon sx={{ color: 'red' }} />
                            </IconButton>
                        ) : null}
                        {request?.status === 'pending' && request.fromBranchId === prop.currUser.branch.branchid ? (
                            <IconButton onClick={() => handleUpdateStatus('1')}>
                                <DoDisturbOnIcon sx={{ color: 'red' }} />
                            </IconButton>
                        ) : null}
                    </Stack>
                </Stack>
                <div style={style.lastLine} />
            </Box>
            <ProductReqDetail open={openDetailReq} request={request} closeModal={() => setOpenDetailReq(false)} />
            <DealRequestConfirmDialog
                openDialog={dialog.open}
                messageConfirm={dialog.message}
                handleCloseDialog={handleCloseDialog}
                handleDeal={handleSingleDeal}
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
        </Stack>
    );
}
