import { Grid, Stack, Typography, Button, styled } from "@mui/material"
import style from "./style"
import RecommendIcon from '@mui/icons-material/Recommend';
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import aiApi from "../../api/aiAPI";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import { productListSelector } from "../../redux/selectors";

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
    const _productList = useSelector(productListSelector)
    const [products, setProduct] = useState([])

    useEffect(async () => {
        const response = await aiApi.recommendedSystem({ name: 'Phạm Võ Di Thiên' })
        if (response.status == 200) {
            let recommendedList = response.data.filter(ite => ite != props.productID)
            if (recommendedList.length == 1) {
                recommendedList.push(_productList[_productList.length - 1].productID)
                recommendedList.push(_productList[_productList.length - 2].productID)
            }
            setProduct(recommendedList)
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