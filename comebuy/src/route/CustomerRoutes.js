import React from 'react';
import HomePage from '../container/HomePage';
import ProductSpace from '../container/ProductSpace';
import Profile from '../container/Profile';
import CustomerPlace from './../container/CustomerPlace/index';
// import ForgotPassword from './../container/CustomerPlace/ForgotPassword';
import DetailProduct from '../container/Product/DetailProduct';
import { ForgotPassword } from '../components';

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
    path: '/productSpace',
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
    name: 'DetailProduct',
    path: '/productSpace/:id',
    page: <DetailProduct />,
  },


];

const customerMenuItems = []

export { customerRoutes, customerMenuItems };