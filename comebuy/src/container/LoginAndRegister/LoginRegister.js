/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';

import './LoginRegister.css';
import SnackBarAlert from '../../components/SnackBarAlert/index';
import { currentUser, isSignedIn_user, loading_user } from '../../redux/selectors';
import { login } from '../../redux/slices/accountSlice';

function LoginRegister() {
    const _currentUser = useSelector(currentUser);
    const navigate = useNavigate();
    const _loadingUser = useSelector(loading_user);
    const _isSignedIn = useSelector(isSignedIn_user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const handleCloseSnackBar = () => {
        setAlert({
            ...alert,
            open: false,
        });
    };

    useEffect(() => {
        if (_currentUser.email !== '' && _isSignedIn === true) {
            navigate('/');
        }
    }, [_currentUser]);

    const handleLogin = async () => {
        setLoading(true);
        if (loginInfo.email === '' || loginInfo.password === '') {
            setLoading(false);
            setAlert({
                ...alert,
                open: true,
                severity: 'warning',
                message: 'Fill information first',
            });
        } else {
            try {
                const resultAction = await dispatch(login({ email: loginInfo.email, password: loginInfo.password }));
                const originalPromiseResult = unwrapResult(resultAction);
            } catch (rejectedValueOrSerializedError) {
                if (rejectedValueOrSerializedError != null) {
                    setLoading(false);
                    setAlert({
                        ...alert,
                        open: true,
                        message: 'Login failed. Please try again',
                        severity: 'error',
                    });
                }
            }
        }
    };

    return (
        <div className="bigContainer">
            <section>
                <div className="color" />
                <div className="color" />
                <div className="color" />
                <div className="loginBox">
                    <div className="square" />
                    <div className="square" />
                    <div className="square" />
                    <div className="square" />
                    <div className="square" />
                    <div className="container">
                        <div className="loginForm">
                            <h2>Login Form</h2>
                            <form>
                                <div className="loginInputBox">
                                    <input
                                        type="email"
                                        onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="loginInputBox">
                                    <input
                                        type="password"
                                        onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="loginInputBox">
                                    {loading ? (
                                        <CircularProgress sx={{ marginBottom: '20px' }} />
                                    ) : (
                                        <input type="button" onClick={handleLogin} value="Login" />
                                    )}
                                </div>
                                <p className="forget">
                                    Forgot Password ? <a href="/forgetpasswordinlogin">Click Here</a>
                                </p>
                                <p className="forget">
                                    Don't have an account ? <a href="/register">Register</a>
                                </p>
                                <p className="forget">
                                    Or skip to <a href="/">Home</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <SnackBarAlert
                open={alert.open}
                handleClose={handleCloseSnackBar}
                severity={alert.severity}
                message={alert.message}
            />
        </div>
    );
}

export default LoginRegister;
