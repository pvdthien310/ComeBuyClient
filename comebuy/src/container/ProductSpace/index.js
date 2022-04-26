import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FeatureSelect, ProductItem, SnackBarAlert } from "../../components";
import { getAllProduct } from "../../redux/slices/productSlice";
import FilterListIcon from '@mui/icons-material/FilterList';
import { getAllFeature } from "../../redux/slices/featureSlice";
import { AirbnbSlider, AirbnbThumbComponent, ExampleSlider, PrettoSlider } from "./style";
const ProductSpace = () => {
    const [productList, setProductList] = useState([])
    const dispatch = useDispatch()
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState("No Error")
    const [messageSuccess, setMessageSuccess] = useState("Notification")
    const [currentFeature, setCurrentFeature] = useState([])
    const [featureList, setFeatureList] = useState([])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };
    const handleFeatureChosen = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentFeature(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    useEffect(() => {
        // Load Product
        dispatch(getAllProduct())
            .unwrap()
            .then((originalPromiseResult) => {
                setProductList(originalPromiseResult)
                setMessageSuccess("Load Product Successfully")
                setOpenSuccessAlert(true)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("Error load product")
                setMessageError("Error Load Product List")
                setOpenErrorAlert(true)
            })
        // Load Feature
        dispatch(getAllFeature())
            .unwrap()
            .then((_originalPromiseResult) => {
                setFeatureList(_originalPromiseResult)
            })
            .catch((_rejectedValueOrSerializedError) => {
                console.log("Error load product")
            })

        return () => {
            setProductList({})
            setFeatureList([])
        }
    }, [])

    useEffect(() => {
        console.log(productList)
    }, [productList])



    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Grid container sx={{ width: '100%', height: '100%' }} spacing={2}>
                <Grid item xs={3} sx={{ p: 2, backgroundColor: '#C69AD9' }}>
                    <Stack item sx={{ backgroundColor: '#C69AD9' }}>
                        <Typography variant="h6" sx={{ m: 1, color: 'white' }} fontWeight={'bold'} >Filter</Typography>
                        <Box sx={{ backgroundColor: 'white', height: 5, width: '100%' }}></Box>
                        <Stack sx={{ p: 2 }}>
                            <Typography variant="h6" fontWeight={'bold'} color={'white'} sx={{ pb: 1 }}>Demands</Typography>
                            <FeatureSelect features={featureList} currentFeature={currentFeature} handleFeatureChange={handleFeatureChosen}></FeatureSelect>
                            <Box sx={{ backgroundColor: 'white', height: 2, width: '100%' }}></Box>
                        </Stack>
                        <Stack sx={{ pr: 2, pl: 2 }}>
                            <Typography variant="h6" fontWeight={'bold'} color={'white'} sx={{ pb: 1 }}>Prices</Typography>
                            <AirbnbSlider
                                 valueLabelDisplay="auto"
                                components={{ Thumb: AirbnbThumbComponent }}
                                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                                defaultValue={[200, 3000]}
                            />
                            <Box sx={{ backgroundColor: 'grey', width: '100%' }}></Box>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={9} sx={{ p: 2 }}>
                    <Stack>
                        <Typography variant="h6" fontWeight={'bold'} sx={{ alignSelf: 'center', m: 1 }}>Our Product</Typography>
                        <Box sx={{ backgroundColor: '#C69AD9', height: 5, width: '100%' }}></Box>
                        <Stack direction={"row"} flexWrap={"wrap"} item sx={{ alignSelf: 'center', m: 2, justifyContent: 'center', alignItems: 'center' }}>
                            {
                                productList.length > 0 &&
                                productList.map((item, i) => (
                                    <ProductItem key={i} product={item}></ProductItem>
                                ))
                            }
                        </Stack>
                    </Stack>
                </Grid>
                <SnackBarAlert severity='success' open={openSuccessAlert} handleClose={handleClose} message={messageSuccess} />
                <SnackBarAlert severity='error' open={openErrorAlert} handleClose={handleClose} message={messageError} />
            </Grid>
        </div >
    )
}

export default ProductSpace;