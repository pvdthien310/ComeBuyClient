import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumb, FeatureSelect, FilterColumn, NavBar, ProductItem, SearchBar, SnackBarAlert } from "../../components";
import { getAllProduct } from "../../redux/slices/productSlice";
import FilterListIcon from '@mui/icons-material/FilterList';
import { getAllFeature } from "../../redux/slices/featureSlice";
import { AirbnbSlider, AirbnbThumbComponent, ExampleSlider, PrettoSlider } from "./style";

import { cartListSelector, productListSelector } from "../../redux/selectors";
const ProductSpace = () => {
    const _cart = useSelector(cartListSelector)
    const _productList = useSelector(productListSelector)
    const [productList, setProductList] = useState([])
    const dispatch = useDispatch()
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState("No Error")
    const [messageSuccess, setMessageSuccess] = useState("Notification")
    const [filterOptions, setFilterOptions] = useState({
        brand: [],
        ram: [],
        cpu: [],
        gpu: [],
        screendimension: [],
        weight: [],
        memory: [],
        year: []
    })
    const [currentFeature, setCurrentFeature] = useState([])

    const Filter = () => {
        let newProductList = _productList
        let reset = true
        if (currentFeature.length > 0) {
            reset = false
            newProductList = _productList.filter((pr) => {
                const containsAll = pr.feature.every(element => {
                    return currentFeature.includes(element.name);
                });
                if (containsAll) return true
                else return false
            })
            console.log(newProductList)
        }
        const props = Object.getOwnPropertyNames(filterOptions)
        props.forEach((item) => {
            if (filterOptions[item].length > 0) {
                newProductList = newProductList.filter((pr) => {
                    if (item != 'screendimension')
                        return filterOptions[item].includes(pr[item])
                    else return filterOptions[item].includes(pr['screenDimension'])
                })
                reset = false
            }
        })
        if (reset == true)
            setProductList(_productList)
        else
            setProductList(newProductList)
    }

    const handleFilter = (value) => {
        let newFilterOptions = Object.assign({}, filterOptions);  // Shallow copy for the reference value as object
        newFilterOptions[value.name.toLowerCase()] = value.option
        setFilterOptions(newFilterOptions)
    }

    useEffect(() => {
        Filter()
    }, [filterOptions, currentFeature])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
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
        return () => {
            setProductList({})
        }
    }, [])

    const handleFeatureChosen = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentFeature(
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Stack sx={{ width: '100%', height: '100%' }}>
                <NavBar ></NavBar>
                <Stack sx={{ pt: 2, pl: 2 }}>
                    <BreadCrumb />
                </Stack>
                <Grid container sx={{ width: '100%', height: '100%', mt: 2 }} spacing={2}>
                    <Grid item xs={3} sx={{ p: 2, backgroundColor: '#C69AD9' }}>
                        <FilterColumn handleFeatureChosen={handleFeatureChosen} product={_productList} handleFilter={handleFilter} />
                    </Grid>
                    <Grid item xs={9} sx={{ p: 2 }}>
                        <Stack>
                            {
                                productList.length > 0 &&
                                <Stack SX={{width:'100%'}}>
                                    <SearchBar productList={productList} />
                                </Stack>
                            }
                            <Typography variant="h6" fontWeight={'bold'} sx={{ alignSelf: 'center', m: 1 }}>Our Product</Typography>
                            <Box sx={{ backgroundColor: '#C69AD9', height: 5, width: '100%' }}></Box>
                            <Stack direction={"row"} flexWrap={"wrap"} sx={{ alignSelf: 'center', m: 2, justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    productList.length > 0 &&
                                    productList.map((item, i) => (
                                        <ProductItem key={i} product={item} ></ProductItem>
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Grid>
                    <SnackBarAlert severity='success' open={openSuccessAlert} handleClose={handleClose} message={messageSuccess} />
                    <SnackBarAlert severity='error' open={openErrorAlert} handleClose={handleClose} message={messageError} />
                </Grid>
            </Stack>
        </div >
    )
}

export default ProductSpace;