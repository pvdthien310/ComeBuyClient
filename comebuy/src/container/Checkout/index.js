import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Stack, Typography, Link, Breadcrumbs, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DiamondIcon from '@mui/icons-material/Diamond';

import { CheckEmail, CheckPhoneNumber } from './../LoginAndRegister/ValidationDataForAccount'
import { isSignedIn_user, currentUser, cartListSelector } from '../../redux/selectors';
import { getAllCart } from '../../redux/slices/cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllProduct, getProductWithID } from '../../redux/slices/productSlice';
import { accountSlice } from '../../redux/slices/accountSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CheckoutPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSignedIn = useSelector(isSignedIn_user)

    const [listCart, setListCart] = useState([])
    const [listProd, setListProd] = useState([])

    const _guestCart = useSelector(cartListSelector)

    useEffect(() => {
        const fetchYourCart = async () => {
            if (localStorage.getItem('role') === 'customer') {
                let temp = []
                let listCart = []
                let listProd = []
                try {
                    const resultAction = await dispatch(getAllCart())
                    const originalPromiseResult = unwrapResult(resultAction)
                    temp = originalPromiseResult
                    for (let i = 0; i < temp.length; i++) {
                        if (temp[i].userid === _currentUser.userID) {
                            listCart.push(temp[i])
                            const resultAction2 = await dispatch(getProductWithID(temp[i].productid))
                            const originalPromiseResult2 = unwrapResult(resultAction2)
                            listProd.push(originalPromiseResult2)
                        }
                    }
                    await setListCart(listCart)
                    await setListProd(listProd)
                    await CountTotal(listCart, listProd)
                } catch (rejectedValueOrSerializedError) {
                    alert(rejectedValueOrSerializedError)
                }
            } else {
                let temp = _guestCart
                let listCart = []
                let listProd = []
                for (let i = 0; i < temp.length; i++) {
                    if (temp.productid != 'undefined') {
                        listCart.push(temp[i])
                        const resultAction2 = await dispatch(getProductWithID(temp[i].productid))
                        const originalPromiseResult2 = unwrapResult(resultAction2)
                        listProd.push(originalPromiseResult2)
                    }
                }
                await setListCart(listCart)
                await setListProd(listProd)
                await CountTotal(listCart, listProd)
            }
        }
        fetchYourCart()
    }, [])

    const [subTotal, setSubTotal] = useState(0)

    const CountTotal = async (_cart, prList) => {
        let newTotal = 0
        await _cart.map((item) => {
            let rs = prList.find((ite) => ite.productID == item.productid)
            if (rs != undefined)
                newTotal = newTotal + Number(Number(rs.price) * Number(item.amount))
        })
        setSubTotal(newTotal)
    }

    //for snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    //for snackbar 2
    const [openSnackbar2, setOpenSnackbar2] = useState(false);
    const handleCloseSnackbar2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar2(false);
    };

    //for customer is member
    const _currentUser = useSelector(currentUser)
    const [name, setName] = useState(_currentUser.name)
    const [phoneNumber, setPhoneNumber] = useState(_currentUser.phoneNumber)

    //for guest
    const [guestName, setGuestName] = useState('')
    const [guestPhoneNum, setGuestPhoneNum] = useState('')
    const [email, setEmail] = useState('')

    //general information
    const [addressShip, setAddressShip] = useState('')

    const [province, setProvince] = useState({})
    const [provinceList, setProvinceList] = useState([])

    const [district, setDistrict] = useState({})
    const [districtList, setDistrictList] = useState([])

    const [commune, setCommune] = useState({})
    const [communeList, setCommuneList] = useState([])

    //get province
    useEffect(() => {
        const getProvinceList = async () => {
            const resProvince = await fetch('https://sheltered-anchorage-60344.herokuapp.com/province')
            const resProv = resProvince.json()
            setProvinceList(await resProv)
        }
        getProvinceList()
    }, [])

    function handleChangeProvince(event) {
        let temp = addressShip + ', ' + event.target.value.name
        setAddressShip(temp)
        setProvince(event.target.value)
    }


    //get district
    useEffect(() => {
        const getDistrict = async () => {
            const resDistrict = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${province.idProvince}`)
            const resDis = resDistrict.json()
            setDistrictList(await resDis)
        }
        getDistrict()
    }, [province])

    function handleChangeDistrict(event) {
        let temp = addressShip + ', ' + event.target.value.name
        setAddressShip(temp)
        setDistrict(event.target.value)
    }

    //get commune
    useEffect(() => {
        const getCommune = async () => {
            const reCommune = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${district.idDistrict}`)
            const resCom = reCommune.json()
            setCommuneList(await resCom)
        }
        getCommune()
    }, [district])

    function handleChangeCommune(event) {
        let temp = addressShip + ', ' + event.target.value.name
        setAddressShip(temp)
        setCommune(event.target.value)
        console.log(temp)
    }

    function handleClickToCart(event) {
        event.preventDefault();
        if (localStorage.getItem('role') === 'customer') {
            navigate('/myplace/mycart')
        } else {
            navigate('/guestCart')
        }
    }

    const handleLogOut = () => {
        dispatch(accountSlice.actions.logout());
        localStorage.setItem('role', '')
        localStorage.setItem('idUser', '')
        localStorage.setItem('cart', JSON.stringify([]));
        navigate(0)
    }

    const handleChangeAddress = (e) => {
        if (province.name != null || district.name != null || commune.name != null) {
            let temp = e.target.value + province.name + district.name + commune.name
            setAddressShip(temp)
        } else {
            setAddressShip(e.target.value)
        }
    }

    const handleToPayment = () => {
        if (name === '' || phoneNumber === '' || addressShip === '') {
            setOpenSnackbar(true)
        } else {
            if (province != null && district != null && commune != null) {
                setOpenSnackbar(true)
            } else {
                alert("Move to payment method")
            }
        }
    }

    const handlePaymentGuest = () => {
        if (guestName === '' || guestPhoneNum === '' || addressShip === '' || email === '') {
            setOpenSnackbar(true)
        } else {
            if (province != null && district != null && commune != null) {
                setOpenSnackbar(true)
            } else {
                if (CheckEmail(email) && CheckPhoneNumber(guestPhoneNum)) {
                    alert("Move to payment method")
                } else {
                    setOpenSnackbar2(true)
                }
            }
        }
    }

    const breadcrumbs = [
        <Link
            underline="hover"
            key="2"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#338dbc',
                lineHeight: '1.3em',
                cursor: 'pointer'
            }}
            onClick={handleClickToCart}
        >
            Cart
        </Link>,
        <Typography
            key="2"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#000D0A',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif'
            }}
        >
            Cart Information
        </Typography>,
        <Typography key="3"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#999999',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif'
            }}>
            Payment method
        </Typography>,
    ];

    return (
        <Grid container
            sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'white',
                resize: 'none',
            }}
            spacing={2}
        >
            {/* Cart information part */}

            {localStorage.getItem('role') === 'customer' ? (
                <Grid item xs={7} height="100%" >
                    <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                        <Stack direction="column"
                            sx={{
                                paddingBottom: '1em',
                                display: 'block'
                            }}>
                            <Button
                                sx={{
                                    marginLeft: '-1.2%',
                                    color: '#333333',
                                    fontSize: '2em',
                                    fontWeight: 'normal',
                                    lineHeight: '1em',
                                    display: 'block',
                                    marginBlockStart: '0.67em',
                                    marginBlockEnd: '0.67em',
                                    background: 'white !important',
                                    fontFamily: 'sans-serif'
                                }}
                                onClick={() => navigate('/')}
                            >
                                ComeBuy
                            </Button>
                            <Stack direction="row"
                                sx={{
                                    marginTop: '-2%',
                                    listStyleType: 'none',
                                    display: 'block',
                                    marginBlockEnd: '1em',
                                }}
                            >
                                <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </Stack>
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
                                        fontFamily: 'sans-serif'
                                    }}
                                >
                                    Cart Information
                                </Typography>
                            </Stack>
                            <Stack direction="row" sx={{ width: '100%', position: 'relative' }} >
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
                                            marginLeft: '1.2em'
                                        }}
                                    >{_currentUser.name} ({_currentUser.email})</p>
                                    <a
                                        onClick={handleLogOut}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#338dbc',
                                            transition: 'color 0.2s ease-in-out',
                                            display: 'inline-block',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontFamily: 'sans-serif',
                                            lineHeight: '1.5em',
                                            marginLeft: '1.2em'
                                        }}
                                    >
                                        Log out
                                    </a>
                                </Stack>
                            </Stack>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={_currentUser.name != '' ? null : 'Full name'}
                                variant="outlined"
                                sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    marginTop: '1em'
                                }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={_currentUser.phoneNumber != '' ? null : 'Phone number'}
                                variant="outlined"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    marginTop: '1.2rem'
                                }} />
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Your address"
                                variant="outlined"
                                onChange={handleChangeAddress}
                                sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    marginTop: '1.3rem'
                                }}
                            />
                            <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '1em' }}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">City/Province</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={province}
                                            label="Province/City"
                                            onChange={handleChangeProvince}
                                        >
                                            {provinceList.map((province) => (
                                                <MenuItem value={province}>{province.name}</MenuItem>
                                            )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">District</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={district}
                                            label="District"
                                            onChange={handleChangeDistrict}
                                        >
                                            {districtList.map((district) => (
                                                <MenuItem value={district}>{district.name}</MenuItem>
                                            )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Commune</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={commune}
                                            label="Commune"
                                            onChange={handleChangeCommune}
                                        >
                                            {communeList.map((commune) => (
                                                <MenuItem value={commune}>{commune.name}</MenuItem>
                                            )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
                                    <Grid item xs={6}>
                                        <a onClick={() => navigate('/myplace/mycart')}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#338dbc',
                                                transition: 'color 0.2s ease-in-out',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontFamily: 'sans-serif',
                                                lineHeight: '1.5em',
                                                marginLeft: '1.2em'
                                            }}
                                        >
                                            My Cart
                                        </a>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={handleToPayment} variant="contained" sx={{ fontSize: '14px' }} size="large">
                                            Continue to payment method
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Stack>
                    </Stack>
                </Grid>
            ) : (
                // Guest
                <Grid item xs={7} height="100%" >
                    <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                        <Stack direction="column"
                            sx={{
                                paddingBottom: '1em',
                                display: 'block'
                            }}>
                            <Button
                                onClick={() => alert("Move to home page")}
                                sx={{
                                    marginLeft: '-1.2%',
                                    color: '#333333',
                                    fontSize: '2em',
                                    fontWeight: 'normal',
                                    lineHeight: '1em',
                                    display: 'block',
                                    marginBlockStart: '0.67em',
                                    marginBlockEnd: '0.67em',
                                    background: 'white !important',
                                    fontFamily: 'sans-serif'
                                }}

                            >ComeBuy
                            </Button>
                            <Stack direction="row"
                                sx={{
                                    marginTop: '-2%',
                                    listStyleType: 'none',
                                    display: 'block',
                                    marginBlockEnd: '1em',
                                }}
                            >
                                <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </Stack>
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
                                        fontFamily: 'sans-serif'
                                    }}
                                >
                                    Cart Information
                                </Typography>
                            </Stack>
                            <p
                                style={{
                                    marginBlockStart: '1em',
                                    marginBlockEnd: '1em',
                                    display: 'block',
                                    marginBottom: '0.75em',
                                    lineHeight: '1.5em',
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    marginTop: '0.1%'
                                }}
                            >
                                Did you have an account ?
                                <a onClick={() => navigate('/login')}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#338dbc',
                                        transition: 'color 0.2s ease-in-out',
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontFamily: 'sans-serif',
                                        lineHeight: '1.5em',
                                        marginLeft: '0.5%'
                                    }}
                                >
                                    Sign in
                                </a>
                            </p>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Full name"
                                variant="outlined"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    marginTop: '1em'
                                }}
                            />
                            <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '0.25rem' }}>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        onChange={(e) => setGuestPhoneNum(e.target.value)}
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
                                label="Your address"
                                variant="outlined"
                                onChange={handleChangeAddress}
                                sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    marginTop: '1.3rem'
                                }}
                            />
                            <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '1em' }}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">City/Province</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={province}
                                            label="Province/City"
                                            onChange={handleChangeProvince}
                                        >
                                            {provinceList.map((province) => (
                                                <MenuItem value={province}>{province.name}</MenuItem>
                                            )
                                            )}
                                        </Select>
                                    </FormControl>

                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">District</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={district}
                                            label="District"
                                            onChange={handleChangeDistrict}
                                        >
                                            {districtList.map((district) => (
                                                <MenuItem value={district}>{district.name}</MenuItem>
                                            )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Commune</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={commune}
                                            label="Commune"
                                            onChange={handleChangeCommune}
                                        >
                                            {communeList.map((commune) => (
                                                <MenuItem value={commune}>{commune.name}</MenuItem>
                                            )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
                                    <Grid item xs={6}>
                                        <a onClick={() => navigate('/guestCart')}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#338dbc',
                                                transition: 'color 0.2s ease-in-out',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontFamily: 'sans-serif',
                                                lineHeight: '1.5em',
                                                marginLeft: '1.2em'
                                            }}
                                        >
                                            My Cart
                                        </a>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Button onClick={handlePaymentGuest} variant="contained" sx={{ fontSize: '14px' }} size="large">
                                            Continue to payment method
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Stack>
                    </Stack>
                </Grid>
            )}

            {/* Cart visualization part */}
            <Grid sx={{
                backgroundColor: '#fafafa',
                left: 0,
                backgroundPosition: 'left top',
                boxShadow: '1px 0 0 #e1e1e1 inset'
            }} height="auto" item xs={5}>
                {localStorage.getItem('role') === 'customer' ? (
                    <Stack direction="column" spacing={2} p="2rem" paddingRight="6em">
                        {listCart.map((cart) => (
                            <Stack
                                sx={{
                                    backgroundColor: '#F2F2F2',
                                    borderRadius: '8px',
                                    padding: '1em',
                                    boxShadow: '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)'
                                }}
                                direction="row"
                                width="100%">
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <img style={{
                                            width: '7em',
                                            height: '7em',
                                            borderRadius: '8px',
                                            background: '#fff',
                                            position: 'relative'
                                        }}
                                            alt={prod.name}
                                            src={prod.productimage[0].imageURL}
                                        />
                                    ) : (
                                        null
                                    )
                                )}
                                <Stack direction="column">
                                    <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>{cart.product.name}</Typography>
                                    <Typography sx={{ marginLeft: '1em', marginTop: '0.75em' }}> Quantity: {cart.amount}</Typography>
                                </Stack>
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ alignSelf: 'flex-end', fontWeight: 600 }}> ${Number(prod.price) * Number(cart.amount)}</Typography>
                                    ) : (null)
                                )}
                            </Stack>
                        ))}
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Grid container width="100%" spacing={1}>
                            <Grid item xs={8.5}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Discount code"
                                    variant="outlined"
                                    // onChange={handleChangeAddress}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3.5} sx={{ height: '100%' }}>
                                <Button variant="contained" sx={{ fontSize: '14px', backgroundColor: 'gray', marginTop: '0.5em', width: '100%', height: '100%' }}>
                                    Use
                                </Button>
                            </Grid>
                        </Grid>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="column" width="100%">
                            <Typography sx={{
                                color: '#333333',
                                fontFamily: 'sans-serif', fontWeight: 300
                            }}
                            >RARE MEMBER
                            </Typography>
                            <Stack direction="row" width="100%">
                                <DiamondIcon sx={{ width: '17px', height: '17px' }} />
                                <Typography sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    fontSize: '13px',
                                    marginLeft: '0.5em'
                                }}>
                                    MEMBER - 0 point(s)
                                </Typography>
                            </Stack>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ marginTop: '1.2em', color: 'gray' }}>Temporary cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 600,
                                marginTop: '1.2em'
                            }}
                            >
                                ${subTotal}
                            </Typography>
                        </Stack>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '-0.5em'
                            }}
                            >
                                ---
                            </Typography>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>

                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Total cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 600,
                                marginTop: '1.2em',
                                fontSize: '20px'
                            }}
                            >
                                {subTotal} USD
                            </Typography>
                        </Stack>

                    </Stack>
                ) : (
                    <Stack direction="column" spacing={2} p="2rem" paddingRight="6em">
                        {listCart.map((cart) => (
                            <Stack
                                sx={{
                                    backgroundColor: '#F2F2F2',
                                    borderRadius: '8px',
                                    padding: '1em',
                                    boxShadow: '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)'
                                }}
                                direction="row"
                                width="100%">
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <img style={{
                                            width: '7em',
                                            height: '7em',
                                            borderRadius: '8px',
                                            background: '#fff',
                                            position: 'relative'
                                        }}
                                            alt={prod.name}
                                            src={prod.productimage[0].imageURL}
                                        />
                                    ) : (
                                        null
                                    )
                                )}
                                <Stack direction="column">
                                    {listProd.map((prod) =>
                                        prod.productID === cart.productid ? (
                                            <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>{prod.name}</Typography>
                                        ) : (
                                            null
                                        )
                                    )}
                                    <Typography sx={{ marginLeft: '1em', marginTop: '0.75em' }}> Quantity: {cart.amount}</Typography>
                                </Stack>
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ alignSelf: 'flex-end', fontWeight: 800 }}> ${Number(prod.price) * Number(cart.amount)}</Typography>
                                    ) : (null)
                                )}
                            </Stack>
                        ))}
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Grid container width="100%" spacing={1}>
                            <Grid item xs={8.5}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Discount code"
                                    variant="outlined"
                                    // onChange={handleChangeAddress}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3.5} sx={{ height: '100%' }}>
                                <Button variant="contained" sx={{ fontSize: '14px', backgroundColor: 'gray', marginTop: '0.5em', width: '100%', height: '100%' }}>
                                    Use
                                </Button>
                            </Grid>
                        </Grid>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="column" width="100%">
                            <Typography sx={{
                                color: '#333333',
                                fontFamily: 'sans-serif', fontWeight: 300
                            }}
                            >RARE MEMBER
                            </Typography>
                            <Stack direction="row" width="100%">
                                <DiamondIcon sx={{ width: '17px', height: '17px' }} />
                                <Typography sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    fontSize: '13px',
                                    marginLeft: '0.5em'
                                }}>
                                    MEMBER - 0 point(s)
                                </Typography>
                            </Stack>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ marginTop: '1.2em', color: 'gray' }}>Temporary cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '1.2em'
                            }}
                            >
                                ${subTotal}
                            </Typography>
                        </Stack>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '-0.5em'
                            }}
                            >
                                ---
                            </Typography>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>

                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Total cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '1.2em',
                                fontSize: '20px'
                            }}
                            >
                                {subTotal} USD
                            </Typography>
                        </Stack>
                    </Stack>
                )}
            </Grid>

            {/* snackbar */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {
                        _currentUser != null ?
                            ((name === '' || phoneNumber === '' || addressShip === '') ? "Please fill in completely" : "Please set your location")
                            :
                            ((guestName === '' || guestPhoneNum === '' || addressShip === '') ? "Please fill in completely" : "Please set your location")
                    }
                </Alert>
            </Snackbar>

            <Snackbar open={openSnackbar2} autoHideDuration={6000} onClose={handleCloseSnackbar2}>
                <Alert onClose={handleCloseSnackbar2} severity="warnings" sx={{ width: '100%' }}>
                    "Check your phone number and email whether it's in true type"
                </Alert>
            </Snackbar>
        </Grid >
    )
}
