import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux'
import SwiperCore, { Autoplay } from 'swiper'
import "swiper/css";
import { getAll } from '../../redux/slices/productSlice'
import { productListSelector } from "../../redux/selectors";
import { red } from "@mui/material/colors";
import SliderItem from "./SliderItem/SliderItem";
function Slider() {
    const _productList = useSelector(productListSelector)
    const dispatch = useDispatch()
    const [productList, setProductList] = useState([])

    useEffect(() => {
        dispatch(getAll())
    }, [])

    useEffect(() => {
        setProductList(_productList)
    }, [_productList])
    
    return (
        <Swiper
        // modules={[Autoplay]}
        // grabCursor={true}
        // spaceBetween={0}
        // slidesPerView={1}
        //autoplay={{ delay: 3000 }}
        >
            {
                productList.map((item, i) => (
                    <SwiperSlide key={i}>
                       <SliderItem image={item.productimage[0].imageurl}></SliderItem>
                    </SwiperSlide>
                ))
            }
          
        </Swiper>

    )
}

export default Slider;