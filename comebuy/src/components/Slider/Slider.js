import React, {useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux'
import "swiper/css";
import { getAll } from '../../redux/slices/productSlice'
import { productListSelector } from "../../redux/selectors";
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
        <Swiper>
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