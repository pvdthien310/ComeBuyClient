import * as React from 'react';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, Chip, CircularProgress, Grid, Stack } from '@mui/material';
import "swiper/css";
import "swiper/css/pagination";
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router';
import { FeatureChart, NavBar, TechInforLine, BreadCrumb, BoxShopInfo } from '../../components';
import { useSelector } from 'react-redux';
import { cartListSelector } from '../../redux/selectors.js';
import { useState } from 'react';
import style from './style.js'

const ProductImage = styled('img')({
    height: 300,
    width: 'auto',
    maxWidth: 500,
    alignSelf: 'center',
    backgroundSize: 'cover',
})


const GuestCart = () => {
    const _cart = useSelector(cartListSelector)
    const { id } = useParams()
    const [cart, setCart] = useState(_cart)
    const [error, setError] = useState(null)

    return (
        <Stack sx={{ width: '100%', height: '100%' }}>
            <NavBar numberCart={_cart.length}></NavBar>
            <Stack sx={{ pt: 2, pl: 2 }}>
                <BreadCrumb />
            </Stack>
            <Grid container sx={{ width: '100%', height: '100%' }}>
                <Grid container item xs={12} sx={{p:4}}>
                <Box sx={style.boxInfor1}>
                    {
                        cart.length > 0 ?
                            cart.map((item) => (
                                <Typography>{item.name}</Typography>
                            )) :
                            <Stack sx={{height: '100%', width: '100%'}}>
                                <Typography variant='h6'>There is nothing product in your cart!</Typography>
                            </Stack>
                    }
                    </Box>
                </Grid>
                {/* <Grid container item xs={12} sx={style.boxShopInfo}>
                    <Grid container item xs={8} >
                        <Stack>
                            <Typography variant='h6' fontWeight={'bold'}>Shop with confidence with Comebuy</Typography>
                        </Stack>
                    </Grid>
                    <Grid container item xs={4}></Grid>  
                </Grid> */}
                <BoxShopInfo></BoxShopInfo>
            </Grid>
        </Stack>
    )
}

export default GuestCart