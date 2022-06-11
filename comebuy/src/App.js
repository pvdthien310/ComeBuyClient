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
import { useDispatch, useSelector } from 'react-redux';
import { customerMenuItems, customerRoutes } from './route/CustomerRoutes';
import GuestLayout from './page/GuestLayout';
import { ForgotPasswordInLogin } from './components';
import { guestMenuItems, guestRoutes } from './route/GuestRoutes';
import { getAccountWithID } from './redux/slices/accountSlice';

function App() {
  if (localStorage.getItem('cart') === 'undefined' || localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([]))
  }
  if (localStorage.getItem('idUser') === 'undefined' || localStorage.getItem('cart') === null) {
    localStorage.setItem('idUser', '')
  }
  const dispatch = useDispatch()
  const role = localStorage.getItem('role');
  const navigate = useNavigate()

  const _currentUser = useSelector(currentUser)

  const LoadCurrentUser = async () => {
    if (localStorage.getItem('idUser') != "") {
      try {
           await dispatch(getAccountWithID(localStorage.getItem('idUser')))
      } catch (rejectedValueOrSerializedError) {
          // handle error here
          console.log(rejectedValueOrSerializedError.message);
      }
  }
  }

  useEffect(async () => {
    await LoadCurrentUser()
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
          return <GuestLayout routes={guestRoutes} itemRoutes={guestMenuItems} />; // Guest/Customer 
      }
    }
  };


  return (
    <Routes>
       <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="*" element={renderRoutes()} />
      <Route path="/forgetpasswordinlogin" element={<ForgotPasswordInLogin />} />
    </Routes>
  );
}
export default App;
