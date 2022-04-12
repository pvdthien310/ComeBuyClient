import React from 'react';
import Product from '../container/Product';
import CustomerPlace from './../container/CustomerPlace/index';

const customerRoutes = [
  {
    name: 'Product',
    path: '/product',
    page: <Product />,
  },
];

const customerMenuItems = [
  {
    name:'Product',
    path: '/product',
    page: <Product />,
  }]

export { customerRoutes,customerMenuItems };