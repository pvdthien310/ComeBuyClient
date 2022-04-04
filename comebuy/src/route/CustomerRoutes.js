import React from 'react';
import Product from '../container/Product';

const customerRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <Product />,
  },
 
];

export { customerRoutes };