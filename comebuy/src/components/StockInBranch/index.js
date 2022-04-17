import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import stockApi from "../../api/stockAPI"
import SnackBarAlert from "../SnackBarAlert"
import ProductCardInStock from '../ProductCardInStock'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import style from './style.js'
import AddProductInStockModal from '../AddProductInStockModal'

const StockInBranch = (props) => {
    const { branch } = props
    const [stockList, setStockList] = useState([])
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [messageError, setMessageError] = useState("No Error")
    const [messageSuccess, setMessageSuccess] = useState("Notification")

    const handleCloseModel = () => setOpenModal(false)

    useEffect(()=> {
        console.log(stockList)
    },[stockList])

    const handleAddProduct = async (value) => {
        const newStock = {
            totalAmount: value.amount,
            remaining: value.amount,
            branchID: branch.branchID,
            productID: value.product.productID
        }
        const response = await stockApi.createNewStock(newStock)
        if (response.status == 200) {
            LoadData()  /// Using Load data cause response dont have product objects so child components will not function
            setMessageSuccess("Add Stock Successfully")
            setOpenSuccessAlert(true)
        }
        else {
            setMessageError("Add Stock Failed :((")
            setOpenErrorAlert(true)
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);

    };
    async function LoadData() {
        try {
            const response = await stockApi.getAllStockByBranch(branch.branchID)
            if (response.status == 200) {
                setStockList(response.data)
                setMessageSuccess("Load Stock Successfully")
                setOpenSuccessAlert(true)
            }
            else {
                setMessageError("Load Stock Failed :((")
                setOpenErrorAlert(true)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        LoadData()
    }, [])


    return (
        <Box sx={{ height: '30%', width: '100%' }}>
            <Stack>
                <Button sx={style.AddProductButton} startIcon={<AddShoppingCartIcon />} onClick={() => setOpenModal(true)}>Add Product</Button>
                {
                    stockList != undefined && stockList.length > 0 ?
                        <Stack>
                            {
                                stockList.map((item) => (
                                    <ProductCardInStock key={item.id} stock={item} />
                                ))
                            }
                        </Stack>
                        :
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                }
                <AddProductInStockModal stockList={stockList} open={openModal} onClose={handleCloseModel} onSubmit={handleAddProduct} />
                <SnackBarAlert severity='success' open={openSuccessAlert} handleClose={handleClose} message={messageSuccess} />
                <SnackBarAlert severity='error' open={openErrorAlert} handleClose={handleClose} message={messageError} />
            </Stack>
        </Box >
    )
}
export default StockInBranch;