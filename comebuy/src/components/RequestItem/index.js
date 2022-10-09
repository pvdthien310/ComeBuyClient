/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IconButton, Stack, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialpadIcon from '@mui/icons-material/Dialpad';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import style from './style';

export default function RequestItem(prop) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [request, setRequest] = useState(prop.request);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack
            direction="column"
            sx={{
                ...style.stack1,
                backgroundColor: `${request.isChecked ? 'white' : alpha('#161717', 0.05)}`,
            }}
            spacing={1}
        >
            <Stack direction="row" sx={style.stack2}>
                <Button sx={style.button1}>
                    <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                        <Stack direction="row" spacing={2}>
                            {request.status === 'supplied' || request.status === 'declined' ? (
                                <AddBusinessIcon color="action" sx={style.icon} />
                            ) : (
                                <Badge badgeContent={request.total} color="primary">
                                    <AddBusinessIcon color="action" sx={style.icon} />
                                </Badge>
                            )}
                            <Typography
                                sx={{
                                    ...style.typo1,
                                    color: `${request.isChecked ? 'gray' : 'red'}`,
                                }}
                            >
                                Request from: {request.fromBranchId}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <AccessTimeFilledIcon color="action" sx={style.icon} />
                            <Typography sx={style.typo2}>At {request.timeRequest}</Typography>
                        </Stack>
                    </Stack>
                </Button>
                <Stack direction="column">
                    {request?.status === 'pending' ? (
                        <IconButton>
                            <CheckCircleIcon sx={{ color: 'green' }} />
                        </IconButton>
                    ) : null}

                    {request?.status === 'supplied' ? (
                        <IconButton>
                            <AddCircleIcon />
                        </IconButton>
                    ) : null}

                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <DialpadIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={style.paperPropMenu}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {!request?.isChecked ? (
                            <MenuItem>
                                <CheckIcon /> Mark as checked
                            </MenuItem>
                        ) : null}
                        {request?.status === 'pending' ? (
                            <MenuItem>
                                <DoDisturbOnIcon sx={{ color: 'red' }} /> Cancel
                            </MenuItem>
                        ) : (
                            <MenuItem>
                                <DeleteForeverIcon /> Delete
                            </MenuItem>
                        )}
                    </Menu>
                </Stack>
            </Stack>
        </Stack>
    );
}
