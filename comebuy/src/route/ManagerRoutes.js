import React from 'react';
import CounterForManager from '../container/CounterForManger';
import Product from '../container/Product';

const managerRoutes = [
  {
    name: 'Product',
    path: '/product/*',
    page: <Product />,
  },
  {
    name: 'Workspace',
    path: '/workspace/*',
    page: <CounterForManager />,
  },
];

const managerMenuItems = [
  {
    name: 'Product',
    path: '/product/*',
    page: <Product />,
  },
  {
    name: 'Workspace',
    path: '/workspace/*',
    page: <CounterForManager />,
  }
]


export { managerRoutes, managerMenuItems };