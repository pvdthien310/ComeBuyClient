import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

const ImgFeatureLine = styled('img')(({ theme }) => ({
    width: '70%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    boxShadow: 10,

    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const Container = styled(Stack)(() => ({
    spacing: 2,
    display: 'flex',
    height: 650,
    position: 'relative',
    justifyContent: 'top',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    p: 5,
    mt: 10,
    borderRadius: 10,
    boxShadow: 50,
}));

const CustomButton = styled(Button)(() => ({
    variant: 'outlined',
    color: 'black',
    zIndex: '3',
    fontWeight: 'bold',
    border: '2px solid black',
    marginTop: '3%',
    bottom: 0,
}));

export default function LiveBanner(props) {
    return (
        <Container>
            <Swiper
                className="swiper-livebanner"
                spaceBetween={30}
                centeredSlides
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation
                modules={[Autoplay, Pagination, Navigation]}
            >
                {props.banners.length > 0 ? (
                    props.banners.map((item) => (
                        <SwiperSlide className="swiper-slide-livebanner" key={item.url}>
                            <ImgFeatureLine src={item.url} />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide className="swiper-slide-livebanner">
                        <ImgFeatureLine src={props.urlImage} />
                    </SwiperSlide>
                )}
            </Swiper>
            {/* <ImgFeatureLine src={props.urlImage}></ImgFeatureLine> */}
            <CustomButton endIcon={<ArrowRightIcon />} onClick={props.onNavigate}>
                See More
            </CustomButton>
        </Container>
    );
}
