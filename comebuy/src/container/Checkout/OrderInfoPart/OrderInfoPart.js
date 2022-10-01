/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Typography, TextField, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { AddressSelector } from '../../../components';
import { currentUser } from '../../../redux/selectors';
import { accountSlice } from '../../../redux/slices/accountSlice';
import { CheckEmail } from '../../LoginAndRegister/ValidationDataForAccount';
import SnackBarAlert from '../../../components/SnackBarAlert/index';

export default function OrderInfoPart(prop) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isCustomer = localStorage.getItem('role') === 'customer';
    const _currentUser = useSelector(currentUser);
    const [province, setProvince] = useState({});
    const [provinceList, setProvinceList] = useState([]);
    const [district, setDistrict] = useState({});
    const [districtList, setDistrictList] = useState([]);
    const [commune, setCommune] = useState({});
    const [communeList, setCommuneList] = useState([]);

    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });

    useEffect(() => {
        const getProvinceList = async () => {
            const resProvince = await fetch('https://sheltered-anchorage-60344.herokuapp.com/province');
            const resProv = resProvince.json();
            setProvinceList(await resProv);
            prop.setOrderInfo({
                ...prop.orderInfo,
                fullName: isCustomer ? _currentUser.name : '',
                email: isCustomer ? _currentUser.email : '',
            });
        };
        getProvinceList();
    }, []);

    useEffect(() => {
        const getDistrict = async () => {
            const resDistrict = await fetch(
                `https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${province.idProvince}`,
            );
            const resDis = resDistrict.json();
            setDistrictList(await resDis);
        };
        getDistrict();
    }, [province]);

    useEffect(() => {
        const getCommune = async () => {
            const reCommune = await fetch(
                `https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${district.idDistrict}`,
            );
            const resCom = reCommune.json();
            setCommuneList(await resCom);
        };
        getCommune();
    }, [district]);

    const handleLogOutOrIn = () => {
        if (isCustomer) {
            dispatch(accountSlice.actions.logout());
            localStorage.setItem('role', '');
            localStorage.setItem('idUser', '');
            localStorage.setItem('cart', JSON.stringify([]));
        }
        navigate(isCustomer ? 0 : '/login');
    };

    const handleSubmit = () => {
        const isNotFilled =
            !prop.orderInfo.fullName ||
            !prop.orderInfo.email ||
            !prop.orderInfo.phoneNumber ||
            !prop.orderInfo.address ||
            province === null ||
            district === null ||
            commune === null;
        const isEmail = CheckEmail(prop.orderInfo.email);
        setAlert({
            ...alert,
            open: isNotFilled || !isEmail,
            severity: 'warning',
            message: isNotFilled ? 'Please fill in information' : 'Check it whether it was an email',
        });
        if (!isNotFilled && isEmail) {
            const temp = `${prop.orderInfo.address}, ${province.name}, ${district.name}, ${commune.name}`;
            prop.setOrderInfo({ ...prop.orderInfo, address: temp });
            prop.setIsPaymentPart(true);
        }
    };

    const closeAlert = () => setAlert({ ...alert, open: false });

    return (
        <Grid item xs={7} height="100%">
            {console.log(prop.orderInfo)}
            <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                <Stack
                    direction="column"
                    sx={{
                        paddingBottom: '1em',
                        display: 'block',
                    }}
                >
                    <Stack marginTop="-3%">
                        <Typography
                            sx={{
                                color: '#333333',
                                fontSize: '1.28571em',
                                fontWeight: 'normal',
                                lineHeight: '1em',
                                marginBlockStart: '0.83em',
                                marginBlockEnd: '0.83em',
                                display: 'block',
                                fontFamily: 'sans-serif',
                            }}
                        >
                            Checkout detail
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ width: '100%', position: 'relative' }}>
                        <Avatar sx={{ height: '70px', width: '70px' }} alt="" src={_currentUser.avatar} />
                        <Stack direction="column" marginLeft="0.1em">
                            <p
                                style={{
                                    marginBlockStart: '1em',
                                    marginBlockEnd: '1em',
                                    display: 'block',
                                    marginBottom: '0.75em',
                                    lineHeight: '1.5em',
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    marginTop: '0.1%',
                                    marginLeft: '1.2em',
                                }}
                            >
                                {_currentUser.name} ({_currentUser.email})
                            </p>
                            <Link
                                underline="hover"
                                sx={{
                                    textDecoration: 'none',
                                    color: '#338dbc',
                                    transition: 'color 0.2s ease-in-out',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    lineHeight: '1.5em',
                                    marginLeft: '1.2em',
                                }}
                                onClick={handleLogOutOrIn}
                                href
                            >
                                {isCustomer ? 'Log out' : 'Log in'}
                            </Link>
                        </Stack>
                    </Stack>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Full name"
                        variant="outlined"
                        sx={{
                            color: '#333333',
                            fontFamily: 'sans-serif',
                            marginTop: '1em',
                        }}
                        value={prop.orderInfo.fullName}
                        onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, fullName: e.target.value })}
                    />
                    <Grid
                        spacing={2}
                        container
                        sx={{
                            width: '100%',
                            position: 'relative',
                            marginTop: '0.25rem',
                        }}
                    >
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={prop.orderInfo.email}
                                onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, email: e.target.value })}
                                sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                }}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Phone number"
                                variant="outlined"
                                type="tel"
                                value={prop.orderInfo.phoneNumber}
                                onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, phoneNumber: e.target.value })}
                                sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Your address to get order"
                        variant="outlined"
                        sx={{
                            color: '#333333',
                            fontFamily: 'sans-serif',
                            marginTop: '1.3rem',
                        }}
                        value={prop.orderInfo.address}
                        onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, address: e.target.value })}
                    />
                    <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '1em' }}>
                        <Grid item xs={4}>
                            <AddressSelector
                                selected={province}
                                handleChangePlace={(e) => setProvince(e.target.value)}
                                listPlace={provinceList}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <AddressSelector
                                selected={district}
                                handleChangePlace={(e) => setDistrict(e.target.value)}
                                listPlace={districtList}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <AddressSelector
                                selected={commune}
                                handleChangePlace={(e) => setCommune(e.target.value)}
                                listPlace={communeList}
                            />
                        </Grid>

                        <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
                            <Grid item xs={6}>
                                <Link
                                    underline="hover"
                                    onClick={() => navigate('/myplace/mycart')}
                                    sx={{
                                        textDecoration: 'none',
                                        color: '#338dbc',
                                        transition: 'color 0.2s ease-in-out',
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontFamily: 'sans-serif',
                                        lineHeight: '1.5em',
                                        marginLeft: '1.2em',
                                    }}
                                    href
                                >
                                    My Cart
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => handleSubmit()}
                                    variant="contained"
                                    sx={{ fontSize: '14px' }}
                                    size="large"
                                >
                                    Continue to payment method
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
            <SnackBarAlert
                open={alert.open}
                handleClose={closeAlert}
                severity={alert.severity}
                message={alert.message}
            />
        </Grid>
    );
}
