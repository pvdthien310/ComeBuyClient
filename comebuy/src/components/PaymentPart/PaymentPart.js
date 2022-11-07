/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Button, Link, Stack, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import { Paypal } from '..';

export default function PaymentPart(prop) {
    const [openPayOnline, setOpenPayOnline] = useState(false);
    const [isHideCompleteButton, setIsHideCompleteButton] = useState('flex');
    const [selectedPayMethod, setSelectedPayMethod] = useState('Pay on delivery');
    const handleChangePayMethod = (event) => {
        if (event.target.value === 'Pay online') {
            setOpenPayOnline(true);
            setIsHideCompleteButton('none');
            setSelectedPayMethod(event.target.value);
        } else {
            setOpenPayOnline(false);
            setIsHideCompleteButton('flex');
            setSelectedPayMethod(event.target.value);
            prop.MakePurchaseUnit();
        }
    };

    return (
        <Grid item xs={7} height="100%">
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
                            Delivery method
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            height: '2.5em',
                            backgroundColor: '#fafafa',
                            width: '97%',
                            borderWidth: '1px',
                            borderRadius: '8px',
                            padding: '0.5em',
                            justifyContent: 'space-between',
                            marginTop: '0.25em',
                        }}
                    >
                        <Stack direction="row" sx={{ marginTop: '0.5em' }}>
                            <Radio checked value="1" name="radio-buttons" sx={{ marginTop: '-0.5em' }} />
                            <Typography>Delivery within 64 provinces</Typography>
                        </Stack>
                        <Stack sx={{ marginTop: '0.55em' }}>
                            <Typography>2.00 USD</Typography>
                        </Stack>
                    </Stack>
                    <Stack marginTop="2em">
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
                            Payment method
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            height: 'auto',
                            backgroundColor: '#fafafa',
                            width: '97%',
                            borderWidth: '1px',
                            borderRadius: '8px',
                            padding: '1.15em',
                            marginTop: '0.25em',
                        }}
                    >
                        <Radio
                            checked={selectedPayMethod === 'Pay on delivery'}
                            onChange={handleChangePayMethod}
                            value="Pay on delivery"
                            name="radio-buttons"
                            size="medium"
                        />
                        <img
                            style={{
                                marginRight: '10px',
                                display: 'flex',
                                alignSelf: 'center',
                                width: '50px',
                                height: '50px',
                            }}
                            alt=""
                            src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                        />
                        <Typography sx={{ marginTop: '0.5em' }}>Pay on delivery</Typography>
                    </Stack>

                    <Stack
                        direction="column"
                        sx={{
                            height: 'auto',
                            backgroundColor: '#fafafa',
                            width: '97%',
                            borderWidth: '1px',
                            borderRadius: '8px',
                            padding: '1.15em',
                            marginTop: '0.25em',
                        }}
                    >
                        <Stack direction="row">
                            <Radio
                                checked={selectedPayMethod === 'Pay online'}
                                onChange={handleChangePayMethod}
                                value="Pay online"
                                name="radio-buttons"
                                size="medium"
                            />
                            <img
                                style={{
                                    marginRight: '10px',
                                    display: 'flex',
                                    alignSelf: 'center',
                                    width: '50px',
                                    height: '50px',
                                }}
                                alt=""
                                src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=1"
                            />
                            <Typography sx={{ marginTop: '0.5em' }}>Pay online</Typography>
                        </Stack>
                        {openPayOnline ? (
                            <>
                                <hr
                                    style={{
                                        height: '1px',
                                        width: '100%',
                                        backgroundColor: 'black',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        whiteSpace: 'pre-line',
                                        paddingLeft: '2em',
                                        paddingRight: '2em',
                                        color: '#737373',
                                        fontSize: '14px',
                                    }}
                                >
                                    VIETCOMBANK - VONG MINH HUYNH - Bank Account Number: 1234567896 - PGD TP HCM -
                                    Transfer content : Your name-Phone number-Product ID
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        whiteSpace: 'pre-line',
                                        paddingLeft: '2em',
                                        paddingRight: '2em',
                                        color: '#737373',
                                        fontSize: '14px',
                                    }}
                                >
                                    TECHCOMBANK - PHAM VO DI THIEN - Bank Account Number : 1852654970 - PGD TP HCM -
                                    Transfer content : Your name-Phone number-Product ID
                                </Typography>

                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        whiteSpace: 'pre-line',
                                        paddingLeft: '2em',
                                        paddingRight: '2em',
                                        color: '#737373',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        marginTop: '1.2em',
                                    }}
                                >
                                    OR:
                                </Typography>
                                <div
                                    style={{
                                        width: '50%',
                                        marginTop: '1.2em',
                                        alignSelf: 'center',
                                    }}
                                >
                                    <Paypal
                                        _discount={prop.discount}
                                        _lastTotal={prop.subTotal}
                                        _bigAddress={prop.orderInfo.address}
                                        _guestEmail={prop.orderInfo.email}
                                        _guestName={prop.orderInfo.fullName}
                                        _guestPhoneNumber={prop.orderInfo.phoneNumber}
                                        cartList={prop.listCart}
                                        prodList={prop.listProd}
                                        purchases={prop.purchaseUnits}
                                    />
                                </div>
                            </>
                        ) : null}
                    </Stack>

                    <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
                        <Grid item xs={6}>
                            <Link
                                onClick={() => prop.setIsPaymentPart(false)}
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
                                Back to cart information
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'black',
                                    fontSize: '13px',
                                    display: `${isHideCompleteButton}`,
                                }}
                                size="large"
                            >
                                Complete order
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
        </Grid>
    );
}
