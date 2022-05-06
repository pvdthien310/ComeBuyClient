import * as React from 'react';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, Button, Chip, CircularProgress, Grid, Stack } from '@mui/material';
import "swiper/css";
import "swiper/css/pagination";
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router';
import { FeatureChart, NavBar, TechInforLine, BreadCrumb, BoxShopInfo, ProductInCart } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { cartListSelector } from '../../redux/selectors.js';
import { useState, useEffect } from 'react';
import style from './style.js'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getAllProduct } from '../../redux/slices/productSlice';
import PaymentsIcon from '@mui/icons-material/Payments';

const ProductImage = styled('img')({
    height: 300,
    width: 'auto',
    maxWidth: 500,
    alignSelf: 'center',
    backgroundSize: 'cover',
})


const GuestCart = () => {
    const dispatch = useDispatch()
    const _cart = useSelector(cartListSelector)
    const [cart, setCart] = useState(_cart)
    const [error, setError] = useState(null)
    const [total, setTotal] = useState(0)
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)

    const CountTotal = async (prList) => {
        let newTotal = 0;
        await cart.map((item) => {
            let rs = prList.find((ite) => ite.productID == item.productid)
            if (rs != undefined)
                newTotal = newTotal + Number(Number(rs.price) * Number(item.amount))
        })
        setTotal(newTotal)
    }

    useEffect(async () => {
        dispatch(getAllProduct())
            .unwrap()
            .then(async (originalPromiseResult) => {
                setProductList(originalPromiseResult)
                setLoading(false)
                await CountTotal(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
        return () => {
            setProductList({})
        }
    }, [])

    useEffect(() => {
        setCart(_cart)
        CountTotal(productList)
        return () => {
            setCart([])
        }
    }, [_cart])


    return (
        <Stack sx={{ width: '100%', height: '100%' }}>
            <NavBar hiddenCartLabel={false}></NavBar>
            <Stack sx={{ pt: 2, pl: 2 }}>
                <BreadCrumb />
            </Stack>
            <Grid container sx={{ width: '100%', height: '100%' }}>
                <Grid container item xs={8} sx={{ p: 4 }}>
                    {
                        loading == false ?
                            <Box sx={style.boxInfor1}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    padding={1}
                                    sx={{ alignItems: 'center', ml: 2, mb: 2 }}>
                                    <AddShoppingCartIcon />
                                    <Typography  variant='h6' fontWeight='bold'>
                                        Cart ({cart.length})
                                    </Typography>
                                </Stack>
                                {
                                    cart.length > 0 ?
                                        cart.map((item, i) => (
                                            <ProductInCart key={i} productInCart={item}></ProductInCart>
                                        )) :
                                        <Stack sx={{ height: '100%', width: '100%' }}>
                                            <Typography variant='h6'>There is nothing product in your cart!</Typography>
                                        </Stack>
                                }
                            </Box> :
                            <Stack>
                                <CircularProgress />
                            </Stack>
                    }
                </Grid>
                <Grid container item xs={4}>
                    {!loading &&
                        <Box sx={style.boxHandle}>
                            {
                                cart != null ?
                                    <Stack>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            padding={1}
                                            sx={{ alignItems: 'center' }}>
                                            <AddShoppingCartIcon />
                                            <Typography variant='h6' fontWeight='bold'>
                                                Order
                                            </Typography>
                                        </Stack>
                                        <Box sx={{ height: 3, width: '100%', backgroundColor: '#B360A0', mt: 2 }}></Box>
                                        <Stack direction="row" sx={{ justifyContent: 'space-between', p: 2 }}>
                                            <Typography variant='body1' >Temporary Total:</Typography>
                                            <Typography variant='body1' fontWeight={'bold'} color='error'>${total}</Typography>
                                        </Stack>
                                        <Stack direction="row" sx={{ justifyContent: 'space-between', p: 2 }}>
                                            <Typography variant='body1' >Promotion:</Typography>
                                            <Typography variant='body1' fontWeight={'bold'} color='error'>$0</Typography>
                                        </Stack>
                                        <Box sx={{ height: 3, width: '100%', backgroundColor: '#B360A0' }}></Box>
                                        <Stack direction="row" sx={{ justifyContent: 'space-between', p: 2 }}>
                                            <Typography variant='body1' >Total:</Typography>
                                            <Typography variant='body1' fontWeight={'bold'} color='error'>${total}</Typography>
                                        </Stack>
                                        <Button variant='filled' sx={style.buttonCheckout} endIcon={<PaymentsIcon />}>Checkout Now</Button>
                                    </Stack>
                                    :
                                    <Stack sx={{ width: '100%', height: '100%' }}>
                                        <CircularProgress></CircularProgress>
                                    </Stack>
                            }
                        </Box>
                    }
                </Grid>
                <BoxShopInfo></BoxShopInfo>
            </Grid>
        </Stack>
    )
}

export default GuestCart