import React, { useState, useRef, useEffect } from 'react'

import { Stack, Modal, Typography, Button, Box } from '@mui/material';
import { Snackbar, Alert, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle } from '@mui/material';

import { useNavigate } from 'react-router';
//Beside
import clsx from "clsx";
import { current, unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { makeStyles } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";

import { useSelector } from 'react-redux';

import CountDown from '../../container/LoginAndRegister/CountDown';
import { CheckEmail, CheckPassword } from '../../container/LoginAndRegister/ValidationDataForAccount';
import emailApi from '../../api/emailAPI';
import { updatePassword } from '../../redux/slices/accountSlice';
import { currentUser } from '../../redux/selectors';

//Style for refresh button in verify modal
const useStyles = makeStyles((theme) => ({
    refresh: {
        marginRight: "10px",
        marginTop: "7px",
        cursor: "pointer",
        margin: "auto",
        "&.spin": {
            animation: "$spin 1s 1",
            pointerEvents: 'none'
        }
    },
    "@keyframes spin": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
    }
}));

const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'absolute',
    resize: true,
})


const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const _currentUser = useSelector(currentUser)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState('')

    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    //For modal verify
    const [openModalVerify, setOpenModalVerify] = useState(false);

    //For toggle refresh button
    const [toggleRefresh, setToggleRefresh] = useState(false);

    //For show password
    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    //For show password
    const [cfPasswordShown, setCfPasswordShown] = useState(false);

    // Password toggle handler
    const toggleCfPassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setCfPasswordShown(!cfPasswordShown);
    };

    //For countdown caution
    const onTimesup = () => {
        setToggleRefresh(true);
    }

    const refreshCanvas = () => {
        setSpin(true);
        setTimeout(() => {
            setSpin(false);
            setToggleRefresh(false);
        }, 2000);
        setOpenBackdrop(!openBackdrop);
        let temp = generateOTP()
        setVerifyCode(temp)
    };

    //UseState for auto focusing
    const [pin1, setPin1] = useState("")
    const [pin2, setPin2] = useState("")
    const [pin3, setPin3] = useState("")
    const [pin4, setPin4] = useState("")
    const [pin5, setPin5] = useState("")

    //useRef for auto focusing in verify code modal
    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)
    const pin5Ref = useRef(null)

    //For animation refresh in verify
    const [spin, setSpin] = useState(false);
    const classes = useStyles();

    //for backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);

    //generate verify code
    function generateOTP() {
        let num = '1234567890'
        let OTP = '';
        for (let i = 0; i < 5; i++) {
            OTP += num[Math.floor(Math.random() * 10)];
        }
        return OTP
    }

    const [verifyCode, setVerifyCode] = useState('')

    const handleOpenModalVerify = () => { setOpenModalVerify(true); setToggleRefresh(false) };

    useEffect(() => {
        if (verifyCode != '') {
            emailApi.sendEmail({
                to: email,
                subject: "Please use OTP code below to reset password ",
                text: verifyCode
            }).then(data => {
                handleOpenModalVerify();
                setOpenBackdrop(false)
            })
                .catch(err => console.log(err))
        } else {
            return
        }
    }, [verifyCode])

    const handleReset = () => {
        if (email === '' || CheckEmail(email) === false) {
            setOpenEmailWrong(true)
        } else {
            if (newPassword === '' || CheckPassword(newPassword) === false) {
                setOpenPasswordWrong(true)
            } else {
                if (confirmNewPassword === '' || newPassword != confirmNewPassword) {
                    setOpenPasswordNotMatch(true)
                } else {
                    setOpenBackdrop(true);
                    let temp = generateOTP()
                    setVerifyCode(temp)
                }
            }
        }
    }

    //for dialog alert that you reg successfully or not
    const [openDialogRegSuccessfully, setOpenDialogRegSuccessfully] = useState(false);
    const [openDialogRegFailed, setOpenDialogRegFailed] = useState(false);

    const handleCloseDialogRegSuccessfully = () => {
        setOpenDialogRegSuccessfully(false)
        navigate('/myplace')
    }
    const handleCloseDialogRegFailed = () => {
        setOpenDialogRegFailed(false);
        handleCloseModalVerify()
    };

    const handleCloseModalVerify = () => {
        setOpenModalVerify(false)
        setOpenBackdrop(false)
    }

    const [openEmailWrong, setOpenEmailWrong] = useState(false);

    const handleCloseEmailWrong = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenEmailWrong(false);
    };

    const [openPasswordWrong, setOpenPasswordWrong] = useState(false);

    const handleClosePasswordWrong = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPasswordWrong(false);
    };

    const [openPasswordNotMatch, setOpenPasswordNotMatch] = useState(false);

    const handleClosePasswordNotMatch = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPasswordNotMatch(false);
    };

    const [isRegistering, setIsRegistering] = useState(0)

    useEffect(() => {
        if (isRegistering === 0) {
            return;
        } else if (isRegistering === 1) {
            setOpenBackdrop(false)
            setOpenDialogRegSuccessfully(true)
        } else {
            setOpenBackdrop(false)
            setOpenDialogRegFailed(true)
        }
    }, [isRegistering])

    const [openWrongVerify, setOpenWrongVerify] = useState(false)
    const handleCloseWrongVerify = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenWrongVerify(false);
    };

    const handleVerifyAndResetPassword = async () => {
        let here = pin1 + pin2 + pin3 + pin4 + pin5
        const data = {
            userID: _currentUser.userID,
            password: newPassword
        }
        try {
            if (here === verifyCode) {
                setOpenBackdrop(true)
                const resultAction = await dispatch(updatePassword(data))
                const originalPromiseResult = unwrapResult(resultAction)
                handleCloseModalVerify()
                setOpenDialogRegFailed(false)
                setIsRegistering(1)
            } else {
                setOpenWrongVerify(true)
            }
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            if (rejectedValueOrSerializedError != null) {
                handleCloseModalVerify()
                setOpenDialogRegSuccessfully(false)
                setIsRegistering(2)
            }
        }
    }


    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <BGImg src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <Stack direction="column" spacing={3}
                style={{
                    width: 300,
                    height: 350,
                    backgroundColor: '#141E26',
                    zIndex: '1',
                    position: 'relative',
                    padding: '2%',
                    borderRadius: '25px',
                    top: 199
                }}>
                <Typography style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center'
                }}
                >
                    Reset password
                </Typography>
                <input style={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    fontSize: '15px',
                    height: 'auto',
                    padding: '3%'
                }}
                    id="outlined-basic"
                    type="text"
                    placeholder="Your email here..."
                    variant="standard"
                    onChange={(e) => setEmail(e.target.value)}
                >
                </input>
                <Stack direction="row" spacing={2}>
                    <input style={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        fontSize: '15px',
                        height: 'auto',
                        width: '95%',
                        padding: '3%'
                    }}
                        id="outlined-basic"
                        type={passwordShown ? "text" : "password"}
                        placeholder="New password..."
                        variant="standard"
                        onChange={(e) => setNewPassword(e.target.value)}
                    >
                    </input>
                    {passwordShown ? (
                        <IconButton onClick={togglePassword}>
                            <VisibilityIcon color="success" />
                        </IconButton>
                    ) : (
                        <IconButton onClick={togglePassword}>
                            <VisibilityOffIcon style={{ color: 'white' }} />
                        </IconButton>
                    )}
                </Stack>

                <Stack direction="row" spacing={2}>
                    <input style={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        fontSize: '15px',
                        height: 'auto',
                        padding: '3%',
                        width: '95%'
                    }}
                        id="outlined-basic"
                        type={cfPasswordShown ? "text" : "password"}
                        placeholder="Confirm Password..."
                        variant="standard"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    >
                    </input>
                    {cfPasswordShown ? (
                        <IconButton onClick={toggleCfPassword}>
                            <VisibilityIcon color="success" />
                        </IconButton>
                    ) : (
                        <IconButton onClick={toggleCfPassword}>
                            <VisibilityOffIcon style={{ color: 'white' }} />
                        </IconButton>
                    )}
                </Stack>

                <Button
                    onClick={handleReset}
                    variant='outlined'
                    size="small"
                    style={{
                        borderRadius: '20px',
                        border: '1px solid #18608a',
                        backgroundColor: '#27735D',
                        color: '#C5D3D9',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        padding: '12px 45px',
                        letterSpacing: '1px',
                    }}
                >
                    Reset
                </Button>
            </Stack>

            <Modal
                open={openModalVerify}
                onClose={handleCloseModalVerify}
                aria-labelledby="modal-verify-title"
                aria-describedby="modal-verify-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    height: 'auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
                >
                    <Typography
                        id="modal-verify-title"
                        variant="h6"
                        component="h2"
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            marginBottom: '10px',
                        }}>
                        Verify
                    </Typography>
                    <Typography id="modal-verify-description" style={{ marginTop: '40px' }}>
                        We sent a verified code. Please check your email
                    </Typography>

                    <div class="container-modal-verify">
                        <div class="userInput-modal-verify">
                            <input
                                ref={pin1Ref}
                                className='input-verify'
                                type="text"
                                id='ist'
                                maxLength="1"
                                onKeyUp={() => {
                                    pin2Ref.current.focus()
                                }}
                                onChange={
                                    (e) => {
                                        setPin1(e.target.value)
                                    }
                                }
                            />
                            <input
                                ref={pin2Ref}
                                className='input-verify'
                                type="text"
                                maxLength="1"
                                onKeyUp={() => {
                                    pin3Ref.current.focus()
                                }}
                                onChange={(e) => {
                                    setPin2(e.target.value)
                                }
                                } />
                            <input
                                ref={pin3Ref}
                                className='input-verify'
                                type="text"
                                maxLength="1"
                                onKeyUp={() => {
                                    pin4Ref.current.focus()
                                }}
                                onChange={(e) => {
                                    setPin3(e.target.value)
                                }
                                } />
                            <input
                                ref={pin4Ref}
                                className='input-verify'
                                type="text"
                                maxLength={1}
                                onKeyUp={() => {
                                    pin5Ref.current.focus()
                                }}
                                onChange={(e) => {
                                    setPin4(e.target.value)
                                }} />
                            <input
                                ref={pin5Ref}
                                className='input-verify'
                                type="text"
                                maxLength={1}
                                onChange={(e) => {
                                    setPin5(e.target.value)
                                }
                                } />
                        </div>
                        <div style={{
                            marginTop: '15px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            {
                                toggleRefresh ? (
                                    <Stack style={{ flexDirection: "flex-end" }} direction="row">
                                        <Autorenew
                                            className={clsx({
                                                [classes.refresh]: true,
                                                spin: spin
                                            })}
                                            onClick={() => { refreshCanvas() }}
                                            spin={360}
                                        />
                                        <Button
                                            onClick={handleVerifyAndResetPassword}
                                            style={{
                                                width: 'auto',
                                                borderRadius: '20px',
                                                backgroundColor: '#18608a',
                                                color: '#ffffff',
                                                fontSize: '13px',
                                                fontWeight: 'bold',
                                                letterSpacing: '1px',
                                            }}
                                        >
                                            CONFIRM
                                        </Button>
                                    </Stack>) : (
                                    <Stack direction="row" >
                                        <CountDown onTimesup={onTimesup} />
                                        <Button
                                            onClick={handleVerifyAndResetPassword}
                                            style={{
                                                width: 'auto',
                                                borderRadius: '20px',
                                                backgroundColor: '#18608a',
                                                color: '#ffffff',
                                                fontSize: '13px',
                                                fontWeight: 'bold',
                                                letterSpacing: '1px',
                                            }}
                                        >
                                            CONFIRM
                                        </Button>
                                    </Stack>

                                )
                            }
                        </div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackdrop}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>
                </Box>
            </Modal>

            {/*Dialog for having registered successfully or email existed */}
            {openDialogRegFailed ? (
                <Dialog open={openDialogRegFailed} onClose={handleCloseDialogRegFailed}>
                    <DialogTitle color='error'>Reset password failed</DialogTitle>
                    <Button
                        onClick={handleCloseDialogRegFailed}
                        style={{
                            alignSelf: 'center',
                            width: '30px',
                            height: '30px',
                            borderRadius: '15px',
                            border: '1px solid #18608a',
                            backgroundColor: 'red',
                            color: 'black',
                            fontSize: '13px',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            padding: '12px 45px',
                        }}
                    >
                        OK
                    </Button>
                </Dialog>
            ) : null
            }
            {openDialogRegSuccessfully ?
                (
                    <Dialog open={openDialogRegSuccessfully} onClose={handleCloseDialogRegSuccessfully}>
                        <DialogTitle>Reset password successfully</DialogTitle>
                        <Button
                            onClick={handleCloseDialogRegSuccessfully}
                            style={{
                                alignSelf: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '15px',
                                border: '1px solid #18608a',
                                backgroundColor: 'green',
                                color: '#ffffff',
                                fontSize: '13px',
                                marginBottom: '10px',
                                fontWeight: 'bold',
                                padding: '12px 45px',
                            }}
                        >
                            OK
                        </Button>
                    </Dialog>
                ) : null}

            {/*Snackbar*/}
            <Snackbar open={openEmailWrong} autoHideDuration={6000} onClose={handleCloseEmailWrong}>
                <Alert onClose={handleCloseEmailWrong} severity="error" sx={{ width: '100%' }}>
                    Please check your email first.
                </Alert>
            </Snackbar>

            {/*Snackbar for password invalid*/}
            <Snackbar open={openPasswordWrong} autoHideDuration={6000} onClose={handleClosePasswordWrong}>
                <Alert onClose={handleClosePasswordWrong} severity="error" sx={{ width: '100%' }}>
                    Password has to have at least 8 letters, one number, one lowercase and one uppercase letter. Try again
                </Alert>
            </Snackbar>

            {/*Snackbar for password not match*/}
            <Snackbar open={openPasswordNotMatch} autoHideDuration={6000} onClose={handleClosePasswordNotMatch}>
                <Alert onClose={handleClosePasswordNotMatch} severity="error" sx={{ width: '100%' }}>
                    Password is not match. Try again
                </Alert>
            </Snackbar>

            {/*Snackbar*/}
            <Snackbar open={openWrongVerify} autoHideDuration={6000} onClose={handleCloseWrongVerify}>
                <Alert onClose={handleCloseWrongVerify} severity="error" sx={{ width: '100%' }}>
                    Wrong verify code. Please try again.
                </Alert>
            </Snackbar>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default ForgotPassword;
