import React from 'react';
import CounterForManager from '../container/CounterForManger';
import Product from '../container/Product';
import Revenue from '../container/Revenue';

const managerRoutes = [
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