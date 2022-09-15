import React, { useState, useEffect, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import { getAllProduct } from '../../redux/slices/productSlice';
import SliderItem from './SliderItem/SliderItem';

function Slider() {
    const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        dispatch(getAllProduct())
            .unwrap()
            .then((originalPromiseResult) => {
                setProductList(originalPromiseResult);
            })
            .catch(() => {
                console.log('Error load product');
            });
        return () => {
            setProductList({});
        };
    }, []);

    return (
        <Swiper pagination modules={[Pagination]} loop>
            {productList.map((item, i) => (
                <SwiperSlide key={i}>
                    <SliderItem image={item.productimage[0].imageURL} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default memo(Slider);
