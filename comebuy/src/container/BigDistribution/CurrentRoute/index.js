/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';

import { Container, Grid, Stack, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import BranchItem from './BranchItem';

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
        // vertical padding + font size from searchIcon
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
    const [listBranch, setListBranch] = useState([
        { mamangerId: 'hhshsbn-sjdu-1625-jsk1', address: 'Xuan Loc, Dong Nai', totalProduct: 20 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk2', address: 'Xuan Loc, Dong Nai', totalProduct: 5 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk3', address: 'Xuan Loc, Dong Nai', totalProduct: 2 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk4', address: 'Xuan Loc, Dong Nai', totalProduct: 10 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk5', address: 'Xuan Loc, Dong Nai', totalProduct: 20 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk6', address: 'Xuan Loc, Dong Nai', totalProduct: 20 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk7', address: 'Xuan Loc, Dong Nai', totalProduct: 20 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk8', address: 'Xuan Loc, Dong Nai', totalProduct: 20 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk9', address: 'Xuan Loc, Dong Nai', totalProduct: 20 },
        { mamangerId: 'hhshsbn-sjdu-1625-jsk10', address: 'Xuan Loc, Dong Nai', totalProduct: 20 },
    ]);

    return (
        <Grid item xs={6} sx={{ p: 6 }}>
            <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
                <AssistantDirectionRoundedIcon sx={{ width: '50px', height: '50px', color: '#289E82' }} />
                <Typography sx={{ pt: 1, fontSize: '20px', fontWeight: 'bold' }}>Current</Typography>
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
                <Stack sx={{ paddingBottom: 2, alignSelf: 'flex-end', width: '100%' }}>
                    <IconButton style={{ alignSelf: 'flex-end', backgroundColor: '#3D84E3' }}>
                        <SwitchAccessShortcutAddIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Stack>
            <Stack sx={{ height: '65vh', overflow: 'scroll', p: 1, pt: 2 }} direction="column" spacing={1.5}>
                {listBranch.map((branch) => (
                    <BranchItem key={branch.mamangerId} branch={branch} />
                ))}
            </Stack>
        </Grid>
    );
}
