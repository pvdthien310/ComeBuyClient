import { Grid, Stack, Typography } from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import aiApi from '../../api/aiAPI';
import ProductItem from './ProductItem';
import { currentUser, productListSelector } from '../../redux/selectors';
import { getAllInvoice } from '../../redux/slices/invoiceSlice';
import style from './style';

function RecommendedProductLine(props) {
    const dispatch = useDispatch();
    const _productList = useSelector(productListSelector);
    const _currentUser = useSelector(currentUser);
    const [products, setProduct] = useState([]);

    useEffect(async () => {
        let cancel = false;
        try {
            const resultAction = await dispatch(getAllInvoice());
            const originalPromiseResult = unwrapResult(resultAction);
            const newData = [];
            await originalPromiseResult.map((ite) => {
                ite.invoiceitem.map((ite2) => {
                    if (ite2.productid != null) {
                        const Time = ite.date.split(' ');
                        let processedTime = '7 00';
                        if (Time.length !== 1) processedTime = Time[1].replace(':', ' ');
                        newData.push({
                            MaKhachHang: ite.userid,
                            TenKhachHang: ite.account.name,
                            MaSanPham: ite2.productid,
                            Thoigian: processedTime,
                            Amount: ite2.amount,
                        });
                    }
                });
            });

            const response = await aiApi.recommendedSystem({ name: _currentUser.name, data: newData });
            if (!cancel && response.status === 200) {
                const recommendedList = response.data.filter((ite) => ite !== props.productID);
                if (recommendedList.length === 1) {
                    recommendedList.push(_productList[_productList.length - 1].productID);
                    recommendedList.push(_productList[_productList.length - 2].productID);
                }
                setProduct(recommendedList);
            } else console.log('Loi ');
        } catch (rejectedValueOrSerializedError) {
            return rejectedValueOrSerializedError;
        }

        return () => {
            setProduct({});
            cancel = true;
        };
    }, []);

    return (
        <Grid container item xs={12} sx={style.boxShopInfo}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', pl: 2, pr: 2, pb: 2 }}>
                <RecommendIcon />
                <Typography variant="h5" fontWeight="bold">
                    Recommend Product
                </Typography>
            </Stack>
            <Grid container item xs={12}>
                <Swiper slidesPerView={3} loop spacing={1}>
                    {products.map((item, i) => (
                        <SwiperSlide key={i}>
                            <ProductItem product={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Grid>
        </Grid>
    );
}
export default RecommendedProductLine;
