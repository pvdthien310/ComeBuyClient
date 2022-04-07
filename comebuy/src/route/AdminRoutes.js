import React from 'react';
import Product from '../container/Product';
import AddProduct from '../container/Product/AddProduct';
import EditProduct from '../container/Product/EditProduct';
import Staff from '../container/Staff';


const adminRoutes = [
    {
        name: 'Product',
        path: '/product/*',
        page:  <Product />,
    },
    // {
    //     name: 'addProduct',
    //     path: '/product/add',
    //     page:   <AddProduct />,
    // },
    // {
    //     name: 'editProduct',
    //     path: '/product/edit',
    //     page:   <EditProduct />,
    // },
    {
        name: 'Staff',
        path: '/staff',
        page:  <Staff />,
    },


];

export { adminRoutes };