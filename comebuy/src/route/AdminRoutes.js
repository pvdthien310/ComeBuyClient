import React from 'react';
import Product from '../container/Product';
import AddProduct from '../container/Product/AddProduct';
import Staff from '../container/Staff';


const adminRoutes = [
    {
        name: 'product',
        path: '/',
        exact: true,
        page: () => <Product />,
    },
    {
        name: 'addProduct',
        path: '/product/add',
        exact: true,
        page: () => <AddProduct />,
    },
    {
        name: 'staff',
        path: '/staff',
        exact: true,
        page: () => <Staff />,
    },


];

const adminMenuItems = {
    path: '/',
    routes: [
        // {
        //   path: '/',
        //   name: 'Dashboard',
        //   icon: <DashboardIcon />,
        //   component: <Dashboard />,
        // },
        // {
        //   name: 'Courses',
        //   icon: <CourseIcon />,
        //   path: '/course',
        //   component: <Course />,
        // },
    ],
};
export { adminRoutes, adminMenuItems };