
import React from "react";
import './SliderItem.css'


function SliderItem(props) {
    console.log(props.image)
    return (
        <div className="slider__sliderItem" style={{ backgroundImage: `url(${props.image})` }}></div>
    )
}

export default SliderItem;