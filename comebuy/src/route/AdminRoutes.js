import React from 'react';
import Product from '../container/Product';
import AddProduct from '../container/Product/AddProduct';
import EditProduct from '../container/Product/EditProduct';
import Staff from '../container/Staff';
import AddStaff from '../container/Staff/AddStaff';


const adminRoutes = [
    {
        name: 'Product',
        path: '/product/*',
        page: <Product />,
    },
    {
        name: 'addProduct',
        path: '/product/add',
        page: <AddProduct />,
    },
    {
        name: 'editProduct',
        path: '/product/edit',
        page: <EditProduct />,
    },
    {
        name: 'Staff',
        path: '/staff',
        page: <Staff />,
    },
    {
        name: 'addStaff',
        path: '/staff/add',
        page: <AddStaff />,
    }
]

const adminMenuItems = [
    {
        name: 'Product',
        path: '/product/*',
        page: <Product />,
    },
    {
        name: 'Staff',
        path: '/staff',
        page: <Staff />,
    }]


export { adminRoutes, adminMenuItems };