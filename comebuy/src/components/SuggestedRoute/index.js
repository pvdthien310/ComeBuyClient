/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

import { Box, Grid, Stack, Typography } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import CheckIcon from '@mui/icons-material/Check';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import RequestItem from '../RequestItem';
import style from './style';
import CreateProdReqModal from '../CreateProdReqModal';
import { DEPLOYED_WS } from '../../constant';
import { currentUser } from '../../redux/selectors';
import requestProdApi from '../../api/requestProductAPI';

const actions = [
    { icon: <CancelScheduleSendIcon />, name: 'Cancel all' },
    { icon: <CheckIcon />, name: 'Mark all as checked' },
    { icon: <DoneAllIcon />, name: 'Supply all' },
    { icon: <AddBoxIcon />, name: 'Create request' },
];

export default function SuggestedRoute() {
    const _currentUser = useSelector(currentUser);
    const socket = io(DEPLOYED_WS, {
        transports: ['websocket'],
    });
    const [openModal, setOpenModal] = useState(false);
    const [listRequest, setListRequest] = useState([]);

    const [hidden, setHidden] = React.useState(false);

    const handleSocket = () => {
        socket.on('new-product-request', (message) => {
            const data = JSON.parse(message);
            console.log(data);
            if (data.toBranchId === _currentUser.branch.branchid) {
                if (listRequest.find((ite) => ite.requestId === data.requestId) === undefined) {
                    setListRequest((prev) => [data, ...prev]);
                }
            }
        });
    };

    useEffect(async () => {
        handleSocket();
        await requestProdApi
            .getReqToMine(_currentUser.branch.branchid)
            .then((data) => setListRequest(data.data))
            .catch(() => {
                console.log('Error load product');
            });
        return () => {};
    }, []);

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    const handleClickSpeedDial = (e) => {
        if (e.name === 'Create request') {
            setOpenModal(true);
        }
    };

    return (
        <Grid item xs={6} sx={{ p: 6 }}>
            <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
                <AltRouteIcon sx={style.icon1} />
                <Typography sx={style.typo1}>Request</Typography>
            </Stack>
            <Stack sx={style.stack1}>
                <Box sx={style.box1}>
                    <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        direction="left"
                        sx={style.speedial1}
                        icon={<SpeedDialIcon openIcon={<ArrowCircleRightIcon />} />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                onClick={() => handleClickSpeedDial(action)}
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                </Box>
            </Stack>
            <Stack sx={style.requestlist} direction="column" spacing={1.5}>
                {listRequest.map((request) => (
                    <RequestItem key={request.requestId} request={request} />
                ))}
            </Stack>
            <CreateProdReqModal open={openModal} closeModal={() => setOpenModal(false)} />
        </Grid>
    );
}
