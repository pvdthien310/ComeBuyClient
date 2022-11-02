/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Stack, Grid } from '@mui/material';
import io from 'socket.io-client';

import { CurrentRoute, SuggestedRoute, ResponseRoute } from '../../components';
import { currentUser } from '../../redux/selectors';
import { DEPLOYED_WS } from '../../constant';

import style from './style';
import callToast from '../../helperToast/index';

function BigDistribution() {
    const _currentUser = useSelector(currentUser);
    const socket = io(DEPLOYED_WS, {
        transports: ['websocket'],
    });
    const listenDistribution = () => {
        socket.on('distribution-product', (message) => {
            const data = JSON.parse(message);
            console.log(data);
            if (data.toBranch === _currentUser.branch.branchid) {
                callToast.distributionToOneToast(data);
            }
            if (data.toBranch === 'all' && data.mainBranch !== _currentUser.branch.branchid) {
                callToast.distributionToAllToast(data);
            }
        });
    };

    useEffect(() => {
        listenDistribution();
    }, []);

    return (
        <Stack justifyContent="center" alignItems="center" sx={style.wrapper}>
            <Typography variant="h5" fontWeight="bold" mt={2}>
                {_currentUser.role === 'admin' ? 'Branch distribution' : 'Request product'}
            </Typography>
            <Grid container sx={style.wrapper}>
                <CurrentRoute />
                <SuggestedRoute />
                <ResponseRoute />
            </Grid>
        </Stack>
    );
}

export default BigDistribution;
