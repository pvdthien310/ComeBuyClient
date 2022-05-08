import React from 'react';
import Invoice from '../container/Invoice';
import ProductSpace from '../container/ProductSpace';

const staffRoutes = [
  {
    name: 'Invoice',
    path: '/invoice/*',
    exact: true,
    page: <Invoice />,
  },

];

const staffMenuItems = [
  {
    name: 'Invoice',
    path: '/invoice/*',
    page: <Invoice />,
  }]



export { staffRoutes, staffMenuItems };