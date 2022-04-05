import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import NotFound from '../../container/NotFound';
import { useDispatch } from 'react-redux';
import { accountSlice } from '../../redux/slices/accountSlice';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';

const MainLayout = props => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const path = window.location.pathname;
    setPathname(path);
  });

  const showRoutes = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.page} />;
      });
    }
    result.push(<Route key={routes.length} path="*" element={NotFound} />);

    return result;
  };

  const [state, setState] = React.useState(false)

  const ItemClick = async (e) => {
    console.log(e.target.innerText)
    switch (e.target.innerText) {
      case 'Log Out':
        {
          dispatch(accountSlice.actions.logout())
          await localStorage.setItem('role', null)
          navigate("/")
          break
        }
      case 'product':
        {
          navigate("/product")
          break
        }
      case 'staff':
        {
          navigate("/staff")
          break
        }
      case 'editProduct':
        {
          navigate("/product/edit")
          break
        }
      case 'addProduct':
        {
          navigate("/product/add")
          break
        }
    }
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {(props.routes).map((route, index) => (
          <ListItem button key={route.name} onClick={ItemClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Log Out'].map((text, index) => (
          <ListItem button key={text} onClick={ItemClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <React.Fragment key={'left'}>
        <IconButton size="large" onClick={toggleDrawer('left', true)}><MenuIcon /></IconButton>
        <Drawer
          anchor={'left'}
          open={state}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>

      <div >
        <Routes>
          {showRoutes(props.routes)}
          <Route element={
            <Navigate replace to={{ pathname: '/' }} />
          }>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;