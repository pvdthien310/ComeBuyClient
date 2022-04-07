import React from 'react';
import Product from '../container/Product';

const managerRoutes = [
  {
    name: 'Product',
    path: '/product',
    exact: true,
    page: () => <Product />,
  },
 
];


export { managerRoutes };