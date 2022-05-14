import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/selectors";
import moment from 'moment'
import { addInvoice } from "../../redux/slices/invoiceSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addInvoiceItem } from "../../redux/slices/invoiceItemSlice";

import { Dialog, Button } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { deleteCartById } from "../../redux/slices/cartSlice";
import { useNavigate } from 'react-router-dom';

export default function Paypal({ cartList, purchases, prodList }) {

    const _currentUser = useSelector(currentUser)
    const dispatch = useDispatch()
    const paypal = useRef();
    const navigate = useNavigate()

    const [paidSuccessfully, setPaidSuccessfully] = useState(false)

    const handleCloseDialog = async () => {
        // setPaidSuccessfully(false)
        // setStartAddInvoiceItem(true)
        for (let i = 0; i < cartList.length; i++) {
            try {
                const resultAction = await dispatch(deleteCartById(cartList[i]))
                const originalPromiseResult = unwrapResult(resultAction)
            } catch (rejectedValueOrSerializedError) {
                alert(rejectedValueOrSerializedError);
            }
        }
        setPaidSuccessfully(false)
        navigate('/')
    }

    const [orderData, setOrderData] = useState({
        date: ' ',
        moneyReceived: '0',
        isChecked: false,
        isPaid: false,
        userID: _currentUser.userID,
        branchID: 'da198f71-813b-47f8-9ded-331b358d4780'
    })

    const [orderDataItem, setOrderDataItem] = useState({
        invoiceid: '',
        productid: '',
        amount: 0,
        total: 0
    })

    // const [listOrderDataItem, setListOrderDataItem] = useState([])

    const getTotal = () => {
        let temp = 0
        for (let i = 0; i < purchases.length; i++) {
            temp = temp + Number(purchases[i].amount.value)
        }
        return temp
    }

    const [listItem, setListItem] = useState([])

    const _addInvoiceItem = async (_invoiceId) => {
        let t = []
        for (let i = 0; i < cartList.length; i++) {
            for (let j = 0; j < prodList.length; j++) {
                if (cartList[i].productid === prodList[j].productID) {
                    let item = {
                        invoiceID: _invoiceId,
                        productID: prodList[j].productID,
                        amount: cartList[i].amount,
                        total: Number(cartList[i].amount) * Number(prodList[j].price)
                    }
                    t.push(item)
                }
            }
        }
        setListItem(t)
        setStartAddInvoiceItem(true)
    }
    const [startAddInvoiceItem, setStartAddInvoiceItem] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    useEffect(() => {
        if (isCompleted === true) {
            setPaidSuccessfully(true)
        }
    }, [isCompleted])

    useEffect(() => {
        const addItem = async () => {
            for (let i = 0; i < listItem.length; i++) {
                try {
                    const resultAction = await dispatch(addInvoiceItem(listItem[0]))
                    const originalPromiseResult = unwrapResult(resultAction)
                } catch (rejectedValueOrSerializedError) {
                    console.log(rejectedValueOrSerializedError)
                }
            }
            setStartAddInvoiceItem(false)
            setIsCompleted(true)
        }
        if (startAddInvoiceItem === true) {
            addItem()
        }
    }, [startAddInvoiceItem])

    const [startAddInvoice, setStartAddInvoice] = useState(false)

    const MakeInvoice = async () => {
        var m = moment().format('H mm')
        var date = moment().format('D/M/YYYY')
        let tempID = ''
        let temp = {
            ...orderData,
            moneyReceived: getTotal().toString(),
            isChecked: true,
            isPaid: true,
            date: date + ' ' + m,
            userID: _currentUser.userID,
            branchID: 'da198f71-813b-47f8-9ded-331b358d4780'
        }
        setOrderData(temp)
        setStartAddInvoice(true)
    }

    const [invoiceId, setInvoiceId] = useState(' ')

    useEffect(async () => {
        if (invoiceId != ' ') {
            _addInvoiceItem(invoiceId)
        }
    }, [invoiceId])

    useEffect(async () => {
        if (startAddInvoice === true) {
            try {
                const resultAction = await dispatch(addInvoice(orderData))
                const originalPromiseResult = unwrapResult(resultAction)
                setInvoiceId(originalPromiseResult.data.invoiceID)
            } catch (rejectedValueOrSerializedError) {
                alert(rejectedValueOrSerializedError)
                setStartAddInvoice(false)
            }
        }
    }, [startAddInvoice])

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: purchases,
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    await MakeInvoice()
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
            <Dialog open={paidSuccessfully}>
                <DialogTitle color='success'>Paid Successfully. Click OK to back to Main Page</DialogTitle>
                <Button
                    onClick={handleCloseDialog}
                    style={{
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