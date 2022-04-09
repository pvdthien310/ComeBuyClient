import './App.css';
import LoginRegister from './container/LoginAndRegister/LoginRegister';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './container/HomePage/HomePage';
import MainLayout from './page/MainLayout';
import { adminRoutes, adminMenuItems } from './route/AdminRoutes';
import { staffMenuItems, staffRoutes } from './route/StaffRoutes';
import { managerRoutes, managerMenuItems } from './route/ManagerRoutes';
import { useState, useEffect } from 'react';
import CustomerPlace from './container/CustomerPlace/index';
import { currentUser } from './redux/selectors';
import { useSelector } from 'react-redux';
import Profile from './container/Profile';

function App() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate()

  const _currentUser = useSelector(currentUser)

  useEffect(() => {
    navigate('/')
  }, [role])

  const renderRoutes = () => {

    const token = localStorage.getItem('accessToken');

    if (token) {
      switch (role) {
        case 'manager':
          return <MainLayout routes={managerRoutes} />;
        case 'staff':
          return <MainLayout routes={staffRoutes} />;
        case 'admin':
          return <MainLayout routes={adminRoutes} />;
        default:
          return <HomePage />; // Guest/Customer 
      }
    }
    return <HomePage />
  };

  const pathProfile = "profiles/" + _currentUser.email + "/comebuywith" + _currentUser.name;

  return (
    <Routes>
      <Route path="*" element={renderRoutes()} />
      <Route path="login" element={<LoginRegister />} />
      <Route path="myplace" element={<CustomerPlace />} />
      <Route path={pathProfile} element={<Profile />} />
    </Routes>
  );
}
export default App;
