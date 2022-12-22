/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Stack, Grid, TextField, Button, Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import InfoIcon from '@mui/icons-material/Info';
import { DiamondOutlined } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { currentUser } from '../../redux/selectors';

import style from './style';

export default function CartInCheckOut(props) {
    const _currentUser = useSelector(currentUser);
    const [typeCus, setTypeCus] = useState('Rare member');
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowCoupon, setIsShowCoupon] = useState(false);

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

    const handleUseCoupon = () => {
        setIsLoading(true);
    };

    useEffect(() => {
        Identify();
    }, []);

    return (
        <Grid sx={style.wrapper} height="100%" item xs={5}>
            <Stack direction="column" spacing={2} p="2rem" sx={style.stackWrapper} paddingRight="6em">
                {props.listCart.map((cart) => (
                    <Stack sx={style.listWrapper} direction="row">
                        {props.listProd.map((prod) =>
                            prod.productID === cart.productid ? (
                                <img style={style.img} alt={prod.name} src={prod.productimage[0].imageURL} />
                            ) : null,
                        )}
                        <Stack sx={style.infoWrapper} direction="column">
                            <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>{cart.product.name}</Typography>
                            <Stack direction="row" sx={style.listProdWrapper}>
                                {props.listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ fontWeight: 600 }}>
                                            ${Number((prod.price * (100 - prod.promotion)) / 100) * Number(cart.amount)}{' '}
                                            x {Number(cart.amount)}
                                        </Typography>
                                    ) : null,
                                )}
                                {props.listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {' '}
                                            ${Number((prod.price * (100 - prod.promotion)) / 100) *
                                                Number(cart.amount)}{' '}
                                            x {Number(cart.amount)}
                                        </Typography>
                                    ) : null,
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
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
                        />
                    </Grid>
                    <Grid item xs={3.5} sx={{ height: '100%' }}>
                        <Button onClick={handleUseCoupon} variant="contained" sx={style.btn}>
                            Use
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
                    <Typography sx={style.subTotal}>
                        ${props.subTotal - (props.subTotal * props.discount) / 100}
                    </Typography>
                </Stack>
                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                    <Typography sx={style.twoDollar}>$2.00</Typography>
                </Stack>
                <div style={style.line} />

                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Total cost</Typography>
                    <Typography sx={style.total}>
                        {props.subTotal - (props.subTotal * discount) / 100 + 2} USD
                    </Typography>
                </Stack>
            </Stack>
        </Grid>
    );
}
