import React from "react";
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from "swiper/react";
import BrandItem from "./BrandItem/BrandItem";
import Button from '@mui/material/Button';
import './BrandLine.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Img = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
});

const CustomButton = styled(Button)({
  color:'black',
  variant: 'outlined',
  fontWeight:'bold',
  backgroundColor: 'white',
  borderRadius: '5px', 
  borderWidth: '3px',
  marginBottom: '5px',
  hover: {
      color: 'white',
      backgroundColor: 'white',
      border: '5px solid'
  }
  
//   '&:hover, &.Mui-focusVisible': {
//     zIndex: 1,
//     '& .MuiImageBackdrop-root': {
//         opacity: 0.15,
//     },
//     '& .MuiImageMarked-root': {
//         opacity: 0,
//     },
//     '& .MuiTypography-root': {
//         border: '5px solid currentColor',
//         height: '80%'
//     },
// },
})


function BrandLine(props) {
    const brandName = props.brandName
    const brandurl = props.url

    const as = ['1', '2', '3']
    return (
        <Grid className='BrandLine' container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid container justifyContent={'flex-end'} item xs={12} className='BrandLine__ImgBrand'>
                <CustomButton  endIcon={<NavigateNextIcon />} >
                    {brandName}
                </CustomButton>
            </Grid>
            <Grid item xs={2}>
                <Img style={{}} alt="complex" src={brandurl} />
            </Grid>
            <Grid item xs={10}>
                <Swiper slidesPerView={3} loop spacing={3}>
                    {
                        as.map((item, i) => (
                            <SwiperSlide key={i} >
                                <BrandItem></BrandItem>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </Grid>

        </Grid>
    )
}

export default BrandLine;