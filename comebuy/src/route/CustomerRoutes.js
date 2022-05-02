import React from 'react';
import HomePage from '../container/HomePage';
import ProductSpace from '../container/ProductSpace';
import Profile from '../container/Profile';
import CustomerPlace from './../container/CustomerPlace/index';
import { ForgotPassword } from '../components';
import CustomerCart from '../container/CustomerCart';

const customerRoutes = [
  {
    name: 'Customer Place',
    path: '/myplace',
    page: <CustomerPlace />,
  },
  {
    name: 'Profile',
    path: '/profile',
    page: <Profile />,
  },
  {
    name: 'Product Space',
    path: '/productSpace/*',
    page: <ProductSpace />,
  },
  {
    name: 'Home',
    path: '/',
    page: <HomePage />,
  },
  {
    name: 'ForgotPassword',
    path: '/myplace/resetpassword',
    page: <ForgotPassword />,
  },
  {
    name: 'My Cart',
    path: '/myplace/mycart',
    page: <CustomerCart />,
  },


];

const customerMenuItems = []

export { customerRoutes, customerMenuItems };