import React from 'react';
import BannerManage from '../container/BannerManage';
import BigDistribution from '../container/BigDistribution';
import DataAnalysis from '../container/DataAnalysis';
import LogHistory from '../container/LogHistory';
import ManagerHome from '../container/ManagerHome';
import Product from '../container/Product';
import AddProduct from '../container/Product/AddProduct';
import EditProduct from '../container/Product/EditProduct';
import Revenue from '../container/Revenue';
import Staff from '../container/Staff';
import AddStaff from '../container/Staff/AddStaff';
import Stock from '../container/Stock';
import PromotionManagement from '../container/PromotionManagement';

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
    },
    {
        name: 'Revenue',
        path: '/revenue',
        page: <Revenue />,
    },
    {
        name: 'Data Analysis',
        path: '/dataAnalysis/*',
        page: <DataAnalysis />,
    },
    {
        name: 'Banner Manage',
        path: '/bannerManage/*',
        page: <BannerManage />,
    },
    {
        name: 'System Log',
        path: '/log/*',
        page: <LogHistory />,
    },
    {
        name: 'Manager Home',
        path: '/',
        page: <ManagerHome />,
    },
    {
        name: 'Branch Distribution',
        path: '/branchDistribution/*',
        page: <BigDistribution />,
    },
    {
        name: 'Promotion Management',
        path: '/PromotionManagement/*',
        page: <PromotionManagement />,
    },
];

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
    },
    {
        name: 'Revenue',
        path: '/revenue',
        page: <Revenue />,
    },
    {
        name: 'Data Analysis',
        path: '/dataAnalysis/*',
        page: <DataAnalysis />,
    },
    {
        name: 'Banner Manage',
        path: '/bannerManage/*',
        page: <BannerManage />,
    },
    {
        name: 'System Log',
        path: '/log/*',
        page: <LogHistory />,
    },
    {
        name: 'Promotion Management',
        path: '/PromotionManagement/*',
        page: <PromotionManagement />,
    },
];

export { adminRoutes, adminMenuItems };
