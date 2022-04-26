import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductItem, SnackBarAlert } from "../../components";
import { getAllProduct } from "../../redux/slices/productSlice";

const ProductSpace = () => {
    const [productList, setProductList] = useState([])
    const dispatch = useDispatch()
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState("No Error")
    const [messageSuccess, setMessageSuccess] = useState("Notification")
    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };
    useEffect(() => {

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
        return () => { setProductList({}) }
    }, [])

    useEffect(() => {
        console.log(productList)
    }, [productList])

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Grid container sx={{ width: '100%', height: '100%' }} spacing={2}>
                <Grid item xs={3}>
                    <Stack item sx={{ backgroundColor: 'blue' }}>
                        <Typography>kkkkk</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={9} sx={{ p: 2 }}>
                    <Stack>
                        <Typography variant="h6" fontWeight={'bold'} sx={{alignSelf: 'center',m:1}}>Our Product</Typography>
                        <Box sx={{backgroundColor: '#C69AD9', height: 5, width:'100%'}}></Box>
                        <Stack direction={"row"} flexWrap={"wrap"} item sx={{ alignSelf: 'center',m:2, justifyContent:'center',alignItems: 'center' }}>
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
        </div>
    )
}

export default ProductSpace;