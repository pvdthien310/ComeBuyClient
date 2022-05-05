import React from 'react';
import HomePage from '../container/HomePage';
import ProductSpace from '../container/ProductSpace';
// import ForgotPassword from './../container/guestPlace/ForgotPassword';
import DetailProduct from '../container/Product/DetailProduct';
import { ForgotPassword } from '../components';
import GuestCart from '../container/GuestCart';

const guestRoutes = [
  {
    name: 'Guest Cart',
    path: '/guestCart',
    page: <GuestCart />,
  },
  {
    name: 'Product Space',
    path: '/productSpace',
    page: <ProductSpace />,
  },
 
  {
    name: 'Home',
    path: '/',
    page: <HomePage />,
  },
  {
    name: 'ForgotPassword',
    path: '/myplace/resetpassword',
    page: <ForgotPassword />,
  },
  {
    name: 'DetailProduct',
    path: '/productSpace/:id',
    page: <DetailProduct />
  },
];

const guestMenuItems = []

export { guestRoutes, guestMenuItems };