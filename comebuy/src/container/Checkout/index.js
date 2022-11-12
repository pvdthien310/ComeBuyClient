/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Grid from '@mui/material/Grid';

import OrderInfoPart from '../../components/OrderInfoPart/OrderInfoPart';
import PaymentPart from '../../components/PaymentPart/PaymentPart';
import { getAllCart } from '../../redux/slices/cartSlice';
import { getProductWithID } from '../../redux/slices/productSlice';
import { cartListSelector, currentUser } from '../../redux/selectors';
import CartInCheckOut from '../../components/CartInCheckOut';

import style from './style';

export default function CheckoutPage() {
    const dispatch = useDispatch();
    const _guestCart = useSelector(cartListSelector);
    const _currentUser = useSelector(currentUser);
    const [orderInfo, setOrderInfo] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
    });
    const [isPaymentPart, setIsPaymentPart] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [purchaseUnits, setPurchaseUnits] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [listCart, setListCart] = useState([]);
    const [listProd, setListProd] = useState([]);

    const CountSubTotal = async (_cart, prList) => {
        let newTotal = 0;
        await _cart.map((item) => {
            const rs = prList.find((ite) => ite.productID === item.productid);
            if (rs !== undefined) newTotal += Number(Number(rs.price) * Number(item.amount));
        });
        setSubTotal(newTotal);
    };

    const CountTotal = async (_cart, prList) => {
        let newTotal = 0;
        await _cart.map((item) => {
            const rs = prList.find((ite) => ite.productID === item.productid);
            if (rs !== undefined) newTotal += Number(Number(rs.price) * Number(item.amount));
        });
        setSubTotal(newTotal);
    };

    const MakePurchaseUnit = async (listCart, listProd) => {
        if (localStorage.getItem('role') === 'customer') {
            const sample = [];
            let unitAmountObj = {
                currency_code: 'USD',
                value: ' ',
            };

            for (let i = 0; i < listCart.length; i++) {
                for (let j = 0; j < listProd.length; j++) {
                    if (listProd[j].productID === listCart[i].productid) {
                        unitAmountObj = {
                            ...unitAmountObj,
                            value: Number(listProd[j].price),
                        };
                        const temp = {
                            name: listProd[j].name,
                            unit_amount: unitAmountObj,
                            quantity: listCart[i].amount,
                        };
                        sample.push(temp);
                    }
                }
            }
            setPurchaseUnits(...purchaseUnits, sample);
        } else {
            const sample = [];
            let unitAmountObj = {
                currency_code: 'USD',
                value: ' ',
            };
            for (let i = 0; i < listCart.length; i++) {
                for (let j = 0; j < listProd.length; j++) {
                    if (listProd[j].productID === listCart[i].productid) {
                        unitAmountObj = {
                            ...unitAmountObj,
                            value: Number(listProd[j].price),
                        };
                        const temp = {
                            name: listProd[j].name,
                            unit_amount: unitAmountObj,
                            quantity: listCart[i].amount,
                        };
                        sample.push(temp);
                    }
                }
            }
            setPurchaseUnits(...purchaseUnits, sample);
        }
    };

    useEffect(() => {
        if (isPaymentPart === false) {
            setOrderInfo({
                ...orderInfo,
                phoneNumber: '',
                email: '',
                address: '',
            });
        }
    }, [isPaymentPart]);

    useEffect(() => {
        const fetchYourCart = async () => {
            if (localStorage.getItem('role') === 'customer') {
                let temp = [];
                const listCart = [];
                const listProd = [];
                try {
                    const resultAction = await dispatch(getAllCart());
                    const originalPromiseResult = unwrapResult(resultAction);
                    temp = originalPromiseResult;
                    for (let i = 0; i < temp.length; i++) {
                        if (temp[i].userid === _currentUser.userID) {
                            listCart.push(temp[i]);
                            const resultAction2 = await dispatch(getProductWithID(temp[i].productid));
                            const originalPromiseResult2 = unwrapResult(resultAction2);
                            listProd.push(originalPromiseResult2);
                        }
                    }
                    await setListCart(listCart);
                    await setListProd(listProd);
                    await CountTotal(listCart, listProd);
                    await MakePurchaseUnit(listCart, listProd);
                } catch (rejectedValueOrSerializedError) {
                    alert(rejectedValueOrSerializedError);
                }
            } else {
                const temp = _guestCart;
                const listCart = [];
                const listProd = [];
                for (let i = 0; i < temp.length; i++) {
                    if (temp.productid !== 'undefined') {
                        listCart.push(temp[i]);
                        const resultAction2 = await dispatch(getProductWithID(temp[i].productid));
                        const originalPromiseResult2 = unwrapResult(resultAction2);
                        listProd.push(originalPromiseResult2);
                    }
                }
                await setListCart(listCart);
                await setListProd(listProd);
                await CountSubTotal(listCart, listProd);
                await MakePurchaseUnit(listCart, listProd);
            }
        };
        fetchYourCart();
    }, []);

    return (
        <Grid container sx={style.wrapper} spacing={2}>
            {!isPaymentPart ? (
                <OrderInfoPart setIsPaymentPart={setIsPaymentPart} orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
            ) : (
                <PaymentPart
                    orderInfo={orderInfo}
                    subTotal={subTotal}
                    purchaseUnits={purchaseUnits}
                    discount={discount}
                    listCart={listCart}
                    listProd={listProd}
                    MakePurchaseUnit={MakePurchaseUnit}
                    setIsPaymentPart={setIsPaymentPart}
                />
            )}
            <CartInCheckOut subTotal={subTotal} discount={discount} listCart={listCart} listProd={listProd} />
        </Grid>
    );
}
