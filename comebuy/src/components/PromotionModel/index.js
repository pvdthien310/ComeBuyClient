/* eslint-disable operator-linebreak */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { Stack, Grid, Backdrop, CircularProgress } from '@mui/material';
import TextFieldForAdd from '../TextFieldForAdd';
import ProductSelectV3 from '../ProductSelectV3';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    maxHeight: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
};

function PromotionModal(props) {
    const [amount, SetAmount] = useState(0);
    const [Error, SetError] = useState({
        isError: false,
        message: 'No Error',
    });
    const [selectedProductList, SetSelectedProductList] = useState([]);
    const [selectedProduct, SetSelectedProduct] = useState(undefined);
    const [loading, SetLoading] = useState(false);

    const AddSelectedProductToList = () => {
        if (
            selectedProductList !== undefined &&
            selectedProductList.findIndex((item) => item.productid === selectedProduct.productid) < 0
        ) {
            SetSelectedProductList((prev) => [...prev, selectedProduct]);
        }
    };

    const resetValue = () => {
        SetAmount(0);
        SetSelectedProduct(undefined);
        SetSelectedProductList([]);
        SetError({
            isError: false,
            message: '',
        });
        SetLoading(false);
    };

    const UpdatePromotion = async () => {
        SetLoading(true);
        if (amount === 0 || selectedProductList.length === 0) {
            SetError({
                isError: true,
                message: 'Please fill full information!',
            });
            return;
        }
        await props.addNewPack(amount, selectedProductList);
        resetValue();
    };

    return (
        <div>
            <Modal open={props.open} onClose={props.onClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Create New Discount Pack
                    </Typography>
                    <Box sx={{ height: 5, backgroundColor: '#2e1534', width: '100%', mt: 1, mb: 1, borderRadius: 5 }} />
                    <Typography sx={{ mb: 2 }}>Please fill in the information.</Typography>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={4}>
                            <TextFieldForAdd
                                inputConfig="number"
                                Icon={<AddShoppingCartIcon />}
                                Text={amount}
                                Title="Discount Percent"
                                onChange={(event) => {
                                    if (event.target.value >= 100 || event.target.value <= 0) {
                                        SetError({
                                            isError: true,
                                            message: 'Discount Value is not over 100 and under 0',
                                        });
                                    } else {
                                        SetAmount(event.target.value);
                                        SetError({
                                            isError: false,
                                            message: '',
                                        });
                                    }
                                }}
                            />
                            {Error.isError && (
                                <Stack direction="row" spacing={2} sx={{ margin: 1 }}>
                                    <WarningIcon sx={{ color: 'red' }} />
                                    <Typography sx={{ color: 'red' }}>{Error.message}</Typography>
                                </Stack>
                            )}
                        </Grid>
                        <Grid item xs={8}>
                            <Stack direction="row">
                                <ProductSelectV3
                                    sx={{ mb: 2 }}
                                    onChange={(e, value) => {
                                        SetSelectedProduct(value);
                                    }}
                                    SetError={SetError}
                                />
                                <Button disabled={selectedProduct === undefined} onClick={AddSelectedProductToList}>
                                    Add
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    {selectedProductList.length > 0
                        ? selectedProductList.map((item) => <p key={item.productid}>{item.name}</p>)
                        : null}
                    <Button
                        disabled={Error.isError === true || selectedProductList.length <= 0}
                        onClick={UpdatePromotion}
                    >
                        Submit
                    </Button>
                    <Backdrop open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    );
}
export default PromotionModal;
