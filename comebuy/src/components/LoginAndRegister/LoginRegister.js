import React, {useState, useRef} from 'react'
import {TextField, Checkbox, Typography, FormControlLabel, Modal, Box, Button, Collapse, IconButton } from '@material-ui/core';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Alert from '@mui/material/Alert';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CloseIcon from '@mui/icons-material/Close';
import CountDown from './CountDown'

import CheckPassword from  './ValidationDataForAccount'

import checkPassword from './LoginRegister.css'

function LoginRegister() {

    const [addClass, setAddClass] = useState("");

    //For checkbox in modal
    const [isChecked, setIsChecked] = useState(false);

    //For check password
    const [cfPass, setCfPass] = useState("");

    //Data for register
    const [dataForReg, setDataForReg] = useState({
        username: '',
        email: '',
        password: '',
    })
    
    //for open error alert password
     const [openPasswordError, setOpenPasswordError] = useState(false); 

     //for open error alert CFpassword
     const [openCfPasswordError, setOpenCfPasswordError] = useState(false); 

    //useRef for auto focusing
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
    const handleOpenModalVerify = () => {setOpenModalVerify(true); setToggleRefresh(false)};
    const handleCloseModalVerify = () => setOpenModalVerify(false);

    //For toggle refresh button
    const [toggleRefresh, setToggleRefresh] = useState(false);

    //for countdown caution
    const onTimesup = () => {
        setToggleRefresh(true);
    }

    //validation username if it's true then it's wrong
    const validateUsername = (username) => {
        return username === null || username.match(/^ *$.,;:(){}[]/) !== null;
    }

    const handleCreateAccount  = () => {
       //validate password
       if(dataForReg.password.length < 8) {
            setOpenPasswordError(true)
       } else {
            if(!CheckPassword(dataForReg.password)) {
                setOpenPasswordError(true)
            } else {
                if(dataForReg.password !== cfPass) {
                    setOpenCfPasswordError(true)
                } else {
                    return
                }
            }
       }


    }

    const handleVerifyAndReg = () => {
        console.log(pin1 + pin2 + pin3 + pin4 + pin5);
    }

  return (
    <div className={`container ${addClass}`} id="container">
        <div className="form-container sign-up-container">
            <form validate>
            <Typography variant="h4" style={{marginBottom: '20px', fontFamily:'-moz-initial'}}>Create an account</Typography>
                
                <TextField
                    style={{marginBottom: '10px'}} 
                    name="username"
                    variant='standard'
                    label="User name"
                    type="text"
                    fullWidth
                    value={dataForReg.username}
                    onChange={(e) => setDataForReg({...dataForReg, username: e.target.value })}
                />
                <TextField 
                    style={{marginBottom: '10px'}} 
                    name="email"
                    variant='standard'
                    label="Email"
                    type="email"
                    fullWidth
                    value={dataForReg.email}
                    onChange={(e) => setDataForReg({...dataForReg, email: e.target.value })}
                />

                {/*Password */}
                <TextField 
                    style={{marginBottom: '10px'}} 
                    name="password"
                    variant='standard'
                    label="Password"
                    type="password"
                    fullWidth
                    value={dataForReg.password}
                    onFocus={() => setOpenPasswordError(false)}
                    onChange={(e) => setDataForReg({...dataForReg, password: e.target.value })}
                />
                { openPasswordError ? (
                    <Alert severity="warning">Password has to have at least 8 letters, one number, one lowercase and one uppercase letter</Alert>
                ):(
                    null
                )}

                {/*Confirm password */}
               <TextField 
                    style={{marginBottom: '10px', fontSize: '40px'}}  
                    name="password"
                    variant='standard'
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={cfPass}
                    onFocus={() => setOpenCfPasswordError(false)}
                    onChange={(e) => setCfPass(e.target.value)}
                />
                 { openCfPasswordError ? (
                    <Alert severity="warning">Password is not match</Alert>
                ):(
                   null
                )}

                {/*button for opening modal term */}
                {(!openModal && isChecked) ? (
                     <CheckCircleRoundedIcon style={{color: 'green', width: '50px', height: '50px', marginBottom: '-10px', paddingTop: '5px'}}  />  
                ) : (
                    <Button
                        onClick={handleOpenModal} 
                        variant='outlined'
                        size="small"
                        style={{width: '80%', height: '4%', borderRadius: '15px',color: 'black', marginTop: '40px', marginBottom: '10px'}}
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
                                                if(isChecked) {
                                                    setIsChecked(false)
                                                } else {
                                                    setIsChecked(true)
                                                }
                                            }} checked={isChecked} 
                                        />} 
                                style={{fontFamily:'-moz-initial'}} 
                            label="I accept all terms" 
                        />
                        <br></br>
                        <Button onClick={handleCloseModal}>Continue</Button>
                    </Box>
                </Modal>

                <Button 
                    onClick={() => handleCreateAccount()} 
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
                        <Typography id="modal-verify-title" variant="h6" component="h2" style={{dislay: 'flex', justifyContent: 'flex-end', position: 'absolute', marginBottom: '10px'}}>
                            Verify
                        </Typography>
                        <Typography id="modal-verify-description" style={{marginTop: '40px'}}>
                            We sent a verified code to your email
                        </Typography>
                        
                        <div class="container-modal-verify">
                        <div class="userInput-modal-verify">
			                <input
                                ref={pin1Ref} 
                                className='input-verify' 
                                type="text" 
                                id='ist' 
                                maxlength="1"
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
                                maxlength="1"
                                onKeyUp={() => {
                                    pin3Ref.current.focus()
                                }}  
                                onChange={(e) => {
                                    setPin2(e.target.value)
                                    }
                                }/>
			                <input
                                ref={pin3Ref} 
                                className='input-verify' 
                                type="text"  
                                maxlength="1"
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
                                maxlength={1}
                                onKeyUp={() => {
                                    pin5Ref.current.focus()
                                }}  
                                onChange={(e) => {
                                    setPin4(e.target.value)                                    
                                }}/>
			                <input
                                ref={pin5Ref} 
                                className='input-verify' 
                                type="text"
                                maxlength={1} 
                                onChange={(e) => {
                                    setPin5(e.target.value)}
                                }/>
		                </div>
                        <div style={{marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            {
                                toggleRefresh ? (
                                    <Button>
                                        <RefreshRoundedIcon style={{width: '30px', height: '30px',}} />
                                    </Button>
                                ) : (
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
                                    letterSpacing: '1px',}}
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
                <TextField type="email" placeholder="Email"/>
                <TextField type="password" placeholder="Password"/>
                <button type="submit" >Sign in</button>
            </form>
        </div>

        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <button className="ghost" id="signIn"  onClick={() => setAddClass("")}>
                        Had an account ? Go to sign in now
                    </button>
                </div>
                <div className="overlay-panel overlay-right">
                    <button className="ghost" id="signUp"  onClick={() => setAddClass("right-panel-active")}>
                        Create an account
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginRegister