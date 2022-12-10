/* eslint-disable prefer-const */
/* eslint-disable operator-linebreak */
import { Button, Typography, Grid, Stack, TextField, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Box from '@mui/material/Box';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InfoIcon from '@mui/icons-material/Info';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import TextFieldForAdd from '../../../components/TextFieldForAdd';
import SnackBarAlert from '../../../components/SnackBarAlert';
import style from './style.js';
import couponAPI from '../../../api/couponAPI';

function CreateCoupon() {
    const [params, setParams] = useState({
        name: '',
        description: '',
        isMultiCode: 'single',
        validDate: new Date(),
        expiredDate: new Date(),
        discountType: 'minTotal',
        limitUses: 1,
        limitAccountUses: 1,
        valueType: 'percent',
        minTotal: 0,
        numOfCode: 1,
        discountValue: 1,
    });
    const [discountCodes, setDiscountCodes] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: '',
    });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => setOpenBackdrop(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleCloseConfirm = () => setOpenConfirm(false);
    const navigate = useNavigate();

    const handleCloseAlert = () => setAlert({ ...alert, open: false });
    const handleChangeCouponType = (event) => {
        setParams({ ...params, isMultiCode: event.target.value });
    };

    const generateCode = () => {
        if (params.isMultiCode === 'multi' && params.numOfCode <= 1) {
            setAlert({
                ...alert,
                open: true,
                message: 'Multi Code should have over one code',
                severity: 'warning',
            });
        } else {
            const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
            const num = params.isMultiCode === 'multi' ? params.numOfCode : 1;
            setDiscountCodes([]);
            let temp = [];
            for (let i = 1; i <= num; i++) {
                const randomArray = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]);
                const randomString = randomArray.join('');
                console.log(randomString);
                temp.push(randomString);
            }
            setDiscountCodes(temp);
        }
    };

    const checkingParams = () => {
        if (params.name === '' || params.description === '') {
            setAlert({
                ...alert,
                open: true,
                message: 'Please fill information',
                severity: 'warning',
            });
        } else if (params.expiredDate < params.validDate) {
            setAlert({
                ...alert,
                open: true,
                message: 'Expired date should be proper with valid date',
                severity: 'warning',
            });
        } else if (
            params.limitUses <= 0 ||
            params.limitAccountUses <= 0 ||
            params.limitAccountUses > params.limitUses
        ) {
            setAlert({
                ...alert,
                open: true,
                message: 'Check limit information. Limit account uses should be under limit use',
                severity: 'warning',
            });
        } else if (discountCodes.length === 0) {
            setAlert({
                ...alert,
                open: true,
                message: 'Generate codes for this coupon before this creation',
                severity: 'warning',
            });
        } else {
            setOpenConfirm(true);
        }
    };

    const resetForm = () => {
        window.location.reload();
    };

    const handleStartCreateCoupon = async () => {
        const request = {
            ...params,
            validDate: params.validDate.toISOString().substring(0, 10),
            expiredDate: params.expiredDate.toISOString().substring(0, 10),
            discountCodes,
        };
        setOpenConfirm(false);
        setOpenBackdrop(true);
        await couponAPI.createCoupon(request).then((res) => {
            handleCloseBackdrop();
            setAlert({
                ...alert,
                open: 'open',
                message: res.data === 'DONE' ? 'Created coupon successfully' : 'Failed to create coupon',
                severity: res.data === 'DONE' ? 'success' : 'error',
            });
            resetForm();
        });
    };

    return (
        <Stack sx={style.boxContainer}>
            <Box sx={style.boxInfor}>
                <Stack direction="row" spacing={1} padding={1} sx={style.boxInfor_Stack}>
                    <LocalOfferIcon />
                    <Typography variant="h6" fontWeight="bold">
                        Create Coupon
                    </Typography>
                </Stack>
                <Grid container>
                    <Grid item xs={12} paddingLeft={2}>
                        <Stack xs={12} spacing={2} padding={2}>
                            <TextFieldForAdd
                                inputConfig="text"
                                Icon={<DriveFileRenameOutlineIcon />}
                                Text={params.name}
                                Title="Name"
                                onChange={(e) => setParams({ ...params, name: e.target.value })}
                            />
                            <Box sx={style.boxinfor_Stack_Line} />
                            <TextFieldForAdd
                                inputConfig="text"
                                Icon={<DriveFileRenameOutlineIcon />}
                                Text={params.description}
                                Title="Description"
                                onChange={(e) => setParams({ ...params, description: e.target.value })}
                            />
                            <Box sx={style.boxinfor_Stack_Line} />
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <TextFieldForAdd
                                    inputConfig="number"
                                    Icon={<BorderOuterIcon />}
                                    Text={params.limitUses}
                                    Title="Limit uses"
                                    onChange={(e) => setParams({ ...params, limitUses: e.target.value })}
                                />
                                <TextFieldForAdd
                                    inputConfig="number"
                                    Icon={<BorderOuterIcon />}
                                    Text={params.limitAccountUses}
                                    Title="Limit Account Used"
                                    onChange={(e) => setParams({ ...params, limitAccountUses: e.target.value })}
                                />
                            </Stack>
                            <Box sx={style.boxinfor_Stack_Line} />
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        value={params.validDate}
                                        label="Valid date"
                                        onChange={(newValue) => {
                                            setParams({
                                                ...params,
                                                validDate: newValue,
                                            });
                                        }}
                                        renderInput={(param) => <TextField {...param} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        label="Expired date"
                                        value={params.expiredDate}
                                        onChange={(newValue) => {
                                            setParams({
                                                ...params,
                                                expiredDate: newValue,
                                            });
                                        }}
                                        renderInput={(param) => <TextField {...param} />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Box sx={style.boxinfor_Stack_Line} />
                            <Stack spacing={2} direction="row">
                                <FormControl>
                                    <FormLabel
                                        id="demo-controlled-radio-buttons-group"
                                        sx={{ fontWeight: 'bold', color: 'black' }}
                                    >
                                        Coupon Type
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                        value={params.isMultiCode}
                                        onChange={handleChangeCouponType}
                                    >
                                        <FormControlLabel value="single" control={<Radio />} label="Single Code" />
                                        <FormControlLabel value="multi" control={<Radio />} label="Multi Code" />
                                    </RadioGroup>
                                </FormControl>
                                {params.isMultiCode === 'multi' ? (
                                    <TextField
                                        type="number"
                                        sx={{ alignSelf: 'end' }}
                                        value={params.numOfCode}
                                        size="small"
                                        label="Number of Code"
                                        onChange={(e) => setParams({ ...params, numOfCode: e.target.value })}
                                    />
                                ) : null}
                                {discountCodes.length > 0 ? (
                                    <Stack direction="row" alignSelf="end" spacing={0.5}>
                                        <InfoIcon color="success" />
                                        <Typography sx={style.codeGenInfo}>Codes have been generated.</Typography>
                                    </Stack>
                                ) : (
                                    <Button sx={style.genBtn} onClick={generateCode} size="small" variant="contained">
                                        Generate Code
                                    </Button>
                                )}
                            </Stack>
                            <Box sx={style.boxinfor_Stack_Line} />
                            <Stack spacing={2} direction="row">
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small">Discount Type</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={params.discountType}
                                        label="Discount Type"
                                        onChange={(e) => setParams({ ...params, discountType: e.target.value })}
                                    >
                                        <MenuItem value="minTotal">Min Total</MenuItem>
                                        <MenuItem value="total">Total</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ alignSelf: 'center', minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-type">Value Type</InputLabel>
                                    <Select
                                        labelId="demo-select-small-type"
                                        id="demo-select-small-type"
                                        value={params.valueType}
                                        label="Value Type"
                                        onChange={(e) => setParams({ ...params, valueType: e.target.value })}
                                    >
                                        <MenuItem value="percent">%</MenuItem>
                                        <MenuItem value="cash">Cash (USD)</MenuItem>
                                    </Select>
                                </FormControl>
                                {params.discountType === 'minTotal' && (
                                    <TextField
                                        type="number"
                                        value={params.minTotal}
                                        size="small"
                                        label="Effected Min Total (USD)"
                                        onChange={(e) => setParams({ ...params, minTotal: e.target.value })}
                                    />
                                )}
                                <TextField
                                    type="number"
                                    value={params.discountValue}
                                    size="small"
                                    label="Discount Value"
                                    onChange={(e) => setParams({ ...params, discountValue: e.target.value })}
                                />
                            </Stack>
                            <Box sx={style.boxinfor_Stack_Line} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} paddingLeft={2} paddingTop={2} />
                </Grid>
                <Stack sx={{ width: '100%', justifyContent: 'center' }} direction="row" spacing={3}>
                    <Button sx={style.BackButton} variant="contained" onClick={() => navigate('/publishCoupon')}>
                        Back
                    </Button>
                    <Button sx={style.ResetButton} onClick={resetForm} variant="contained">
                        Reset
                    </Button>
                    <Button sx={style.SaveButton} onClick={checkingParams} variant="contained">
                        Create
                    </Button>
                </Stack>
            </Box>
            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">"Do you want to create this coupon?"</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Coupon is an important thing in shop. Please refer to check information carefully before
                        creating and publish it.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button onClick={handleStartCreateCoupon} autoFocus>
                        Start create
                    </Button>
                </DialogActions>
            </Dialog>
            <SnackBarAlert
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                handleClose={handleCloseAlert}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
                onClick={handleCloseBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Stack>
    );
}

export default CreateCoupon;
