/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Stack, Grid, TextField, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { currentUser } from '../../redux/selectors';

export default function CartInCheckOut(props) {
    const _currentUser = useSelector(currentUser);
    const [typeCus, setTypeCus] = useState('Rare member');

    return (
        <Grid
            sx={{
                backgroundColor: '#fafafa',
                left: 0,
                backgroundPosition: 'left top',
                boxShadow: '1px 0 0 #e1e1e1 inset',
            }}
            height="100%"
            item
            xs={5}
        >
            <Stack
                direction="column"
                spacing={2}
                p="2rem"
                sx={{ height: '220px', overflowY: 'scroll', overflowX: 'hidden' }}
                paddingRight="6em"
            >
                {props.listCart.map((cart) => (
                    <Stack
                        sx={{
                            backgroundColor: '#F2F2F2',
                            borderRadius: '8px',
                            padding: '1em',
                            ':hover': {
                                backgroundColor: 'bisque',
                            },
                            width: '100%',
                        }}
                        direction="row"
                    >
                        {props.listProd.map((prod) =>
                            prod.productID === cart.productid ? (
                                <img
                                    style={{
                                        width: '5em',
                                        height: '5em',
                                        borderRadius: '8px',
                                        background: '#fff',
                                        position: 'relative',
                                    }}
                                    alt={prod.name}
                                    src={prod.productimage[0].imageURL}
                                />
                            ) : null,
                        )}
                        <Stack sx={{ width: '100%', paddingRight: '2em' }} direction="column">
                            <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>{cart.product.name}</Typography>
                            <Stack
                                direction="row"
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginLeft: '1em',
                                    marginTop: '1em',
                                }}
                            >
                                {props.listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ fontWeight: 600 }}>
                                            ${prod.price} x {cart.amount}
                                        </Typography>
                                    ) : null,
                                )}
                                {props.listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {' '}
                                            ${Number(prod.price) * Number(cart.amount)}
                                        </Typography>
                                    ) : null,
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <div
                style={{
                    height: '1px',
                    width: '90%',
                    backgroundColor: '#BFBFBF',
                }}
            />
            <Stack direction="column" spacing={2} p="2rem" paddingRight="6em">
                <Grid container width="100%" spacing={1}>
                    <Grid item xs={8.5}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Discount code"
                            variant="outlined"
                            sx={{
                                color: '#333333',
                                fontFamily: 'sans-serif',
                            }}
                        />
                    </Grid>
                    <Grid item xs={3.5} sx={{ height: '100%' }}>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: '14px',
                                backgroundColor: 'gray',
                                marginTop: '0.5em',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            Use
                        </Button>
                    </Grid>
                </Grid>
                <div
                    style={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: '#BFBFBF',
                    }}
                />
                <Stack direction="column" width="100%">
                    <Typography
                        sx={{
                            color: '#333333',
                            fontFamily: 'sans-serif',
                            fontWeight: 300,
                        }}
                    >
                        MEMBERSHIP
                    </Typography>
                    <Stack direction="row" width="100%" justifyContent="space-between">
                        <>
                            {/* <DiamondIcon sx={{ width: '17px', height: '17px' }} /> */}
                            <Typography
                                sx={{
                                    color: '#333333',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {typeCus} -{_currentUser.score} point(s)
                            </Typography>
                        </>
                        <Typography
                            sx={{
                                color: '#333333',
                                fontWeight: 600,
                                marginTop: '1.2em',
                            }}
                        >
                            -{props.discount}%
                        </Typography>
                    </Stack>
                </Stack>
                <div
                    style={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: '#BFBFBF',
                    }}
                />
                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ marginTop: '1.2em', color: 'gray' }}>Temporary cost</Typography>
                    <Typography
                        sx={{
                            color: '#333333',
                            fontWeight: 600,
                            marginTop: '1.2em',
                        }}
                    >
                        ${props.subTotal - (props.subTotal * props.discount) / 100}
                    </Typography>
                </Stack>
                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                    <Typography
                        sx={{
                            color: '#333333',
                            fontWeight: 800,
                            marginTop: '-0.5em',
                        }}
                    >
                        $2.00
                    </Typography>
                </Stack>
                <div
                    style={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: '#BFBFBF',
                    }}
                />

                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Total cost</Typography>
                    <Typography
                        sx={{
                            color: '#333333',
                            fontWeight: 600,
                            marginTop: '1.2em',
                            fontSize: '20px',
                        }}
                    >
                        {props.subTotal - (props.subTotal * props.discount) / 100 + 2} USD
                    </Typography>
                </Stack>
            </Stack>
        </Grid>
    );
}
