import React from 'react';
import Product from '../container/Product';

const customerRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <Product />,
  },
 
];

const customerMenuItems = {
  path: '/',
//   routes: [
//     {
//       path: '/',
//       name: 'Dashboard',
//       icon: <DashboardIcon />,
//       component: <Dashboard />,
//     },
//     {
//       name: 'Courses',
//       icon: <CourseIcon />,
//       path: '/course',
//       component: <Course />,
//     },
//   ],
};
export { customerRoutes, customerMenuItems };