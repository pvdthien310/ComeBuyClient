import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Stack, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../../redux/slices/productSlice";
import { useEffect, useState } from "react";
import style from './style.js'
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

//icon styles
import BallotIcon from '@mui/icons-material/Ballot';
import MemoryIcon from '@mui/icons-material/Memory';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import InventoryIcon from '@mui/icons-material/Inventory';
import CableIcon from '@mui/icons-material/Cable';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import Battery3BarIcon from '@mui/icons-material/Battery3Bar';
import ScaleIcon from '@mui/icons-material/Scale';
import DescriptionIcon from '@mui/icons-material/Description';
import TextFieldForEdit from "../../../components/TextFieldForEdit";
import GradientIcon from '@mui/icons-material/Gradient';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import LanguageIcon from '@mui/icons-material/Language';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CottageIcon from '@mui/icons-material/Cottage';
import ImageForEditProduct from "../../../components/ImageForEditProduct";
import FeatureSelect from "../../../components/FeatureSelect.js";
import { featureListSelector } from "../../../redux/selectors";
import { getAll } from "../../../redux/slices/featureSlice";



const EditProduct = () => {
    const location = useLocation()
    const product = location.state
    const _featureList = useSelector(featureListSelector)
    const [open, setOpen] = useState(false);
    const [featureList, setFeatureList] = useState(_featureList);
    const [currentFeature, setCurrentFeature] = useState(product.feature.map((item) => item.name))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    };

    const handleFeatureChosen = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentFeature(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const SaveChange = () => {
        dispatch(editProduct(product))
            .unwrap()
            .then((originalPromiseResult) => {
                setOpen(true);
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("Error load product")
            })
    }

    useEffect(() => {
        dispatch(getAll())
            .unwrap()
            .then((originalPromiseResult) => {
                console.log('load feature')
                setFeatureList(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("Error load feature")
            })
    }, [])

    useEffect(() => {
        setCurrentFeature(product.feature.map((item) => item.name))
    }, [product])

    return (
        <Stack
            sx={style.boxContainer}>
            <Box sx={style.boxInfor}>
                <Stack
                    direction="row"
                    spacing={1}
                    padding={1}
                    sx={style.boxInfor_Stack}>
                    <BallotIcon />
                    <Typography variant='h6' fontWeight='bold'>Edit Technical Specifications</Typography>
                </Stack>
                <Box sx={{ backgroundColor: '#8F8EBF', height: 5, width: '100%' }}></Box>
                <Typography variant='h6' fontWeight='bold'>Images</Typography>
                {
                    product.productimage.length > 0 ?
                        <Swiper slidesPerView={1} modules={[Pagination]} spaceBetween={30} pagination={true}>
                            {
                                product.productimage.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <ImageForEditProduct image={item.imageurl} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        :
                        <Typography variant='h6' fontWeight='bold'>No Image</Typography>
                }
                <Grid container>
                    <Grid xs={12}>
                        <FeatureSelect item="true" features={featureList} currentFeature={currentFeature} handleFeatureChange={handleFeatureChosen} />
                    </Grid>
                    <Grid xs={6} paddingLeft={2}>
                        <Stack item="true" xs={12} spacing={2} padding={2}>
                            <TextFieldForEdit Icon={<DriveFileRenameOutlineIcon />} Text={product.name} Title='Name' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<MemoryIcon />} Text={product.cpu} Title='CPU' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<ScreenshotMonitorIcon />} Text={product.screenDimension} Title='Screen Dimension (icnh)' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<InventoryIcon />} Text={product.memory} Title='Store (SSD)' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<CableIcon />} Text={product.externalIOPort} Title='External IO Port' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<LanguageIcon />} Text={product.origin} Title='Origin' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<AddModeratorIcon />} Text={product.warranty} Title='Warranty' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                        </Stack>
                    </Grid>
                    <Grid xs={6} paddingLeft={2}>
                        <Stack item="true" xs={12} spacing={2} padding={2}>
                            <TextFieldForEdit Icon={<CottageIcon />} Text={product.brand} Title='Brand' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<AutofpsSelectIcon />} Text={product.ram} Title='RAM (GB)' />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<ChromeReaderModeIcon />} Text={product.gpu} Title="GPU" />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<Battery3BarIcon />} Text={product.battery} Title="Battery (Whr)" />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<ScaleIcon />} Text={product.weight} Title="Weight (kg)" />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<GradientIcon />} Text={product.colorCoverage} Title="Color Coverage (RGBs)" />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                            <TextFieldForEdit Icon={<PriceChangeIcon />} Text={product.price} Title="Price (USD)" />
                            <Box sx={style.boxinfor_Stack_Line}></Box>
                        </Stack>
                    </Grid>
                    <Grid xs={12} paddingLeft={2} paddingTop={2}>
                        <Stack item="true" xs={12} spacing={1}>
                            <Stack
                                direction="row"
                                spacing={1}>
                                <DescriptionIcon />
                                <Typography fontWeight='bold'>Description</Typography>
                            </Stack>
                            <TextField
                                label='Description'
                                multiline
                                placeholder={product.description}
                                defaultValue={product.description}
                                variant="standard"
                            />
                        </Stack>
                        <Box item="true" sx={style.boxinfor_Stack_Line}></Box>
                    </Grid>
                    <Grid xs={12} paddingLeft={2} paddingTop={2}>
                    </Grid>
                </Grid>
            </Box>
            <Button variant="contained" onClick={() => navigate('/product')}>Back</Button>
            <Button variant="contained" onClick={SaveChange}>Save</Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Update product successfully!
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default EditProduct;