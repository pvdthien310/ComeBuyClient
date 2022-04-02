import React from 'react';
import Invoice from '../container/Invoice';

const staffRoutes = [
  {
    path: '/invoice',
    exact: true,
    page: () => <Invoice />,
  },
 
];

const staffMenuItems = {
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
export { staffRoutes, staffMenuItems };