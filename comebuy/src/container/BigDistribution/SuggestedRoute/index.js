/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { Box, Grid, Stack, Typography } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import RequestItem from './RequestItem';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

export default function SuggestedRoute() {
    const [listRequest, setListRequest] = useState([
        {
            requestId: '1254-sksi-skdu-ajah1',
            fromBranchId: 'hhshsbn-sjdu-1625-jsk1',
            toBranchId: 'hhshsbn-sjdu-1625-jsk1',
            listProdReq: {
                productId: '124o-0182-skdj-mmki',
                quantity: 2,
            },
            total: 2,
            message: 'Please send to this branch as below list',
            status: 'pending',
            timeRequest: '2022-09-24 15:30:00',
            isChecked: false,
        },
        {
            requestId: '1254-sksi-skdu-ajah2',
            fromBranchId: 'hhshsbn-sjdu-1625-jsk1',
            toBranchId: 'hhshsbn-sjdu-1625-jsk1',
            listProdReq: [
                {
                    productId: '124o-0182-skdj-mmki',
                    quantity: 3,
                },
                {
                    productId: '124o-5489-skdj-lili',
                    quantity: 2,
                },
            ],
            total: 5,
            message: 'Please send to this branch as below list',
            status: 'supplied',
            timeRequest: '2022-09-24 15:30:00',
            isChecked: true,
        },
        {
            requestId: '1254-sksi-skdu-ajah3',
            fromBranchId: 'hhshsbn-sjdu-1625-jsk1',
            toBranchId: 'hhshsbn-sjdu-1625-jsk1',
            listProdReq: [
                {
                    productId: '124o-0182-skdj-mmki',
                    quantity: 3,
                },
                {
                    productId: '124o-5489-skdj-lili',
                    quantity: 2,
                },
            ],
            total: 5,
            message: 'Please send to this branch as below list',
            status: 'pending',
            timeRequest: '2022-09-24 15:30:00',
            isChecked: false,
        },
        {
            requestId: '1254-sksi-skdu-ajah4',
            fromBranchId: 'hhshsbn-sjdu-1625-jsk1',
            toBranchId: 'hhshsbn-sjdu-1625-jsk1',
            listProdReq: [
                {
                    productId: '124o-0182-skdj-mmki',
                    quantity: 3,
                },
                {
                    productId: '124o-5489-skdj-lili',
                    quantity: 2,
                },
                {
                    productId: '124o-5489-skdj-lili',
                    quantity: 2,
                },
            ],
            total: 7,
            message: 'Please send to this branch as below list',
            status: 'declined',
            timeRequest: '2022-09-24 15:30:00',
            isChecked: true,
        },
    ]);

    const [hidden, setHidden] = React.useState(false);

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    return (
        <Grid item xs={6} sx={{ p: 6 }}>
            <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
                <AltRouteIcon sx={{ width: '50px', height: '50px', color: 'red' }} />
                <Typography sx={{ pt: 1, fontSize: '20px', fontWeight: 'bold' }}>Request</Typography>
            </Stack>
            <Stack sx={{ paddingBottom: 2, alignSelf: 'flex-end', width: '100%' }}>
                <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, pt: 4 }}>
                    <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        direction="left"
                        sx={{ position: 'absolute', bottom: 7, right: 7 }}
                        icon={<SpeedDialIcon openIcon={<ArrowCircleRightIcon />} />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
                        ))}
                    </SpeedDial>
                </Box>
            </Stack>
            <Stack sx={{ height: '65vh', overflow: 'scroll', p: 1, pt: 2 }} direction="column" spacing={1.5}>
                {listRequest.map((request) => (
                    <RequestItem key={request.requestId} request={request} />
                ))}
            </Stack>
        </Grid>
    );
}
