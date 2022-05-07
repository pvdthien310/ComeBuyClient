import './App.css';
import LoginRegister from './container/LoginAndRegister/LoginRegister';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './container/HomePage';
import MainLayout from './page/MainLayout';
import { adminRoutes, adminMenuItems } from './route/AdminRoutes';
import { staffMenuItems, staffRoutes } from './route/StaffRoutes';
import { managerRoutes, managerMenuItems } from './route/ManagerRoutes';
import { useEffect } from 'react';
import { currentUser } from './redux/selectors';
import { useSelector } from 'react-redux';
import { customerMenuItems, customerRoutes } from './route/CustomerRoutes';
import GuestLayout from './page/GuestLayout';
import { ForgotPasswordInLogin } from './components';

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
          return <MainLayout routes={managerRoutes} itemRoutes={managerMenuItems} />;
        case 'staff':
          return <MainLayout routes={staffRoutes} itemRoutes={staffMenuItems} />;
        case 'admin':
          return <MainLayout routes={adminRoutes} itemRoutes={adminMenuItems} />;
        case 'customer':
          return <GuestLayout routes={customerRoutes} itemRoutes={customerMenuItems} />;
        default:
          return <HomePage />; // Guest/Customer 
      }
    }
    return <HomePage />
  };


  return (
    <Routes>
      <Route path="*" element={renderRoutes()} />
      <Route path="login" element={<LoginRegister />} />
      <Route path="/forgetpasswordinlogin" element={<ForgotPasswordInLogin />} />
    </Routes>
  );
}
export default App;
