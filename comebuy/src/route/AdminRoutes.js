import React from 'react';
import Product from '../container/Product';
import AddProduct from '../container/Product/AddProduct';
import EditProduct from '../container/Product/EditProduct';
import Staff from '../container/Staff';
import AddStaff from '../container/Staff/AddStaff';
import Stock from '../container/Stock';


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
    },
    {
        name: 'Stock',
        path: '/stock',
        page: <Stock />,
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
    },
    {
        name: 'Stock',
        path: '/stock',
        page: <Stock />,
    }]


export { adminRoutes, adminMenuItems };