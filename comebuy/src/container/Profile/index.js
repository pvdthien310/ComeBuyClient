import React, { useState, useEffect } from 'react'
import { currentUser } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { unwrapResult } from '@reduxjs/toolkit'


import { login } from '../../redux/slices/accountSlice';
import ProfileManage from './ProfileManage';
import { useNavigate } from 'react-router';

const Profile = () => {

    const dispatch = useDispatch()

    const [canAccess, setCanAccess] = useState(false);

    const _currentUser = useSelector(currentUser)

    const [passwordShown, setPasswordShown] = useState(false);

    const [password, setPassword] = useState('')

    const [openLoginFailed, setOpenLoginFailed] = useState(false);

    const handleCloseLoginFailed = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenLoginFailed(false);
    };

    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    //handle login function
    const handleLogin = async () => {
        if (password === null || password === '') {
            setOpenLoginFailed(true)
        } else {
            try {
                const resultAction = await dispatch(login({ email: _currentUser.email, password: password }))
                const originalPromiseResult = unwrapResult(resultAction)
                setCanAccess(true)
            } catch (rejectedValueOrSerializedError) {
                if (rejectedValueOrSerializedError != null) {
                    setOpenLoginFailed(true)
                    setPassword("")
                }
            }
        }
    }

    const navigate = useNavigate();
    const handleForgotPassword = () => {
        navigate('/myplace/resetpassword')
    }

    return (
        <div>
            {canAccess ? (
                <ProfileManage />
            ) : (
                // PasswordForm
                <div style={{
                    marginLeft: '37%',
                    marginRight: '37%',
                    marginBottom: '10%',
                    marginTop: '10%',
                    backgroundColor: 'black',
                    justifySelf: 'center',
                    borderRadius: '15%'
                }}>
                    <Stack direction="column" spacing={3} style={{ marginTop: '15%', padding: '10%' }}>
                        <Stack direction="row" spacing={3} >
                            <Avatar alt="" src={_currentUser.avatar} sx={{ width: 100, height: 100 }} />
                            <Typography style={{ marginTop: '13%', fontSize: '20px', fontWeight: 'bold', color: '#F2F1F0' }}>{_currentUser.name}</Typography>
                        </Stack>
                        <Stack flexDirection="flex-start" direction="row" spacing={2}>
                            <input style={{ backgroundColor: '#F2F1F0', borderRadius: '15px', fontSize: '17px', width: '450px', paddingLeft: '5%' }}
                                id="outlined-basic"
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"
                                variant="standard"
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </input>
                            {passwordShown ? (
                                <IconButton onClick={togglePassword}>
                                    <VisibilityIcon color="success" />
                                </IconButton>
                            ) : (
                                <IconButton onClick={togglePassword}>
                                    <VisibilityOffIcon style={{ color: '#F2F1F0' }} />
                                </IconButton>
                            )}

                        </Stack>
                        <Button onClick={handleForgotPassword} style={{ fontSize: '12px', color: '#F2F1F0', textDecoration: 'underline', alignSelf: 'flex-start' }}>
                            Forgot password ?
                        </Button>
                        <Button
                            onClick={handleLogin}
                            variant='outlined'
                            size="small"
                            style={{
                                borderRadius: '20px',
                                border: '1px solid #18608a',
                                backgroundColor: '#D9D6D2',
                                color: '#0D0D0D',
                                fontSize: '13px',
                                fontWeight: 'bold',
                                padding: '12px 45px',
                                letterSpacing: '1px',
                            }}
                        >
                            Sign in
                        </Button>
                    </Stack>
                </div>
            )}
            {/*Snackbar*/}
            <Snackbar open={openLoginFailed} autoHideDuration={6000} onClose={handleCloseLoginFailed}>
                <Alert onClose={handleCloseLoginFailed} severity="error" sx={{ width: '100%' }}>
                    Something went wrong ! Please check your password.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Profile