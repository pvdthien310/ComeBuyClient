import React from 'react';
import Example from '../components/Example';
import Product from '../container/Product';

const managerRoutes = [
  {
    name: 'Product',
    path: '/product/*',
    page: <Product />,
  },
  {
    name: 'Example',
    path: '/example/*',
    page: <Example />,
  },
 
];

const managerMenuItems = [
  {
    name:'Product',
    path: '/product/*',
    page: <Product />,
  },
  {
    name:'Example',
    path: '/example/*',
    page: <Example />,
  }
]


export { managerRoutes,managerMenuItems };