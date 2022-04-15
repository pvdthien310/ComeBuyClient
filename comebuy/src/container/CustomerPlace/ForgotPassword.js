import React, { useState, useRef, useEffect } from 'react'

import { Stack, Modal, Typography, Button, Box } from '@mui/material';
import { Snackbar, Alert, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//Beside
import clsx from "clsx";
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { makeStyles } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";

import CountDown from '../LoginAndRegister/CountDown';
import { CheckEmail, CheckPassword } from '../LoginAndRegister/ValidationDataForAccount';
import emailApi from '../../api/emailAPI';

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




const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

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
                text: "Thank you for using our website. \nThis is your OTP code: " + verifyCode
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
                    setOpenBackdrop(!openBackdrop);
                    let temp = generateOTP()
                    setVerifyCode(temp)
                }
            }
        }
    }

    //for dialog alert that you reg successfully or not
    const [openDialogRegSuccessfully, setOpenDialogRegSuccessfully] = useState(false);

    const [openDialogRegFailed, setOpenDialogRegFailed] = useState(false);

    const handleCloseModalVerify = () => { setOpenModalVerify(false) }

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
        try {
            // if (here === verifyCode) {
            //     setOpenBackdrop(true)
            //     const resultAction = await dispatch(register({ dataForReg }))
            //     const originalPromiseResult = unwrapResult(resultAction)
            //     // handle result here

            //     if (originalPromiseResult === true) {
            //         handleCloseModalVerify()
            //         setOpenDialogRegFailed(false)
            //         setIsRegistering(1)
            //     }
            // } else {
            //     setOpenWrongVerify(true)
            // }
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
        <div>
            <div style={{
                marginLeft: '37%',
                marginRight: '37%',
                marginBottom: '10%',
                marginTop: '10%',
                backgroundColor: 'black',
                justifySelf: 'center',
                borderRadius: '15%',
            }}>
                <Stack direction="column" spacing={3} style={{ marginTop: '15%', padding: '10%' }}>
                    <Typography style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: 'white',
                        alignSelf: 'center'
                    }}
                    >
                        Reset Password
                    </Typography>
                    <input style={{
                        backgroundColor: '#F2F1F0',
                        borderRadius: '15px',
                        fontSize: '16px',
                        height: '5%',
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
                            backgroundColor: '#F2F1F0',
                            borderRadius: '15px',
                            fontSize: '16px',
                            height: '5%',
                            width: '95%',
                            padding: '3%'
                        }}
                            id="outlined-basic"
                            type={passwordShown ? "text" : "password"}
                            placeholder="New Password..."
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
                            backgroundColor: '#F2F1F0',
                            borderRadius: '15px',
                            fontSize: '16px',
                            height: '5%',
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
                            backgroundColor: '#D9D6D2',
                            color: '#0D0D0D',
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
                        height: '30%',
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
                                marginBottom: '10px'
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
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                {
                                    toggleRefresh ? (
                                        <Autorenew
                                            className={clsx({
                                                [classes.refresh]: true,
                                                spin: spin
                                            })}
                                            onClick={() => { refreshCanvas() }}
                                            spin={360}
                                        />) : (
                                        <CountDown onTimesup={onTimesup} />
                                    )
                                }
                                <Button
                                    onClick={handleVerifyAndResetPassword}
                                    style={{
                                        width: '20%',
                                        borderRadius: '20px',
                                        border: '1px solid #18608a',
                                        backgroundColor: '#18608a',
                                        color: '#ffffff',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    CONFIRM
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
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
        </div>
    )
}

export default ForgotPassword;
