/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import VerifyRegisterModal from '../VerifyRegisterModal';
import * as Validation from '../../container/LoginAndRegister/ValidationDataForAccount';
import SnackBarAlert from '../SnackBarAlert';
import emailApi from '../../api/emailAPI';
import { register } from '../../redux/slices/accountSlice';

import './register.css';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });
    const [input, setInput] = useState({
        phoneNumber: '0111111111',
        name: '',
        dob: '1/1/2000',
        avatar: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png',
        email: '',
        password: '',
        address: 'Viet nam',
        role: 'customer',
        sex: 'male',
    });
    const [verifyCode, setVerifyCode] = useState('');
    const [cfPass, setCfPass] = useState('');
    const [openModalVerify, setOpenModalVerify] = useState(false);

    useEffect(() => {
        if (verifyCode !== '') {
            emailApi
                .sendEmail({
                    to: input.email,
                    subject: 'VERIFY FROM COMEBUY ',
                    text: verifyCode,
                })
                .then((data) => {
                    setOpenModalVerify(true);
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        }
    }, [verifyCode]);

    const handleCloseModalVerify = () => {
        setOpenModalVerify(false);
    };

    const handleCloseSnackBar = () => {
        setAlert({
            ...alert,
            open: false,
        });
    };

    const generateOTP = () => {
        const num = '1234567890';
        let OTP = '';
        for (let i = 0; i < 5; i++) {
            OTP += num[Math.floor(Math.random() * 10)];
        }
        return OTP;
    };

    const handleRegister = () => {
        setLoading(true);
        if (input.name.length <= 5 || input.name === '' || Validation.CheckUsername(input.name)) {
            setAlert({
                ...alert,
                open: true,
                message: 'User name is not valid. Please try another name',
                severity: 'error',
            });
            setLoading(false);
        } else {
            if (!Validation.CheckEmail(input.email)) {
                setAlert({
                    ...alert,
                    open: true,
                    message: 'Email is not valid. Please try again',
                    severity: 'error',
                });
                setLoading(false);
            } else {
                if (input.password.length < 8) {
                    setAlert({
                        ...alert,
                        open: true,
                        message:
                            'Password has to have at least 8 letters, one number, one lowercase and one uppercase letter',
                        severity: 'error',
                    });
                    setLoading(false);
                } else if (!Validation.CheckPassword(input.password)) {
                    setAlert({
                        ...alert,
                        open: true,
                        message:
                            'Password has to have at least 8 letters, one number, one lowercase and one uppercase letter',
                        severity: 'error',
                    });
                    setLoading(false);
                } else if (input.password !== cfPass) {
                    setAlert({
                        ...alert,
                        open: true,
                        message: 'Your confirmed password is wrong with the origin',
                        severity: 'error',
                    });
                    setLoading(false);
                } else {
                    const temp = generateOTP();
                    setVerifyCode(temp);
                }
            }
        }
    };

    const handleVerifyAndReg = async (verifyCodeUse, userVerifyCode) => {
        setOpenModalVerify(false);
        try {
            if (userVerifyCode === verifyCodeUse) {
                setLoading(true);
                const resultAction = await dispatch(register({ input }));
                const originalPromiseResult = unwrapResult(resultAction);
                if (originalPromiseResult.status === 409) {
                    handleCloseModalVerify();
                    setLoading(true);
                    setAlert({
                        ...alert,
                        open: true,
                        message: 'This account signed with this email is existed',
                        severity: 'error',
                    });
                    setLoading(false);
                } else {
                    handleCloseModalVerify();
                    setAlert({
                        ...alert,
                        open: true,
                        message: 'Register failed',
                        severity: 'error',
                    });
                    setLoading(false);
                }
            } else {
                setAlert({
                    ...alert,
                    open: true,
                    message: 'Wrong verify code. Please try again',
                    severity: 'error',
                });
                setLoading(false);
            }
        } catch (rejectedValueOrSerializedError) {
            if (rejectedValueOrSerializedError != null) {
                handleCloseModalVerify();
                setAlert({
                    ...alert,
                    open: true,
                    message: 'Registered successful.',
                    severity: 'success',
                });
                navigate('./login');
            }
        }
    };
    return (
        <div className="bigContainer">
            <section className="registerSection">
                <div className="color" />
                <div className="color" />
                <div className="color" />
                <div className="registerBox">
                    <div className="square" />
                    <div className="square" />
                    <div className="square" />
                    <div className="square" />
                    <div className="square" />
                    <div className="container">
                        <div className="registerForm">
                            <h2>Register Form</h2>
                            <form>
                                <div className="registerInputBox">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                                    />
                                </div>
                                <div className="registerInputBox">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                                    />
                                </div>
                                <div className="registerInputBox">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setInput({ ...input, password: e.target.value })}
                                    />
                                </div>
                                <div className="registerInputBox">
                                    <input
                                        type="password"
                                        placeholder="Password again"
                                        onChange={(e) => setCfPass(e.target.value)}
                                    />
                                </div>
                                <div className="registerInputBox">
                                    {loading ? (
                                        <CircularProgress sx={{ marginBottom: '20px' }} />
                                    ) : (
                                        <input type="button" onClick={handleRegister} value="Register" />
                                    )}
                                </div>
                                <p className="forget">
                                    Or skip to <a href="/login">Login</a>
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
            <VerifyRegisterModal
                openModalVerify={openModalVerify}
                handleCloseModalVerify={handleCloseModalVerify}
                input={input}
                handleVerifyAndReg={(verifyCodeUse, userVerifyCode) => handleVerifyAndReg(verifyCode, userVerifyCode)}
            />
        </div>
    );
}

export default Register;
