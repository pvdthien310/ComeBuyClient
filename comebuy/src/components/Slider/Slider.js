import React, {useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux'
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { getAll } from '../../redux/slices/productSlice'
import SliderItem from "./SliderItem/SliderItem";
function Slider() {
    const dispatch = useDispatch()
    const [productList, setProductList] = useState([])
    useEffect(() => {
        dispatch(getAll())
        .unwrap()
        .then((originalPromiseResult) => {
            setProductList(originalPromiseResult)
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log("Error load product")
        })
    }, [])

    return (
        <Swiper pagination={true} modules={[Pagination]} loop>
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