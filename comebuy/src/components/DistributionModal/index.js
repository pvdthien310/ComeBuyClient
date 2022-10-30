/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from 'react';
import { Stack } from '@mui/material';
import TextFieldForAdd from '../TextFieldForAdd';
import ProductSelect from '../ProductSelect';

import style from './style';
import { getProdInStockByBranchId } from '../../redux/slices/stockSlice';

function DistributionModal(prop) {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [Error, setError] = useState({
        isError: false,
        message: 'No Error',
    });

    React.useEffect(() => {
        const handleBranchChange = async () => {
            console.log('day ne: ', prop.currentMainBranchId);
            const action = await dispatch(getProdInStockByBranchId(prop.currentMainBranchId));
            const result = unwrapResult(action);
            setProductList(result);
        };
        if (productList.length === 0) {
            handleBranchChange();
        }
    }, []);

    const onProductChange = (e, value) => {
        setSelectedProduct(value);
    };
    const handleAddProduct = () => {
        if (selectedProduct != null) {
            prop.closeModal();
        } else if (amount === 0) setError({ isError: true, message: 'Amount is not allowed to equal 0!' });
        else setError({ isError: true, message: 'Please select the product!' });
    };

    return (
        <div>
            <Modal
                open={prop.open}
                onClose={prop.closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.container}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Provide product to branch
                    </Typography>
                    <Box sx={{ height: 5, backgroundColor: '#2e1534', width: '100%', mt: 1, mb: 1, borderRadius: 5 }} />
                    <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                        Fill the information.
                    </Typography>
                    <ProductSelect existedProduct={productList} sx={{ mb: 2 }} onChange={onProductChange} />
                    <TextFieldForAdd
                        inputConfig="number"
                        Icon={<AddShoppingCartIcon />}
                        Text={amount}
                        Title="Amount"
                        onChange={(event) => setAmount(event.target.value)}
                    />
                    {Error.isError && (
                        <Stack direction="row" spacing={2} sx={{ margin: 1 }}>
                            <WarningIcon sx={{ color: 'red' }} />
                            <Typography sx={{ color: 'red' }}>{Error.message}</Typography>
                        </Stack>
                    )}
                    <Button sx={{ justifySelf: 'center' }} onClick={handleAddProduct}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
export default DistributionModal;
