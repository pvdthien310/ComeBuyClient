/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IconButton, Stack, Typography, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialpadIcon from '@mui/icons-material/Dialpad';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function RequestItem(prop) {
    return (
        <Stack
            direction="column"
            sx={{
                borderRadius: '10px',
                p: 2,
                backgroundColor: `${prop.request.isChecked ? 'white' : alpha('#161717', 0.05)}`,
            }}
            spacing={1}
        >
            <Stack direction="row" sx={{ width: '100%', flexDirection: 'space-between' }}>
                <Button sx={{ width: '100%', textTransform: 'none' }}>
                    <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                        <Stack direction="row" spacing={2}>
                            {prop.request.status === 'supplied' || prop.request.status === 'declined' ? (
                                <AddBusinessIcon color="action" sx={{ width: '30px', height: '30px' }} />
                            ) : (
                                <Badge badgeContent={prop.request.total} color="primary">
                                    <AddBusinessIcon color="action" sx={{ width: '30px', height: '30px' }} />
                                </Badge>
                            )}
                            <Typography
                                sx={{
                                    color: `${prop.request.isChecked ? 'gray' : 'red'}`,
                                    fontWeight: 'bold',
                                    fontSize: '17px',
                                }}
                            >
                                Request from:
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <AccessTimeFilledIcon color="action" sx={{ width: '30px', height: '30px' }} />
                            <Typography sx={{ color: 'gray', fontSize: '16px' }}>
                                At {prop.request.timeRequest}
                            </Typography>
                        </Stack>
                    </Stack>
                </Button>
                <Stack direction="column">
                    <IconButton>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton>
                        <DialpadIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    );
}
