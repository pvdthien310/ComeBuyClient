import React from 'react';
import Product from '../container/Product';

const managerRoutes = [
  {
    name: 'Product',
    path: '/product/*',
    page: <Product />,
  },

];

const managerMenuItems = [
  {
    name: 'Product',
    path: '/product/*',
    page: <Product />,
  },
]


export { managerRoutes, managerMenuItems };