import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Stack } from '@mui/material'
import { useDispatch } from "react-redux";
import { editProduct } from "../../../redux/slices/productSlice";


const EditProduct = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const product = location.state
    const dispatch = useDispatch()

    const SaveChange = () => {
        dispatch(editProduct(product))
            .unwrap()
            .then((originalPromiseResult) => {
                console.log(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log("Error load product")
            })
    }
    return (
        <Stack
            sx={{
                height: 'auto',
                backgroundColor: 'red',
                position: 'relative',
                padding: '2%',
            }}>
            <p>{product.name}</p>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Button onClick={SaveChange}>Save</Button>
        </Stack>
    )
}

export default EditProduct;