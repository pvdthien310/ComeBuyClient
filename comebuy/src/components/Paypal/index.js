/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { unwrapResult } from '@reduxjs/toolkit';
import { Dialog, Button, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/selectors';
import { addInvoice } from '../../redux/slices/invoiceSlice';
import { addInvoiceItem } from '../../redux/slices/invoiceItemSlice';
import emailApi from '../../api/emailAPI';

import { deleteCartById } from '../../redux/slices/cartSlice';

export default function Paypal({
    _discount,
    _lastTotal,
    cartList,
    purchases,
    prodList,
    _bigAddress,
    _guestEmail,
    _guestName,
    _guestPhoneNumber,
}) {
    const _currentUser = useSelector(currentUser);
    const dispatch = useDispatch();
    const paypal = useRef();
    const navigate = useNavigate();
    const [startAddInvoiceItem, setStartAddInvoiceItem] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [paidSuccessfully, setPaidSuccessfully] = useState(false);

    const handleCloseDialog = async () => {
        // setPaidSuccessfully(false)
        // setStartAddInvoiceItem(true)
        if (localStorage.getItem('role') === 'customer') {
            for (let i = 0; i < cartList.length; i++) {
                try {
                    await dispatch(deleteCartById(cartList[i]));
                } catch (rejectedValueOrSerializedError) {
                    alert(rejectedValueOrSerializedError);
                }
            }
            setPaidSuccessfully(false);
            navigate('/');
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
            setPaidSuccessfully(false);
            navigate('/');
        }
    };

    const [orderData, setOrderData] = useState({
        date: ' ',
        moneyReceived: '0',
        isChecked: false,
        isPaid: false,
        address: _bigAddress,
        userID: _currentUser.userID,
        branchID: 'a4a66b5e-182b-4b7d-bd13-8e6a54b686a6',
    });

    // const [orderDataItem, setOrderDataItem] = useState({
    //     invoiceid: '',
    //     productid: '',
    //     amount: 0,
    //     total: 0,
    // });

    // const [listOrderDataItem, setListOrderDataItem] = useState([])

    const [listItem, setListItem] = useState([]);

    const _addInvoiceItem = async (_invoiceId) => {
        const t = [];
        let stringOrder = '';
        for (let i = 0; i < cartList.length; i++) {
            for (let j = 0; j < prodList.length; j++) {
                if (cartList[i].productid === prodList[j].productID) {
                    const item = {
                        invoiceID: _invoiceId,
                        productID: prodList[j].productID,
                        amount: cartList[i].amount,
                        total: Number(cartList[i].amount) * Number(prodList[j].price),
                    };
                    t.push(item);
                    stringOrder =
                        `${stringOrder}\n` +
                        `${prodList[j].name} - Quantity: ${cartList[i].amount} - Sub-cost: $${item.total} `;
                }
            }
        }
        if (localStorage.getItem('role') === 'customer') {
            emailApi
                .sendOrder({
                    to: _currentUser.email,
                    subject: 'Your order information in ComeBuy',
                    text:
                        'Thank for placing order in ComeBuy site. \n' +
                        'Your order: \n' +
                        `Name: ${_currentUser.name} \n` +
                        `Phone: ${_currentUser.phoneNumber} \n` +
                        `COD Address: ${_bigAddress}` +
                        '\n' +
                        `-------------------------------------------------------- \n${stringOrder}\n` +
                        '-------------------------------------------------------- \n' +
                        `Subtotal: ${_lastTotal} USD` +
                        '\n' +
                        '-------------------------------------------------------- \n' +
                        `Discount: ${_discount} %` +
                        '\n' +
                        '-------------------------------------------------------- \n' +
                        'Shipping-fee: 2 USD' +
                        '\n' +
                        '-------------------------------------------------------- \n' +
                        `Total: ${_lastTotal + 2 - (_lastTotal * _discount) / 100} USD` +
                        '\n' +
                        '-------------------------------------------------------- \n' +
                        'Any wondered things. Please contact with our shop with contact below site: ComeBuy.com',
                })
                .then(() => {
                    setListItem(t);
                    setStartAddInvoiceItem(true);
                })
                .catch((err) => console.log(err));
        } else {
            emailApi
                .sendOrder({
                    to: _guestEmail,
                    subject: 'Your order information',
                    text:
                        'Thank for placing order in ComeBuy site. \n' +
                        'Your order: \n' +
                        `Name: ${_guestName} \n` +
                        `Phone: ${_guestPhoneNumber} \n` +
                        `COD Address: ${_bigAddress}` +
                        '\n' +
                        `-------------------------------------------------------- \n${stringOrder}\n` +
                        '-------------------------------------------------------- \n' +
                        'Shipping-fee: 2 USD' +
                        '\n' +
                        '-------------------------------------------------------- \n' +
                        `Subtotal: ${_lastTotal} USD` +
                        '\n' +
                        '-------------------------------------------------------- \n' +
                        `Total: ${_lastTotal + 2} USD` +
                        '\n' +
                        '-------------------------------------------------------- \n' +
                        'Any wondered things. Please contact with our shop with contact below site: ComeBuy.com',
                })
                .then(() => {
                    setListItem(t);
                    setStartAddInvoiceItem(true);
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        if (isCompleted === true) {
            setPaidSuccessfully(true);
        }
    }, [isCompleted]);

    useEffect(() => {
        const addItem = async () => {
            for (let i = 0; i < listItem.length; i++) {
                try {
                    await dispatch(addInvoiceItem(listItem[i]));
                } catch (rejectedValueOrSerializedError) {
                    console.log(rejectedValueOrSerializedError);
                }
            }
            setStartAddInvoiceItem(false);
            setIsCompleted(true);
        };
        if (startAddInvoiceItem === true) {
            addItem();
        }
    }, [startAddInvoiceItem]);

    const [startAddInvoice, setStartAddInvoice] = useState(false);

    const MakeInvoice = async () => {
        if (localStorage.getItem('role') === 'customer') {
            const m = moment().format('H mm');
            const date = moment().format('D/M/YYYY');
            const temp = {
                ...orderData,
                moneyReceived: _lastTotal,
                isChecked: false,
                isPaid: false,
                date: `${date} ${m}`,
                userID: _currentUser.userID,
                address: _bigAddress,
                branchID: 'a4a66b5e-182b-4b7d-bd13-8e6a54b686a6',
            };
            setOrderData(temp);
            setStartAddInvoice(true);
        } else {
            const m = moment().format('H mm');
            const date = moment().format('D/M/YYYY');
            const temp = {
                ...orderData,
                moneyReceived: _lastTotal.toString(),
                isChecked: false,
                isPaid: false,
                date: `${date} ${m}`,
                address: _bigAddress,
                userID: 'c464ea83-fcf5-44a4-8d90-f41b78b78db8',
                branchID: 'a4a66b5e-182b-4b7d-bd13-8e6a54b686a6',
            };
            setOrderData(temp);
            setStartAddInvoice(true);
        }
    };

    const [invoiceId, setInvoiceId] = useState(' ');

    useEffect(async () => {
        if (invoiceId !== ' ') {
            _addInvoiceItem(invoiceId);
        }
    }, [invoiceId]);

    useEffect(async () => {
        if (startAddInvoice === true) {
            try {
                const resultAction = await dispatch(addInvoice(orderData));
                const originalPromiseResult = unwrapResult(resultAction);
                setInvoiceId(originalPromiseResult.data.invoiceID);
            } catch (rejectedValueOrSerializedError) {
                alert(rejectedValueOrSerializedError);
                setStartAddInvoice(false);
            }
        }
    }, [startAddInvoice]);

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
                                        value: _lastTotal + 2 - (_lastTotal * _discount) / 100,
                                        breakdown: {
                                            item_total: {
                                                currency_code: 'USD',
                                                value: _lastTotal,
                                            },
                                            discount: {
                                                currency_code: 'USD',
                                                value: (_lastTotal * _discount) / 100,
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
                        await MakeInvoice();
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
                        await MakeInvoice();
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
            {/* {console.log(cartList)}
            {console.log(prodList)} */}
            {/* {console.log(purchases)}
            {console.log(_discount)}
            {console.log(_lastTotal)} */}

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
