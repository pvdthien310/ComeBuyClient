import React from 'react';
import Product from '../container/Product';

const customerRoutes = [
  {
    name:'Product',
    path: '/product',
    exact: true,
    page: () => <Product />,
  },
 
];

export { customerRoutes };