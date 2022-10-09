import React from 'react';
import CounterForManager from '../container/CounterForManger';
import Distribution from '../container/Distribution';
import ManagerHome from '../container/ManagerHome';
import Revenue from '../container/Revenue';
import BigDistribution from '../container/BigDistribution';

const managerRoutes = [
    {
        name: 'Workspace',
        path: '/workspace/*',
        page: <CounterForManager />,
    },
    {
        name: 'Revenue',
        path: '/revenue/*',
        page: <Revenue />,
    },
    {
        name: 'Distribution',
        path: '/distribution/*',
        exact: true,
        page: <Distribution />,
    },
    {
        name: 'Manager Home',
        path: '/',
        page: <ManagerHome />,
    },
    {
        name: 'Branch distribution',
        path: '/branchDistribution/*',
        page: <BigDistribution />,
    },
];

const managerMenuItems = [
    {
        name: 'Workspace',
        path: '/workspace/*',
        page: <CounterForManager />,
    },
    {
        name: 'Revenue',
        path: '/revenue/*',
        page: <Revenue />,
    },
    {
        name: 'Branch distribution',
        path: '/branchDistribution/*',
        page: <BigDistribution />,
    },
];

export { managerRoutes, managerMenuItems };
