import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginRegister from './container/LoginAndRegister/LoginRegister';
import MainLayout from './page/MainLayout';
import { adminRoutes, adminMenuItems } from './route/AdminRoutes';
import { staffMenuItems, staffRoutes } from './route/StaffRoutes';
import { managerRoutes, managerMenuItems } from './route/ManagerRoutes';
import { customerMenuItems, customerRoutes } from './route/CustomerRoutes';
import GuestLayout from './page/GuestLayout';
import { ForgotPasswordInLogin } from './components';
import { guestMenuItems, guestRoutes } from './route/GuestRoutes';
import { getAccountWithID } from './redux/slices/accountSlice';
import SetUpFunction from './lib/utils/setUpFunction';

function App() {
    /// For the first open website
    SetUpFunction();

    const dispatch = useDispatch();
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const LoadCurrentUser = async () => {
        if (localStorage.getItem('idUser') && localStorage.getItem('idUser') !== '') {
            try {
                await dispatch(getAccountWithID(localStorage.getItem('idUser')));
            } catch (rejectedValueOrSerializedError) {
                // handle error here
                console.log(rejectedValueOrSerializedError.message);
            }
        }
    };

    useEffect(async () => {
        await LoadCurrentUser();
        navigate('/');
    }, [role]);

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
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/login" element={<LoginRegister />} />
            <Route path="*" element={renderRoutes()} />
            <Route path="/forgetpasswordinlogin" element={<ForgotPasswordInLogin />} />
        </Routes>
    );
}
export default App;
