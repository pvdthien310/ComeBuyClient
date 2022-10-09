/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { moment } from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { createFilterOptions } from '@mui/material/Autocomplete';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { IconButton, Stack, TextField, Grid, Badge } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import style from './style';
import { getAllProduct } from '../../redux/slices/productSlice';
import { currentUser, productListSelector } from '../../redux/selectors';
import { getAllBranch } from '../../redux/slices/branchSlice';
import ProductSelectV2 from '../ProductSelectV2';
import BranchSelectV2 from '../BranchSelectV2';
import { getProdInStockByBranchId } from '../../redux/slices/stockSlice';
import SnackBarAlert from '../SnackBarAlert';
import ReqProdItem from '../ReqProdItem';
import requestProdApi from '../../api/requestProductAPI';

const filter = createFilterOptions();

function CreateProdReqModal(prop) {
    const dispatch = useDispatch();
    const _currentUser = useSelector(currentUser);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState('');
    const [productList, setProductList] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentBranch, setCurrentBranch] = useState(null);
    const [branchList, setBranchList] = useState([]);
    const [request, setRequest] = useState({
        total: 0,
        listProReq: [],
        timeRequest: '',
        fromBranchId: '',
        toBranchId: '',
        message: '',
        userID: '',
        role: '',
    });
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });
    const handleCloseSnackbar = () => {
        setAlert({ ...alert, open: false });
    };
    const handleCloseBackdrop = () => setOpenBackdrop(false);

    React.useEffect(() => {
        const loadProd = async () => {
            const action = await dispatch(getAllProduct());
            const result = unwrapResult(action);
            setProductList(result);
        };
        if (productList.length === 0) {
            loadProd();
        }
        const loadBranch = async () => {
            const action = await dispatch(getAllBranch());
            const result = unwrapResult(action);
            setBranchList(result);
        };
        if (branchList.length === 0) {
            loadBranch();
        }
    }, []);

    const resetReq = () => {
        setRequest({
            total: 0,
            listProReq: [],
            timeRequest: '',
            fromBranchId: '',
            toBranchId: '',
            message: '',
        });
    };

    React.useEffect(() => {
        const handleBranchChange = async () => {
            resetReq();
            const action = await dispatch(getProdInStockByBranchId(currentBranch.branchID));
            const result = unwrapResult(action);
            setProductList(result);
        };
        handleBranchChange();
    }, [currentBranch]);

    React.useEffect(() => {
        const createReq = async () => {
            try {
                await requestProdApi.createReq(request).then((data) => {
                    request.listProReq.map((item) => {
                        const temp = {
                            requestProductId: data.data.requestProductId,
                            productID: item.productID,
                            quantity: item.quantity,
                        };
                        requestProdApi.createReqItem(temp);
                    });
                    handleCloseBackdrop();
                    handleReset();
                    setAlert({
                        ...alert,
                        open: true,
                        severity: 'success',
                        message: 'Create request successfully. Please wait until they response',
                    });
                });
            } catch (error) {
                handleCloseBackdrop();
                setAlert({
                    ...alert,
                    open: true,
                    severity: 'error',
                    message: 'Create request failed.',
                });
            }
        };
        if (openBackdrop) {
            createReq();
        }
    }, [openBackdrop]);

    const onProductChange = (e, value) => {
        setCurrentProduct(value.props.value.productid);
    };

    const onBranchChange = (e, value) => {
        setCurrentBranch({
            ...currentBranch,
            branchID: value.props.value,
        });
    };

    const handleAdd = () => {
        if (quantity <= 0) {
            setAlert({
                ...alert,
                open: true,
                severity: 'error',
                message: 'Check quantity',
            });
        } else {
            const temp = {
                productID: currentProduct,
                quantity,
            };
            setRequest({
                ...request,
                listProReq: [...request.listProReq, temp],
            });
            setCurrentProduct(null);
            setQuantity(0);
        }
    };

    const handleDeleteItem = (e) => {
        const temp = request.listProReq;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] === e) {
                temp.splice(i, 1);
            }
        }
        setRequest({ ...request, listProReq: temp });
    };

    const handleReset = () => {
        resetReq();
        setQuantity(0);
        setMessage('');
        setProductList([]);
        setCurrentBranch(null);
        setCurrentProduct(null);
    };

    const handleStartReq = async () => {
        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        const timeRequest = `${date} ${time}`;
        let total = 0;
        request.listProReq.map((i) => {
            total += Number(i.quantity);
        });
        setRequest({
            ...request,
            timeRequest,
            fromBranchId: _currentUser.branch.branchid,
            toBranchId: currentBranch.branchID,
            total,
            message,
            userID: _currentUser.userID,
            role: _currentUser.role,
        });
        setOpenBackdrop(true);
    };

    return (
        <div>
            <Modal open={prop.open} onClose={prop.closeModal}>
                <Box sx={style.container}>
                    <Stack direction="column" width="100%">
                        <Stack direction="row" sx={{ width: '100%', flexDirection: 'space-between' }}>
                            <Stack direction="row" spacing={1} width="100%" alignSelf="flex-start">
                                <InfoIcon color="primary" />
                                <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                                    One request to only one branch
                                </Typography>
                            </Stack>
                            <Stack width="100%">
                                <IconButton onClick={prop.closeModal} sx={{ alignSelf: 'flex-end' }}>
                                    <HighlightOffRoundedIcon color="error" />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignContent="center"
                            flexDirection="flex-start"
                            width="100%"
                        >
                            <BranchSelectV2
                                value={currentBranch}
                                branchList={branchList}
                                onChangeBranch={onBranchChange}
                            />
                            <ProductSelectV2
                                value={currentProduct}
                                productList={productList}
                                onChangeProduct={onProductChange}
                            />
                            <FormControl sx={{ maxWidth: 100 }} size="small">
                                <TextField
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                    size="small"
                                    label="Quantity"
                                />
                            </FormControl>
                            <Button
                                onClick={handleReset}
                                sx={{ textTransform: 'none' }}
                                variant="outlined"
                                color="error"
                            >
                                Reset
                            </Button>
                            <Button
                                onClick={handleAdd}
                                sx={{ textTransform: 'none' }}
                                variant="outlined"
                                color="primary"
                            >
                                Add
                            </Button>
                        </Stack>
                        <div style={style.lastLine} />
                        <Stack direction="row" spacing={1} width="100%">
                            <Grid container sx={style.wrapper}>
                                <Grid item xs={7} sx={{ p: 1, pl: 2 }}>
                                    <Typography sx={style.titleList}>List product request:</Typography>
                                    <Stack sx={style.stackContent} direction="column" spacing={1.5}>
                                        {request.listProReq?.map((item) => (
                                            <ReqProdItem onClick={() => handleDeleteItem(item)} info={item} />
                                        ))}
                                    </Stack>
                                </Grid>
                                <Grid item xs={5} sx={{ p: 4, width: '100%' }}>
                                    <Grid>
                                        <TextareaAutosize
                                            onChange={(e) => setMessage(e.target.value)}
                                            minRows={2}
                                            placeholder="Request message..."
                                            style={style.textArea}
                                        />
                                    </Grid>
                                    <Grid width="100%" alignContent="center">
                                        <Button
                                            onClick={handleStartReq}
                                            sx={style.btnStart}
                                            variant="outlined"
                                            color="success"
                                        >
                                            Start request
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                        onClick={handleCloseBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
            <SnackBarAlert
                open={alert.open}
                handleClose={handleCloseSnackbar}
                severity={alert.severity}
                message={alert.message}
            />
        </div>
    );
}
export default CreateProdReqModal;
