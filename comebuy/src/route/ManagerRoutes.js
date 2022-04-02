import React from 'react';
import Product from '../container/Product';

const managerRoutes = [
  {
    path: '/product',
    exact: true,
    page: () => <Product />,
  },
 
];

const managerMenuItems = {
  path: '/',
 
};
export { managerRoutes, managerMenuItems };