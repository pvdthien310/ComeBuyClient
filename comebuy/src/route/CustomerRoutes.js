import React from 'react';
import Product from '../container/Product';
import Profile from '../container/Profile';
import CustomerPlace from './../container/CustomerPlace/index';

const customerRoutes = [
  {
    name: 'Product',
    path: '/product',
    page: <Product />,
  },
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
];

const customerMenuItems = [
  {
    name:'Product',
    path: '/product',
    page: <Product />,
  }]

export { customerRoutes,customerMenuItems };