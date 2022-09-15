import React from 'react';
import Invoice from '../container/Invoice';
import ManagerHome from '../container/ManagerHome';

const staffRoutes = [
    {
        name: 'Invoice',
        path: '/invoice/*',
        exact: true,
        page: <Invoice />,
    },
    {
        name: 'Manager Home',
        path: '/',
        page: <ManagerHome />,
    },
];

const staffMenuItems = [
    {
        name: 'Invoice',
        path: '/invoice/*',
        page: <Invoice />,
    },
];

export { staffRoutes, staffMenuItems };
