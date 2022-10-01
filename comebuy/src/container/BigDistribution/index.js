import React from 'react';
import { Typography, Stack, Grid } from '@mui/material';
import CurrentRoute from './CurrentRoute';
import SuggestedRoute from './SuggestedRoute/index';

function BigDistribution() {
    return (
        <Stack justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h5" fontWeight="bold" mt={2}>
                Branch Distribution
            </Typography>
            <Grid container sx={{ width: '100%', height: '100%' }}>
                <CurrentRoute />
                <SuggestedRoute />
            </Grid>
        </Stack>
    );
}

export default BigDistribution;
