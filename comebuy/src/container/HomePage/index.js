import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountWithID } from '../../redux/slices/accountSlice'
import {
    BrandNavBar,
    Slider,
    NavBar,
    BrandLine,
    FeatureBar,
    FeatureImage,
    BrandLineImage,
    LaptopImageLine,
    BigFooter,
    NewProductLine
} from '../../components'
import { unwrapResult } from '@reduxjs/toolkit'
import { cartSlice } from './../../redux/slices/cartSlice'
import { getAllProduct } from '../../redux/slices/productSlice'
import { productListSelector } from '../../redux/selectors'
import { Box, Stack, Typography } from '@mui/material'

const HomePage = () => {
    const _productList = useSelector(productListSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [numberItemsInCart, setNumberItemsInCart] = useState(JSON.parse(localStorage.getItem('cart')).length)

    useEffect(async () => {
        if (localStorage.getItem('idUser') != "") {
            try {
                const resultAction = await dispatch(getAccountWithID(localStorage.getItem('idUser')))
                const originalPromiseResult = unwrapResult(resultAction)
                dispatch(cartSlice.actions.cartListChange(originalPromiseResult.cart))
                // handle result here
            } catch (rejectedValueOrSerializedError) {
                if (rejectedValueOrSerializedError != null) {
                    console.log("Load User Failed")
                }
            }
        }
        else {
            const value = JSON.parse(localStorage.getItem('cart'))
            dispatch(cartSlice.actions.cartListChange(value))
        }
        await dispatch(getAllProduct())
            .unwrap()
            .then((originalPromiseResult) => {
                console.log(originalPromiseResult)
                // setProductList(originalPromiseResult.filter(ite => ite.brand == brandName))
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("Error load product")
            })
        return () => {

        }

    }, [])


    const brandList = [
        {
            title: 'Apple',
            url: 'https://images.unsplash.com/photo-1494698853255-d0fa521abc6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80',
        },
        {
            title: 'Dell',
            url: 'https://images.unsplash.com/photo-1622286346003-c5c7e63b1088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'HP',
            url: 'https://images.unsplash.com/photo-1579362243176-b746a02bc030?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1181&q=80',
        },
        {
            title: 'Lenovo',
            url: 'https://images.unsplash.com/photo-1601406984081-44d85ce92f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'Acer',
            url: 'https://images.unsplash.com/photo-1629751372750-3ddb8f8bfd0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1130&q=80',
        },
        {
            title: 'Razer',
            url: 'https://images.unsplash.com/photo-1629751372750-3ddb8f8bfd0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1130&q=80',
        },
        {
            title: 'MSI',
            url: 'https://images.unsplash.com/photo-1629751372750-3ddb8f8bfd0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1130&q=80',
        },
        {
            title: 'Huawei',
            url: 'https://images.unsplash.com/photo-1629751372750-3ddb8f8bfd0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1130&q=80',
        }
    ]
    return (
        <Stack>
            <NavBar></NavBar>
            <Box sx={{ height: 2, m: 2, width: '95%', backgroundColor: 'black' }}></Box>
            <BrandNavBar brandLine={brandList} ></BrandNavBar>
            <Stack sx={{ p: 2 }} spacing={5}>
                
                <FeatureImage
                    onNavigate={() => navigate('/productSpace')}
                    urlImage='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-compare-202206?wid=1806&hei=642&fmt=jpeg&qlt=90&.v=1652989686485'
                    BigText='Which one is right for you?'
                    SmallText='ComeBuy Store. The best way to buy the products you love.'
                ></FeatureImage>
                <NewProductLine />
                <FeatureBar></FeatureBar>
                <BrandLineImage
                    urlImage='https://images.unsplash.com/photo-1615750173609-2fbf12fd1d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    BigText='CHOOSE AND GET YOUR WORK EFFECTIVELY'
                    SmallText='ComeBuy Store. The best way to buy the products you love.'
                ></BrandLineImage>
                <Typography variant='h4' fontWeight={'bold'} sx={{alignSelf:'center'}}>Our store.
                <Typography variant='h4' fontWeight={'bold'} sx={{color:'#BCBFB0'}}>The best way to buy the products you love.</Typography>
                </Typography>
                <div>
                    {
                        _productList.length > 0 && brandList.map((item, i) => {
                            const stringID = 'Line_' + item.title
                            return (
                                <BrandLine key={i} id={stringID} brandName={item.title} url={item.url} ></BrandLine>
                            );
                        })
                    }
                </div>
                <Typography variant='h4' fontWeight={'bold'} sx={{alignSelf:'center'}}>Feedback.
                <Typography variant='h4' fontWeight={'bold'} sx={{color:'#BCBFB0'}}>Here's where the fun begins.</Typography>
                </Typography>
                <LaptopImageLine></LaptopImageLine>
            </Stack>
            <BigFooter />
        </Stack>
    )

}
export default HomePage;