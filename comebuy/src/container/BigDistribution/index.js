import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Stack, Grid } from '@mui/material';
import { CurrentRoute, SuggestedRoute } from '../../components';
import { currentUser } from '../../redux/selectors';

import style from './style';

function BigDistribution() {
    const _currentUser = useSelector(currentUser);

    return (
        <Stack justifyContent="center" alignItems="center" sx={style.wrapper}>
            <Typography variant="h5" fontWeight="bold" mt={2}>
                {_currentUser.role === 'admin' ? 'Branch distribution' : 'Request product'}
            </Typography>
            <Grid container sx={style.wrapper}>
                <CurrentRoute />
                <SuggestedRoute />
            </Grid>
        </Stack>
    );
}

export default BigDistribution;
