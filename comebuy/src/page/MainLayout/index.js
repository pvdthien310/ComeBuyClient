/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
// import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DiscountIcon from '@mui/icons-material/Discount';
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CountertopsIcon from '@mui/icons-material/Countertops';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { currentUser } from '../../redux/selectors';
import { accountSlice } from '../../redux/slices/accountSlice';
import NotFound from '../../container/NotFound';

function MainLayout(props) {
    const _currentUser = useSelector(currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showRoutes = (routes) => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => <Route key={index} path={route.path} element={route.page} />);
        }
        result.push(<Route key={routes.length} path="*" element={<NotFound />} />);
        return result;
    };

    const [state, setState] = React.useState(false);

    const ItemClick = async (e) => {
        if (e.target.innerText === 'Log Out') {
            dispatch(accountSlice.actions.logout());
            localStorage.setItem('role', '');
            localStorage.setItem('idUser', '');
            localStorage.setItem('cart', JSON.stringify([]));
            navigate('/');
        } else {
            let matchPath = null;
            props.routes.find((element) => {
                if (element.name === e.target.innerText) matchPath = element.path;
            });
            if (matchPath != null) navigate(matchPath.replace('/*', ''));
            else navigate('*');
        }
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250, height: '100%', backgroundColor: '#593954' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem sx={{ p: 2 }}>
                    <ListItemAvatar>
                        {!(_currentUser && _currentUser.avatar) ? (
                            <Avatar
                                alt="Admin"
                                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/269601282_3076773205930548_4661138205493195861_n.jpg?_nc_cat=110&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=1t8wjEnMgUUAX-orkLB&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT9f3PY1HR9C-4Mrw88aIvVSAQQaWUb9nx41EjSIg3TiQw&oe=628B802E"
                            />
                        ) : (
                            <Avatar alt="Admin" src={_currentUser.avatar} />
                        )}
                    </ListItemAvatar>
                    <ListItemText sx={{ color: 'white' }} primary={_currentUser ? _currentUser.name : 'Admin'} />
                </ListItem>
                <Divider />
                {props.itemRoutes.map((route) => (
                    <ListItem sx={{ backgroundColor: '#593940' }} button key={route.name} onClick={ItemClick}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                            {route.name === 'Product' && <ComputerIcon />}
                            {route.name === 'Staff' && <PeopleIcon />}
                            {route.name === 'Stock' && <InventoryIcon />}
                            {route.name === 'Revenue' && <AssessmentIcon />}
                            {route.name === 'Data Analysis' && <InsightsIcon />}
                            {route.name === 'Workspace' && <CountertopsIcon />}
                            {route.name === 'Invoice' && <ReceiptIcon />}
                            {route.name === 'Distribution' && <MoveDownIcon />}
                            {route.name === 'Banner Manage' && <ViewCarouselIcon />}
                            {route.name === 'System Log' && <ManageHistoryIcon />}
                            {route.name === 'Branch Distribution' && <MoveDownIcon />}
                            {route.name === 'Publish Coupon' && <DiscountIcon />}
                            {route.name === 'Promotion Management' && <PriceChangeIcon />}
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }} primary={route.name} />
                    </ListItem>
                ))}
                <ListItem button key="Log Out" onClick={ItemClick}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white' }} primary="Log Out" />
                </ListItem>
            </List>
        </Box>
    );
    return (
        <Stack sx={{ height: window.innerHeight }}>
            <React.Fragment key="left">
                <ToastContainer style={{ fontSize: '12px' }} />
                <Stack direction="row" sx={{ width: '100%', backgroundColor: '#2E1534' }}>
                    <Grid container sx={{ width: '100%' }}>
                        <Grid item xs={10}>
                            <IconButton sx={{ color: 'white' }} size="large" onClick={toggleDrawer('left', true)}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} sx={{ alignItems: 'end', mt: 2 }}>
                            {_currentUser && (
                                <Typography variant="body2" sx={{ color: 'white' }} fontWeight="bold">
                                    Hi, {_currentUser.name}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Stack>
                <Drawer anchor="left" open={state} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
                <Stack sx={{ height: '100%', width: '100%', mt: 2, backgroundColor: 'grey' }}>
                    <Routes>{showRoutes(props.routes)}</Routes>
                </Stack>
            </React.Fragment>
        </Stack>
    );
}

export default MainLayout;
