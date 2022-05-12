import { Grid, Stack, Typography, Button, styled } from "@mui/material"
import style from "./style"
import RecommendIcon from '@mui/icons-material/Recommend';
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import aiApi from "../../api/aiAPI";
import ProductItem from "./ProductItem";

const CustomButton = styled(Button)({
    color: 'white',
    backgroundColor: 'black',
    width: '100%',
    borderRadius: '5px',
    borderWidth: '3px',
    paddingLeft: 20,
    paddingRight: 20,

    '&:hover': {
        zIndex: 1,
        backgroundColor: 'grey'
    },
})


const RecommendedProductLine = (props) => {

    const [products, setProduct] = useState([])

    useEffect(async () => {
        const response = await aiApi.recommendedSystem({ name: 'Phạm Võ Di Thiên' })
        if (response.status == 200) {
            const list = response.data.map((ite) => ite[0])
            setProduct(list)
        }
        else
            console.log("Loi ");
        
            return () => {
                setProduct({})
            };
    }, [])

    return (
        <Grid container item xs={12} sx={style.boxShopInfo}>
            <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center', p: 2 }}>
                <RecommendIcon />
                <Typography variant='h5' fontWeight={'bold'}>Recommend Product</Typography>
            </Stack>
            <Grid container item xs={12}>
                <Swiper slidesPerView={3} loop spacing={1}>
                    {
                        products.map((item, i) => (
                            <SwiperSlide key={i} >
                                <ProductItem product={item}></ProductItem>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Grid>
        </Grid>
    )
}
export default RecommendedProductLine