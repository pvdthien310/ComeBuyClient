import React from 'react';
import Product from '../container/Product';
import CustomerPlace from './../container/CustomerPlace/index';

const customerRoutes = [
  {
    name: 'Product',
    path: '/product',
    exact: true,
    page: () => <Product />,
  },
];

export { customerRoutes };