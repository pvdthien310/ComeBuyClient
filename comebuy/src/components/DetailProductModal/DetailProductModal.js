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
import BallotIcon from '@mui/icons-material/Ballot';
import style from './style.js'
import TechInforLine from '../TechInforLine/TechInforLine.js';
import MemoryIcon from '@mui/icons-material/Memory';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import InventoryIcon from '@mui/icons-material/Inventory';
import CableIcon from '@mui/icons-material/Cable';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import Battery3BarIcon from '@mui/icons-material/Battery3Bar';
import ScaleIcon from '@mui/icons-material/Scale';
import DescriptionIcon from '@mui/icons-material/Description';

const ProductImage = styled('img')({
    height: 200,
    width: 300,
    alignSelf: 'center',
})

const DetailProductModal = ({ open, product, onClose }) => {

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    product != null ?
                        <Box sx={style.boxContainer}>
                            <Grid container>
                                <Grid xs={10}>
                                    <Typography xs={12} color="#152659" id="modal-modal-title" fontWeight='bold' variant="h6" component="h2">
                                        {product.name}
                                    </Typography>
                                </Grid>
                                <Grid xs={2}>
                                    <Typography xs={12} color="#152659" id="modal-modal-title" fontWeight='bold' variant="h6" component="h2">
                                        {product.price + " USD"}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Box sx={style.boxInfor_Line}>
                            </Box>
                            <Grid>
                                <Typography xs={12} sx={{ marginBottom: 2 }} color="#152659" id="modal-modal-title" fontWeight='bold' variant="h6" component="h2">
                                    Detail Images
                                </Typography>
                            </Grid>
                            {
                                product.productimage.length > 0 ?
                                    <Swiper slidesPerView={3} modules={[Pagination]} spaceBetween={30} pagination={true}>
                                        {
                                            product.productimage.map((item, i) => (
                                                <SwiperSlide key={i}>
                                                    <ProductImage src={item.imageurl}></ProductImage>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                    :
                                    <Typography variant='h6' fontWeight='bold'>No Image</Typography>
                            }
                            <Box sx={{
                                height: 50,
                                backgroundColor: 'white',
                                width: '100%',
                                borderRadius: '10px',
                                boxShadow: 10,
                                marginTop: 2,
                                marginBottom: 2,
                                padding: 1
                            }}>
                                <Stack direction='row' sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingLeft: 1,
                                    paddingRight: 1,

                                }}>
                                    <Stack direction='row' spacing={1}>
                                        <Typography fontWeight='bold' color='#233059' variant='h6'>Brand:</Typography>
                                        <Typography fontWeight='bold' color='#233059' variant='h6'>{product.brand}</Typography>
                                    </Stack>
                                    <Stack direction='row' spacing={1}>
                                        <Typography fontWeight='bold' color='#233059' variant='h6'>Origin:</Typography>
                                        <Typography fontWeight='bold' color='#233059' variant='h6'>{product.origin}</Typography>
                                    </Stack>
                                    <Stack direction='row' spacing={1}>
                                        <Typography fontWeight='bold' color='#233059' variant='h6'>Year:</Typography>
                                        <Typography fontWeight='bold' color='#233059' variant='h6'>2021</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Box sx={style.boxInfor}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    padding={1}
                                    sx={style.boxInfor_Stack}>
                                    <BallotIcon />
                                    <Typography variant='h6' fontWeight='bold'>Technical Information</Typography>
                                </Stack>
                                <Grid container>
                                    <Grid xs={6} paddingLeft={2}>
                                        <Stack xs={12} spacing={2} padding={2}>
                                            <TechInforLine Icon={<MemoryIcon />} Text={product.cpu} Title='CPU' />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                            <TechInforLine Icon={<ScreenshotMonitorIcon />} Text={product.screenDimension + ' inch, ' + product.colorCoverage + ' RGBs'} Title='Screen Dimension' />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                            <TechInforLine Icon={<InventoryIcon />} Text={product.memory + ' SSD'} Title='Store' />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                            <TechInforLine Icon={<CableIcon />} Text={product.externalIOPort} Title='External IO Port' />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={6} paddingLeft={2}>
                                        <Stack xs={12} spacing={2} padding={2}>
                                            <TechInforLine Icon={<AutofpsSelectIcon />} Text={product.ram + " GB"} Title='RAM' />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                            <TechInforLine Icon={<ChromeReaderModeIcon />} Text={product.gpu} Title="GPU" />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                            <TechInforLine Icon={<Battery3BarIcon />} Text={product.battery + "Whr"} Title="Battery" />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                            <TechInforLine Icon={<ScaleIcon />} Text={product.weight + ' kg'} Title="Weight" />
                                            <Box sx={style.boxinfor_Stack_Line}></Box>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={style.boxDes}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    padding={1}
                                    sx={style.boxDes_Stack}>
                                    <DescriptionIcon />
                                    <Typography variant='h6' fontWeight='bold'>Description</Typography>
                                </Stack>
                                <Grid sx={style.BoxDes_Grid} paddingLeft={4} paddingRight={4}>
                                    <Grid xs={12}>
                                        {
                                            product.productimage.length > 0 &&
                                            <ProductImage xs={12} src={product.productimage[0].imageurl}></ProductImage>
                                        }
                                        <Typography xs={12} sx={{ marginBottom: 2 }} variant='body1'>{product.description}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Button onClick={onClose} variant="contained">Close</Button>
                        </Box>
                        : <Typography variant='h6'>No Data</Typography>
                }
            </Modal>
        </div>
    );
}
export default DetailProductModal;