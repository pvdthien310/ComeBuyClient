import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/selectors";

export default function Paypal(cartList, prodList) {

    const _currentUser = useSelector(currentUser)

    const paypal = useRef();
    const { orderList } = cartList
    const { listProduct } = prodList
    // const { purchaseList } = purchaseUnits

    const [orderData, setOrderData] = useState({
        date: ' ',
        moneyReceived: '0',
        isChecked: false,
        isPaid: false,
        userid: _currentUser.userID,
        branchid: null
    })

    const [orderDataItem, setOrderDataItem] = useState({
        invoiceid: '',
        productid: '',
        amount: 0,
        total: 0
    })

    const [listOrderDataItem, setListOrderDataItem] = useState([])

    const [purchaseUnits, setPurchaseUnits] = useState([])

    useEffect(() => {
        const MakePurchaseUnit = () => {
            let sample = []
            for (let i = 0; i < orderList.length; i++) {
                for (let j = 0; j < listProduct.length; j++) {
                    if (listProduct[j].productID === orderList[i].productid) {
                        let temp = {
                            description: listProduct[j].productID,
                            amount: {
                                currency_code: "USD",
                                value: Number(orderList[i].amount) * Number(listProduct[j].price)
                            }
                        }
                        sample.push(temp)
                    }
                }
            }
            return sample
        }
        if (purchaseUnits.length === 0) {
            let temp = MakePurchaseUnit()
            setPurchaseUnits(temp)
        }
    }, [purchaseUnits])


    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        //Here you pass single order or single item here
                        // purchase_units: [
                        //     {
                        //         description: "Cool looking table",
                        //         amount: {
                        //             currency_code: "USD",
                        //             value: 1.0,
                        //         },
                        //     },
                        // ],
                        purchaseUnits: purchaseUnits
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order)
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            {console.log(orderList)}
            <div ref={paypal}></div>
        </div>
    );
}