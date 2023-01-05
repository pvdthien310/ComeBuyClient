/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Button, Link, Stack, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import { Paypal } from '..';
import style from './style';

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
                <Stack direction="column" sx={style.container}>
                    <Stack marginTop="-3%">
                        <Typography sx={style.titleTypo}>Delivery method</Typography>
                    </Stack>
                    <Stack direction="row" sx={style.subWrapper}>
                        <Stack direction="row" sx={{ marginTop: '0.5em' }}>
                            <Radio checked value="1" name="radio-buttons" sx={{ marginTop: '-0.5em' }} />
                            <Typography>Delivery within 64 provinces</Typography>
                        </Stack>
                        <Stack sx={{ marginTop: '0.55em' }}>
                            <Typography>2.00 USD</Typography>
                        </Stack>
                    </Stack>
                    <Stack marginTop="2em">
                        <Typography sx={style.titleTypo}>Payment method</Typography>
                    </Stack>
                    <Stack direction="row" sx={style.radioWrapper}>
                        <Radio
                            checked={selectedPayMethod === 'Pay on delivery'}
                            onChange={handleChangePayMethod}
                            value="Pay on delivery"
                            name="radio-buttons"
                            size="medium"
                        />
                        <img
                            style={style.img}
                            alt=""
                            src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                        />
                        <Typography sx={{ marginTop: '0.5em' }}>Pay on delivery</Typography>
                    </Stack>

                    <Stack direction="column" sx={style.radioWrapper}>
                        <Stack direction="row">
                            <Radio
                                checked={selectedPayMethod === 'Pay online'}
                                onChange={handleChangePayMethod}
                                value="Pay online"
                                name="radio-buttons"
                                size="medium"
                            />
                            <img
                                style={style.img}
                                alt=""
                                src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=1"
                            />
                            <Typography sx={{ marginTop: '0.5em' }}>Pay online</Typography>
                        </Stack>
                        {openPayOnline ? (
                            <>
                                <hr style={style.hr} />
                                <Typography sx={style.bankingText}>
                                    VIETCOMBANK - VONG MINH HUYNH - Bank Account Number: 1234567896 - PGD TP HCM -
                                    Transfer content : Your name-Phone number-Product ID
                                </Typography>
                                <Typography sx={style.bankingText}>
                                    TECHCOMBANK - PHAM VO DI THIEN - Bank Account Number : 1852654970 - PGD TP HCM -
                                    Transfer content : Your name-Phone number-Product ID
                                </Typography>

                                <Typography sx={style.orText}>OR:</Typography>
                                <div style={style.methodSpace}>
                                    <Paypal
                                        _discount={prop.discount}
                                        _discountCode={prop.discountCode}
                                        _lastTotal={prop.lastTotal}
                                        _subTotal={prop.subTotal}
                                        _bigAddress={prop.orderInfo.address}
                                        _guestEmail={prop.orderInfo.email}
                                        _guestName={prop.orderInfo.fullName}
                                        _guestPhoneNumber={prop.orderInfo.phoneNumber}
                                        cartList={prop.listCart}
                                        prodList={prop.listProd}
                                        purchases={prop.purchaseUnits}
                                        _couponId={prop.couponId}
                                    />
                                </div>
                            </>
                        ) : null}
                    </Stack>

                    <Grid spacing={2} container sx={style.footerWrapper}>
                        <Grid item xs={6}>
                            <Link onClick={() => prop.setIsPaymentPart(false)} underline="hover" sx={style.link} href>
                                Back to cart information
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                sx={{
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
