/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { unwrapResult } from '@reduxjs/toolkit';
import { Dialog, Button, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/selectors';
import { addInvoice, addInvoiceItem } from '../../redux/slices/invoiceSlice';
import emailApi from '../../api/emailAPI';

import { deleteCartById } from '../../redux/slices/cartSlice';
import couponAPI from '../../api/couponAPI';

export default function Paypal({
    _lastTotal,
    _discount,
    cartList,
    purchases,
    _subTotal,
    prodList,
    _bigAddress,
    _discountCode,
    _couponId,
    _guestEmail,
    _guestName,
    _guestPhoneNumber,
}) {
    const _currentUser = useSelector(currentUser);
    const paypal = useRef();
    const navigate = useNavigate();
    const [paidSuccessfully, setPaidSuccessfully] = useState(false);

    const handleCloseDialog = async () => {
        setPaidSuccessfully(false);
        navigate('/');
    };

    useEffect(() => {
        if (localStorage.getItem('role') === 'customer') {
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) =>
                        actions.order.create({
                            intent: 'CAPTURE',
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: 'USD',
                                        value: _lastTotal + 2,
                                        breakdown: {
                                            item_total: {
                                                currency_code: 'USD',
                                                value: _subTotal,
                                            },
                                            discount: {
                                                currency_code: 'USD',
                                                value: (_subTotal * _discount) / 100,
                                            },
                                            shipping: {
                                                currency_code: 'USD',
                                                value: 2,
                                            },
                                        },
                                    },
                                    items: purchases,
                                },
                            ],
                        }),
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        const params = {
                            code: _discountCode,
                            userId: _currentUser.userID,
                            address: _bigAddress,
                            lastPayout: _lastTotal + 2,
                        };
                        await couponAPI.settle(params).then((res) => {
                            if (res.data[0].isdone === true) {
                                setPaidSuccessfully(true);
                            }
                        });
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
                .render(paypal.current);
        } else {
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) =>
                        actions.order.create({
                            intent: 'CAPTURE',
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: 'USD',
                                        value: _lastTotal + 2,
                                        breakdown: {
                                            item_total: {
                                                currency_code: 'USD',
                                                value: _lastTotal,
                                            },
                                        },
                                    },
                                    items: purchases,
                                },
                            ],
                        }),
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
                .render(paypal.current);
        }
    }, []);

    return (
        <div>
            <div ref={paypal} />
            <Dialog open={paidSuccessfully}>
                <DialogTitle color="success">Paid successfully. Thanks for involving</DialogTitle>
                <Button
                    onClick={handleCloseDialog}
                    sx={{
                        alignSelf: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '15px',
                        border: '1px solid #18608a',
                        backgroundColor: 'green',
                        color: 'black',
                        fontSize: '13px',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        padding: '12px 45px',
                    }}
                >
                    OK
                </Button>
            </Dialog>
        </div>
    );
}
