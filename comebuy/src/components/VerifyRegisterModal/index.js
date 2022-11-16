/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Autorenew } from '@material-ui/icons';
import Backdrop from '@mui/material/Backdrop';

import emailApi from '../../api/emailAPI';

import style from './style';
import './otpBox.css';

export default function VerifyRegisterModal(props) {
    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
    const pin5Ref = useRef(null);
    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');
    const [verifyCodeUse, setVerifyCodeUse] = useState(props.verifyCode);
    const [loading, setLoading] = useState(false);

    const generateOTP = () => {
        const num = '1234567890';
        let OTP = '';
        for (let i = 0; i < 5; i++) {
            OTP += num[Math.floor(Math.random() * 10)];
        }
        return OTP;
    };

    const reSendCode = async () => {
        setLoading(true);
        const temp = generateOTP();
        emailApi
            .sendEmail({
                to: props.input.email,
                subject: 'VERIFY FROM COMEBUY ',
                text: temp,
            })
            .then((data) => {
                setVerifyCodeUse(temp);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const callReg = () => {
        const temp = pin1 + pin2 + pin3 + pin4 + pin5;
        props.handleVerifyAndReg(verifyCodeUse, temp);
    };

    return (
        <Modal
            open={props.openModalVerify}
            onClose={props.handleCloseModalVerify}
            aria-labelledby="modal-verify-title"
            aria-describedby="modal-verify-description"
        >
            <Box sx={style.boxWrapper}>
                <h4>Enter OTP Code that has been sent to your email</h4>
                <div className="otp-box">
                    <input
                        ref={pin1Ref}
                        type="text"
                        maxLength="1"
                        onKeyUp={() => {
                            pin2Ref.current.focus();
                        }}
                        onChange={(e) => {
                            setPin1(e.target.value);
                        }}
                    />
                    <input
                        ref={pin2Ref}
                        type="text"
                        maxLength="1"
                        onKeyUp={() => {
                            pin3Ref.current.focus();
                        }}
                        onChange={(e) => {
                            setPin2(e.target.value);
                        }}
                    />
                    <input
                        ref={pin3Ref}
                        type="text"
                        maxLength="1"
                        className="space"
                        onKeyUp={() => {
                            pin4Ref.current.focus();
                        }}
                        onChange={(e) => {
                            setPin3(e.target.value);
                        }}
                    />
                    <input
                        ref={pin4Ref}
                        type="text"
                        maxLength={1}
                        onKeyUp={() => {
                            pin5Ref.current.focus();
                        }}
                        onChange={(e) => {
                            setPin4(e.target.value);
                        }}
                    />
                    <input
                        ref={pin5Ref}
                        className="input-verify"
                        type="text"
                        maxLength={1}
                        onChange={(e) => {
                            setPin5(e.target.value);
                        }}
                    />
                </div>
                <div style={style.childWrapper}>
                    <Autorenew className="refresh" onClick={reSendCode} />
                    <Button onClick={callReg} style={style.btn}>
                        Confirm
                    </Button>
                </div>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    );
}
