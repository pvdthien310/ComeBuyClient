/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Stack, Grid, TextField, Button, Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import InfoIcon from '@mui/icons-material/Info';
import { DiamondOutlined } from '@mui/icons-material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { currentUser } from '../../redux/selectors';
import couponAPI from '../../api/couponAPI';
import SnackBarAlert from '../SnackBarAlert/index';

import style from './style';
import ScratchCouponModal from '../ScratchCoupon';

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

export default function CartInCheckOut(props) {
    const _currentUser = useSelector(currentUser);
    const [typeCus, setTypeCus] = useState('Rare member');
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [finalCost, setFinalCost] = useState(0);
    const [code, setCode] = useState('');
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });
    const [openScratch, setOpenScratch] = useState(false);
    const [couponInfo, setCouponInfo] = useState({
        discountType: '',
        minTotal: '',
        valueType: '',
        value: '',
        couponId: '',
    });
    const [hideDiscount, setHideDiscount] = useState(true);

    const Identify = () => {
        if (localStorage.getItem('role') === 'customer') {
            if (_currentUser.score < 2000) {
                setDiscount(0);
                setTypeCus('Rare Member');
            } else if (_currentUser.score >= 2000 && _currentUser.score < 5000) {
                setDiscount(10);
                setTypeCus('Silver Member');
            } else if (_currentUser.score >= 5000 && _currentUser.score < 20000) {
                setDiscount(20);
                setTypeCus('Golden Member');
            } else {
                setDiscount(30);
                setTypeCus('Diamond Member');
            }
        } else {
            setDiscount(0);
        }
    };

    const handleUseCoupon = async () => {
        if (code === '') {
            return;
        }
        setIsLoading(true);
        const params = {
            code,
            userId: _currentUser.userID,
        };
        await couponAPI
            .crawlCoupon(params)
            .then((data) => {
                setIsLoading(false);
                const res = data.data[0];
                if (res.isvalid === true) {
                    setCouponInfo({
                        ...couponInfo,
                        discountType: res.discounttype,
                        minTotal: res.mintotal,
                        valueType: res.valuetype,
                        value: res.valuediscount,
                        couponId: res.couponid,
                    });
                    setOpenScratch(true);
                } else {
                    setAlert({
                        ...alert,
                        open: true,
                        severity: 'error',
                        message: 'This code is invalid. Please try another coupon code',
                    });
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setAlert({
                    ...alert,
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong while crawling coupon',
                });
            });
    };

    const useCoupon = () => {
        if (couponInfo.valueType === 'cash') {
            const tempDis = couponInfo.value;
            const temp = props.subTotal + 2 - Number(couponInfo.value);
            setFinalCost(temp);
            const tempValue = (Number(couponInfo.value) / props.subTotal) * 100;
            props.getTotalAndDiscount(temp - 2, tempValue, code);
        } else {
            const tempDis = couponInfo.value;
            const temp = props.subTotal + 2 - (props.subTotal * Number(tempDis)) / 100;
            setFinalCost(temp);
            props.getTotalAndDiscount(temp - 2, tempDis, code);
        }
        setOpenScratch(false);
        setHideDiscount(false);
    };

    useEffect(() => {
        Identify();
    }, []);

    return (
        <Grid sx={style.wrapper} height="100%" item xs={5}>
            <Stack direction="column" spacing={2} p="2rem" sx={style.stackWrapper} paddingRight="6em">
                {props.listCart.map((cart) => (
                    <BootstrapTooltip title="If there is a promotion on product. We calculated">
                        <Stack sx={style.listWrapper} direction="row">
                            {props.listProd.map((prod) =>
                                prod.productID === cart.productid ? (
                                    <img style={style.img} alt={prod.name} src={prod.productimage[0].imageURL} />
                                ) : null,
                            )}
                            <Stack sx={style.infoWrapper} direction="column">
                                <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>
                                    {cart.product.name}
                                </Typography>
                                <Stack direction="row" sx={style.listProdWrapper}>
                                    {props.listProd.map((prod) =>
                                        prod.productID === cart.productid ? (
                                            <Typography sx={{ fontWeight: 600 }}>
                                                $
                                                {Number((prod.price * (100 - prod.promotion)) / 100) *
                                                    Number(cart.amount)}{' '}
                                                x {Number(cart.amount)}
                                            </Typography>
                                        ) : null,
                                    )}
                                    {props.listProd.map((prod) =>
                                        prod.productID === cart.productid ? (
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {' '}
                                                $
                                                {Number((prod.price * (100 - prod.promotion)) / 100) *
                                                    Number(cart.amount)}{' '}
                                                x {Number(cart.amount)}
                                            </Typography>
                                        ) : null,
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>
                    </BootstrapTooltip>
                ))}
            </Stack>
            <div style={style.line} />
            <Stack direction="column" spacing={2} p="2rem">
                <Grid container width="100%" spacing={1}>
                    <Grid item xs={8.5}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Discount code"
                            variant="outlined"
                            sx={style.textField}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3.5} sx={{ height: '100%' }}>
                        <Button onClick={handleUseCoupon} variant="contained" sx={style.btn}>
                            Crawl
                        </Button>
                    </Grid>
                </Grid>
                {isLoading && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )}

                <Stack direction="column" width="100%">
                    <Typography sx={style.memberShipText}>MEMBERSHIP</Typography>
                    <Stack direction="row" width="100%" justifyContent="space-between">
                        <Stack direction="row" spacing={2}>
                            <DiamondOutlined sx={{ width: '17px', height: '17px' }} />
                            <Typography sx={style.memberType}>
                                {typeCus} -{_currentUser.score} point(s)
                            </Typography>
                        </Stack>
                        <Tooltip title="Click to see rule of membership" placement="top-start">
                            <IconButton
                                color="primary"
                                sx={{ width: '15px', height: '15px' }}
                                aria-label="add to shopping cart"
                            >
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
                <div style={style.line} />
                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ marginTop: '1.2em', color: 'gray' }}>Temporary cost</Typography>
                    <Typography sx={style.subTotal}>${props.subTotal}</Typography>
                </Stack>
                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                    <Typography sx={style.twoDollar}>$2.00</Typography>
                </Stack>
                {!hideDiscount && (
                    <Stack direction="row" width="100%" justifyContent="space-between">
                        <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Discount using</Typography>
                        <Typography sx={{ ...style.twoDollar, color: 'green' }}>
                            {couponInfo.valueType === 'cash' ? `- $ ${couponInfo.value}` : `- ${couponInfo.value}%`}
                        </Typography>
                    </Stack>
                )}
                <div style={style.line} />

                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Final cost</Typography>
                    {hideDiscount ? (
                        <Typography sx={style.total}>{props.subTotal + 2} USD</Typography>
                    ) : (
                        <Typography sx={style.total}>{finalCost} USD</Typography>
                    )}
                </Stack>
            </Stack>
            <SnackBarAlert
                handleClose={() => setAlert({ ...alert, open: false })}
                open={alert.open}
                severity={alert.severity}
                message={alert.message}
            />
            <ScratchCouponModal
                useHandle={useCoupon}
                totalCost={props.subTotal}
                discount={couponInfo}
                openScratchCoupon={openScratch}
                closeScratchCoupon={() => setOpenScratch(false)}
            />
        </Grid>
    );
}
