import React from 'react';
import Invoice from '../container/Invoice';

const staffRoutes = [
  {
    name :'Invoice',
    path: '/invoice',
    exact: true,
    page: <Invoice />,
  },

];

export { staffRoutes };