import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux'
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { styled } from '@mui/material/styles';

const ProductImage = styled('img')({
    height: 300,
    width: 'auto',
    maxWidth: 500,
    alignSelf: 'center',
    backgroundSize: 'cover',
})

const PreviewImagesModal = (props) => {
    return (
        <div>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    height: 500,
                    transform: 'translate(-50%, -50%)',
                    width: 1000,
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                    overflowY: 'scroll',
                    maxHeight: 700,
                }}>
                    <Swiper slidesPerView={1} modules={[Pagination]} spaceBetween={30} pagination={true}>
                        {
                            props.images.map((item, i) => (
                                <SwiperSlide key={i} >
                                    <ProductImage src={item} key={item} />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                    <Button onClick={props.onClose} >Back</Button>
                    <Button onClick={props.onSubmit} >Submit</Button>
                </Box>

            </Modal>
        </div >
    );
}
export default PreviewImagesModal;