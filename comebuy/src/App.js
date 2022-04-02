import './App.css';
import LoginRegister from './container/LoginAndRegister/LoginRegister';
import { Route, Routes,useNavigate } from 'react-router-dom';
import HomePage from './container/HomePage/HomePage';
import MainLayout from './page/MainLayout';
import { adminRoutes, adminMenuItems } from './route/AdminRoutes';
import { staffMenuItems, staffRoutes } from './route/StaffRoutes';
import { managerRoutes, managerMenuItems } from './route/ManagerRoutes';
import { useState,useEffect } from 'react';

function App() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  },[role])

  const renderRoutes = () => {
    
    const token = localStorage.getItem('accessToken');

    if (token) {
      switch (role) {
        case 'manager':
          return <MainLayout routes={managerRoutes} menuItems={managerMenuItems} />;
        case 'staff':
          return <MainLayout routes={staffRoutes} menuItems={staffMenuItems} />;
        case 'admin':
          return <MainLayout routes={adminRoutes} menuItems={adminMenuItems} />;
        default:
          return <HomePage />;
      }
    }
    return <HomePage />
  };

 
  return (
    <Routes>
      <Route path="login" element={<LoginRegister />} />
      <Route path="/" element={renderRoutes()} />
    </Routes>
  );
}
export default App;
