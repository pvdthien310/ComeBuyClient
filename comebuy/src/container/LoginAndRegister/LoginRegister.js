import React, { useState, useRef, useEffect } from 'react'
import { TextField, Checkbox, Typography, FormControlLabel, Modal, Box, Button } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { makeStyles } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import clsx from "clsx";
import { currentUser, isSignedIn_user, loading_user, messageError } from '../../redux/selectors'
//For redux
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { register, login } from '../../redux/slices/accountSlice'
import { useNavigate } from 'react-router';

import CountDown from './CountDown'
import * as Validation from './ValidationDataForAccount'
import './LoginRegister.css'


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



const LoginRegister = () => {

    const _currentUser = useSelector(currentUser)
    const _loadingUser = useSelector(loading_user)
    const _isSignedIn = useSelector(isSignedIn_user)
    const _messageError = useSelector(messageError)

    const [addClass, setAddClass] = useState("");

    //For checkbox in modal
    const [isChecked, setIsChecked] = useState(false);

    //For check password
    const [cfPass, setCfPass] = useState("");

    //Data for register
    const [dataForReg, setDataForReg] = useState({
        userID: "00000000-0000-0000-0000-000000000000",
        name: "kkk",
        dob: "kk",
        avatar: "kk",
        phoneNumber: "kkk",
        email: "test.com",
        password: "xxxxxxxxxxxxxxxxxxxx",
        bio: "kkk",
        address: "kk",
        role: "kk",
        sex: "kk"
    })

    //for open error alert password
    const [openPasswordError, setOpenPasswordError] = useState(false);

    //for open error alert CFpassword
    const [openCfPasswordError, setOpenCfPasswordError] = useState(false);

    //for open error alert username
    const [openUsernameError, setOpenUsernameError] = useState(false);

    //for open error alert email
    const [openEmailError, setOpenEmailError] = useState(false);

    //For show password
    const [passwordShown, setPasswordShown] = useState(false);

    //For email login 
    const [emailUser, setEmailUser] = useState(null);

    //For password login 
    const [passwordUser, setPasswordUser] = useState(null);

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

    //useRef for auto focusing in verify code modal
    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)
    const pin5Ref = useRef(null)

    //UseState for auto focusing
    const [pin1, setPin1] = useState("")
    const [pin2, setPin2] = useState("")
    const [pin3, setPin3] = useState("")
    const [pin4, setPin4] = useState("")
    const [pin5, setPin5] = useState("")

    //For modal terms
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //For modal verify
    const [openModalVerify, setOpenModalVerify] = useState(false);
    const handleOpenModalVerify = () => { setOpenModalVerify(true); setToggleRefresh(false) };
    const handleCloseModalVerify = () => setOpenModalVerify(false);

    //For toggle refresh button
    const [toggleRefresh, setToggleRefresh] = useState(false);

    //For countdown caution
    const onTimesup = () => {
        setToggleRefresh(true);
    }

    //For animation refresh in verify
    const [spin, setSpin] = useState(false);
    const classes = useStyles();

    //For register button
    const [canReg, setCanReg] = useState(true);


    //for redux
    const dispatch = useDispatch();

    const refreshCanvas = () => {
        setSpin(true);
        setTimeout(() => {
            setSpin(false);
            setToggleRefresh(false);
        }, 1000);
    };

    const navigate = useNavigate()
    useEffect(() => {
        if (_currentUser.email !== 'test.com' && _isSignedIn == true) {
            navigate('/')
        }

    }, [_currentUser]);

    const handleLogin = () => {
        if (emailUser != null && passwordUser != null) {
            dispatch(login({ email: emailUser, password: passwordUser }))
        }
    }

    const handleCreateAccount = () => {
        //validate username first -> email -> password
        //validate username
        if (Validation.CheckUsername(dataForReg.name)) {
            setOpenUsernameError(true);
        } else {
            //Validate email
            if (!Validation.CheckEmail(dataForReg.email)) {
                setOpenEmailError(true);
            } else {
                //validate password
                if (dataForReg.password.length < 8) {
                    setOpenPasswordError(true);
                } else {
                    if (!Validation.CheckPassword(dataForReg.password)) {
                        setOpenPasswordError(true)
                    } else {
                        if (dataForReg.password !== cfPass) {
                            setOpenCfPasswordError(true)
                        } else {
                            handleOpenModalVerify();
                        }
                    }
                }
            }
        }
    }

    const handleVerifyAndReg = () => {
        console.log(pin1 + pin2 + pin3 + pin4 + pin5);
        dispatch(register({ dataForReg, toast }))
    }

    return (
        <div className="login_register">
            <div className={`container ${addClass}`} id="container">
                <div className="form-container sign-up-container">
                    {/* <form validate> */}
                    <form>
                        <Typography variant="h4" style={{ marginBottom: '20px', fontFamily: '-moz-initial' }}>Create an account</Typography>

                        {/*USERNAME*/}
                        <TextField
                            className='text-field-in-form'
                            name="username"
                            variant='standard'
                            label="User name"
                            type="text"
                            fullWidth
                            value={dataForReg.name}
                            onFocus={() => setOpenUsernameError(false)}
                            onChange={(e) => setDataForReg({ ...dataForReg, name: e.target.value })}
                        />
                        {openUsernameError ? (
                            <Alert severity="warning">Username can't have only space or any of these letter /^ *$.,;:@#""''-!`~%&\/(){ }[]/</Alert>
                        ) : (
                            null
                        )}

                        {/*EMAIL*/}
                        <TextField
                            className='text-field-in-form'
                            name="email"
                            variant='standard'
                            label="Email"
                            type="email"
                            fullWidth
                            value={dataForReg.email}
                            onFocus={() => setOpenEmailError(false)}
                            onChange={(e) => setDataForReg({ ...dataForReg, email: e.target.value })}
                        />
                        {openEmailError ? (
                            <Alert severity="warning">Please type email</Alert>
                        ) : (
                            null
                        )}

                        {/*PASSWORD */}
                        <div className="password-in-form">
                            <TextField
                                className='text-field-in-form'
                                name="password"
                                variant='standard'
                                label="Password"
                                type={passwordShown ? "text" : "password"}
                                fullWidth
                                value={dataForReg.password}
                                onFocus={() => setOpenPasswordError(false)}
                                onChange={(e) => setDataForReg({ ...dataForReg, password: e.target.value })}
                            />
                            {passwordShown ? (
                                <IconButton onClick={togglePassword}>
                                    <VisibilityIcon color="success" />
                                </IconButton>
                            ) : (
                                <IconButton onClick={togglePassword}>
                                    <VisibilityOffIcon />
                                </IconButton>
                            )}
                        </div>
                        {openPasswordError ? (
                            <Alert severity="warning">
                                Password has to have at least 8 letters, one number, one lowercase and one uppercase letter
                            </Alert>
                        ) : (
                            null
                        )}

                        {/*Confirm password */}
                        <div className="password-in-form">
                            <TextField
                                name="password"
                                variant='standard'
                                label="Confirm Password"
                                type={cfPasswordShown ? "text" : "password"}
                                fullWidth
                                value={cfPass}
                                onFocus={() => setOpenCfPasswordError(false)}
                                onChange={(e) => setCfPass(e.target.value)}
                            />
                            {cfPasswordShown ? (
                                <IconButton onClick={toggleCfPassword}>
                                    <VisibilityIcon color="success" />
                                </IconButton>
                            ) : (
                                <IconButton onClick={toggleCfPassword}>
                                    <VisibilityOffIcon />
                                </IconButton>
                            )}
                        </div>
                        {openCfPasswordError ? (
                            <Alert severity="warning">Password is not match</Alert>
                        ) : (
                            null
                        )}


                        {/*button for opening modal term */}
                        {(!openModal && isChecked) ? (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <CheckCircleRoundedIcon
                                    style={{
                                        color: 'green',
                                        width: '50px',
                                        height: '50px',
                                        marginBottom: '-10px',
                                        paddingTop: '5px'
                                    }}
                                />
                                <p style={{ fontWeight: 'bold' }}>
                                    Accepted all the terms in this web.
                                </p>
                            </div>
                        ) : (
                            <Button
                                onClick={handleOpenModal}
                                variant='outlined'
                                size="small"
                                style={{
                                    width: '80%',
                                    height: '4%',
                                    borderRadius: '15px',
                                    color: 'black',
                                    marginTop: '40px',
                                    marginBottom: '10px'
                                }}
                            >
                                View Term for signing up
                            </Button>
                        )}
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '40%',
                                height: '50%',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Terms in ComeBuy
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Here is place where you input your term
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="large"
                                            color='success'
                                            onChange={() => {
                                                if (isChecked) {
                                                    setIsChecked(false)
                                                    setCanReg(true)
                                                } else {
                                                    setIsChecked(true)
                                                    setCanReg(false)
                                                }
                                            }} checked={isChecked}
                                        />}
                                    style={{ fontFamily: '-moz-initial' }}
                                    label="I accept all terms"
                                />
                                <br></br>
                                <Button onClick={handleCloseModal}>Continue</Button>
                            </Box>
                        </Modal>

                        <Button
                            onClick={() => handleCreateAccount()}
                            disabled={canReg}
                            style={{
                                marginTop: '25px',
                                borderRadius: '20px',
                                border: '1px solid #18608a',
                                backgroundColor: '#18608a',
                                color: '#ffffff',
                                fontSize: '13px',
                                fontWeight: 'bold',
                                padding: '12px 45px',
                                letterSpacing: '1px',
                            }}
                        >
                            Register
                        </Button>

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
                                            onClick={handleVerifyAndReg}
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

                    </form>
                </div>


                {/* SIGN IN */}
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <TextField
                            type="email"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmailUser(e.target.value);
                            }} />
                        <TextField
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPasswordUser(e.target.value);
                            }} />
                        <Button
                            onClick={() => handleLogin()}
                        >
                            Sign In
                        </Button>
                        {
                            _loadingUser == true ?
                                <p>loading.....</p> :
                                null
                        }
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <button className="ghost" id="signIn" onClick={() => setAddClass("")}>
                                Had an account ? Go to sign in now
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <button className="ghost" id="signUp" onClick={() => setAddClass("right-panel-active")}>
                                Create an account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister