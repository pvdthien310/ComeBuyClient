/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import BranchItem from '../BranchItem';
import style from './style';

import { currentUser } from '../../redux/selectors';
import { getBranchAndTotalStock } from '../../redux/slices/branchSlice';
import StockItem from '../StockItem';
import { getStockAndRemain } from '../../redux/slices/stockSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function CurrentRoute() {
    const _currentUser = useSelector(currentUser);
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            if (_currentUser.role === 'admin') {
                const temp = await dispatch(getBranchAndTotalStock());
                const result = unwrapResult(temp);
                setList(result);
            } else {
                const temp = await dispatch(getStockAndRemain(_currentUser.userID));
                const result = unwrapResult(temp);
                console.log(result);
                setList(result);
            }
            setIsLoading(false);
        };
        if (list.length === 0) {
            fetch();
        }
    }, []);

    return (
        <Grid item xs={6} sx={{ p: 6 }}>
            <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
                <AssistantDirectionRoundedIcon sx={style.bigIcon} />
                {_currentUser.role === 'admin' ? (
                    <Typography sx={style.tabTitle}>Current branches</Typography>
                ) : (
                    <Typography sx={style.tabTitle}>Current stock</Typography>
                )}
            </Stack>
            <Stack direction="row">
                <Stack pl={7}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                </Stack>
                {_currentUser.role === 'admin' ? (
                    <Stack sx={style.stack}>
                        <IconButton style={style.iconButton}>
                            <SwitchAccessShortcutAddIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                ) : null}
            </Stack>
            {isLoading ? (
                <CircularProgress sx={{ width: '100%', alignSelf: 'center' }} color="secondary" />
            ) : (
                <Stack sx={style.stackContent} direction="column" spacing={1.5}>
                    {_currentUser.role === 'admin'
                        ? list.map((item) => <BranchItem key={item.branchid} branch={item} />)
                        : list.map((item) => <StockItem key={item.id} stock={item} />)}
                </Stack>
            )}
        </Grid>
    );
}
