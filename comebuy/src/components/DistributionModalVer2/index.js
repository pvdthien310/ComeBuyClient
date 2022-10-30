/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import Box from '@mui/material/Box';
import { Backdrop, CircularProgress, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WarningIcon from '@mui/icons-material/Warning';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import TextFieldForAdd from '../TextFieldForAdd';

import style from './style';
import { getProdInStockByBranchId } from '../../redux/slices/stockSlice';
import SnackBarAlert from '../SnackBarAlert/index';
import { doDistribution } from '../../redux/slices/requestSlice';
import requestProdApi from '../../api/requestProductAPI';

export default function DistributionModalVer2(prop) {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [Error, setError] = useState({
        isError: false,
        message: 'No Error',
    });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: '',
    });

    React.useEffect(() => {
        const handleBranchChange = async () => {
            const action = await dispatch(getProdInStockByBranchId(prop.currentMainBranchId));
            const result = unwrapResult(action);
            setProductList(result);
        };
        if (productList.length === 0) {
            handleBranchChange();
        }
    }, []);

    const handleAddProduct = async () => {
        if (selectedProduct === null) {
            setError({ isError: true, message: 'Please select product to distribute' });
        } else if (amount <= 0) {
            setError({ isError: true, message: 'Invalid amount' });
        } else {
            setError({ isError: false, message: '' });
            setOpenBackdrop(true);
            const params = {
                mainBranchId: prop.currentMainBranchId,
                revievedBranchId: prop.branchId,
                productId: selectedProduct.productid,
                amount: Number(amount),
                userID: prop.user.userID,
                role: prop.user.role,
            };
            let result = {};
            if (prop.type === 'single') {
                await requestProdApi.doDistribution(params).then((data) => {
                    result = data.data;
                });
            } else {
                await requestProdApi.doDistributionToAllBranch(params).then((data) => {
                    result = data.data;
                });
            }
            setOpenBackdrop(false);
            setAlert({
                ...alert,
                open: true,
                message: result.messageexc,
                severity: result.isdone ? 'success' : 'error',
            });
        }
    };

    const onChangeProd = (e) => {
        setSelectedProduct(e.target.value);
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
                        {prop.type === 'single' ? 'Provide product to branch' : 'Provide product to all'}
                    </Typography>
                    <Box sx={{ height: 5, backgroundColor: '#2e1534', width: '100%', mt: 1, mb: 1, borderRadius: 5 }} />
                    <FormControl sx={{ mt: 1, mb: 1, width: '100%' }} size="small">
                        <InputLabel id="demo-select-small">Select product</InputLabel>
                        <Select value={selectedProduct} label="Select product" onChange={(e) => onChangeProd(e)}>
                            {productList?.map((item) => (
                                <MenuItem key={item.productID} value={item}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdrop}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
            <SnackBarAlert
                open={alert.open}
                handleClose={() => setAlert({ ...alert, open: false })}
                severity={alert.severity}
                message={alert.message}
            />
        </div>
    );
}
