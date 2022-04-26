import React from 'react';
import HomePage from '../container/HomePage';
import ProductSpace from '../container/ProductSpace';
import Profile from '../container/Profile';
import CustomerPlace from './../container/CustomerPlace/index';

const customerRoutes = [
  {
    name: 'Customer Place',
    path: '/profiles/myplace',
    page: <CustomerPlace />,
  },
  {
    name: 'Profile',
    path: '/profiles/*',
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
  

];

const customerMenuItems = []

export { customerRoutes,customerMenuItems };