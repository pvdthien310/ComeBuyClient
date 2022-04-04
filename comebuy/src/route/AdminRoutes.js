import React from 'react';
import Product from '../container/Product';
import AddProduct from '../container/Product/AddProduct';
import Staff from '../container/Staff';


const adminRoutes = [
    {
        name: 'product',
        path: '/product',
        exact: true,
        page:  <Product />,
    },
    {
        name: 'addProduct',
        path: '/product/add',
        exact: true,
        page:   <AddProduct />,
    },
    {
        name: 'staff',
        path: '/staff',
        exact: true,
        page:  <Staff />,
    },


];

export { adminRoutes };