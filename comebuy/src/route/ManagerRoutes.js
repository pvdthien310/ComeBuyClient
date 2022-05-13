import React from 'react';
import CounterForManager from '../container/CounterForManger';
import Product from '../container/Product';
import Revenue from '../container/Revenue';

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
  {
    name: 'Revenue',
    path: '/revenue/*',
    page: <Revenue />,
  }
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
  },
  {
    name: 'Revenue',
    path: '/revenue/*',
    page: <Revenue />,
  }
]


export { managerRoutes, managerMenuItems };