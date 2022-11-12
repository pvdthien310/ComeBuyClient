/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Typography, TextField, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { AddressSelector } from '..';
import { currentUser } from '../../redux/selectors';
import { accountSlice } from '../../redux/slices/accountSlice';
import { CheckEmail } from '../../container/LoginAndRegister/ValidationDataForAccount';
import SnackBarAlert from '../SnackBarAlert/index';

import style from './style';

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
            <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                <Stack direction="column" sx={style.stackContainer}>
                    <Stack marginTop="-3%">
                        <Typography sx={style.titleTypo}>Checkout detail</Typography>
                    </Stack>
                    <Stack direction="row" sx={style.stackUserInfo}>
                        <Avatar sx={style.avt} alt="" src={_currentUser.avatar} />
                        <Stack direction="column" marginLeft="0.1em">
                            <p style={style.userInfo}>
                                {_currentUser.name} ({_currentUser.email})
                            </p>
                            <Link underline="hover" sx={style.backToCartBtn} onClick={handleLogOutOrIn} href>
                                {isCustomer ? 'Log out' : 'Log in'}
                            </Link>
                        </Stack>
                    </Stack>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Full name"
                        variant="outlined"
                        sx={style.textField}
                        value={prop.orderInfo.fullName}
                        onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, fullName: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Your address to get order"
                        variant="outlined"
                        sx={{ ...style.textFieldEmail, marginTop: '1.3rem' }}
                        value={prop.orderInfo.address}
                        onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, address: e.target.value })}
                    />
                    <Grid spacing={3} container sx={style.grid}>
                        <Grid item xs={7}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={prop.orderInfo.email}
                                onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, email: e.target.value })}
                                sx={style.textFieldEmail}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Phone number"
                                variant="outlined"
                                type="tel"
                                value={prop.orderInfo.phoneNumber}
                                onChange={(e) => prop.setOrderInfo({ ...prop.orderInfo, phoneNumber: e.target.value })}
                                sx={style.textFieldEmail}
                            />
                        </Grid>
                    </Grid>

                    <Grid spacing={2} container sx={style.grid2}>
                        <Grid item xs={4}>
                            <AddressSelector
                                selected={province}
                                holder="Province"
                                handleChangePlace={(e) => setProvince(e.target.value)}
                                listPlace={provinceList}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <AddressSelector
                                selected={district}
                                holder="District"
                                handleChangePlace={(e) => setDistrict(e.target.value)}
                                listPlace={districtList}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <AddressSelector
                                selected={commune}
                                holder="Commune"
                                handleChangePlace={(e) => setCommune(e.target.value)}
                                listPlace={communeList}
                            />
                        </Grid>

                        <Grid spacing={2} container sx={style.grid3}>
                            <Grid item xs={6}>
                                <Link
                                    underline="hover"
                                    onClick={() => navigate('/myplace/mycart')}
                                    sx={style.backToCartBtn}
                                    href
                                >
                                    My Cart
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => handleSubmit()}
                                    variant="contained"
                                    sx={style.goToBtn}
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
