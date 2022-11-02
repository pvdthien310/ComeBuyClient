import React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import DateRangeIcon from '@mui/icons-material/DateRange';

import style from './style';

export default function MenuDropDown(prop) {
    return (
        <Menu
            anchorEl={prop.anchorEl}
            id={prop.id}
            open={prop.open}
            onClose={prop.handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 13,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            {prop.id === 'current-request-route-menu' && (
                <>
                    <MenuItem
                        disabled={prop.role === 'manager'}
                        onClick={() => prop.handleClickMenuItem('distribute-all')}
                        sx={style.title}
                    >
                        <ListItemIcon>
                            <AddBusinessIcon fontSize="small" color="secondary" />
                        </ListItemIcon>
                        Distribution to all
                    </MenuItem>
                    <MenuItem
                        sx={style.title}
                        disabled={prop.role !== 'manager'}
                        onClick={() => prop.handleClickMenuItem('create-new')}
                    >
                        <ListItemIcon>
                            <AddBoxIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        Create new request
                    </MenuItem>
                    <MenuItem
                        sx={style.title}
                        onClick={() => prop.handleClickMenuItem('cancel-all')}
                        disabled={prop.role !== 'manager'}
                    >
                        <ListItemIcon>
                            <DoDisturbOnIcon color="error" fontSize="small" />
                        </ListItemIcon>
                        Cancel all request
                    </MenuItem>
                </>
            )}

            {prop.id === 'handle-request-route-menu' && (
                <>
                    <MenuItem sx={style.title} onClick={() => prop.handleClickMenuItem('supply-all')}>
                        <ListItemIcon>
                            <DoneAllIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        Supply all request
                    </MenuItem>
                    <MenuItem sx={style.title} onClick={() => prop.handleClickMenuItem('decline-all')}>
                        <ListItemIcon>
                            <CancelScheduleSendIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        Decline all
                    </MenuItem>
                </>
            )}

            {prop.id === 'handle-response-route-menu' && (
                <>
                    <MenuItem sx={style.title} onClick={() => prop.handleClickMenuItem('show-fully-supplied')}>
                        <ListItemIcon>
                            <JoinFullIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        Show fully supplied only
                    </MenuItem>
                    <MenuItem sx={style.title} onClick={() => prop.handleClickMenuItem('show-declined')}>
                        <ListItemIcon>
                            <SwipeLeftIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        Show declined only
                    </MenuItem>
                    <MenuItem sx={style.title} onClick={() => prop.handleClickMenuItem('show-with-date-range')}>
                        <ListItemIcon>
                            <DateRangeIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        Show with date range
                    </MenuItem>
                </>
            )}
        </Menu>
    );
}
