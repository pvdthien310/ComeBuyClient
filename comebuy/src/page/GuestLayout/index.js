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
import { IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';

const GuestLayout = props => {
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
    result.push(<Route key={routes.length} path="/error" element={<NotFound />} />);
    return result;
  };

  const [state, setState] = React.useState(false)

  return (
    <div style={{ height: 850, width: '100%' }}>
      <div style={{ height: "80%", width: '100%' }}>
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

export default GuestLayout;