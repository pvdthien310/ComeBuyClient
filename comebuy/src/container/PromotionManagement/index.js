/* eslint-disable operator-linebreak */
import { Typography } from '@material-ui/core';
import { Grid, Stack, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import productAPI from '../../api/productAPI';
import { SnackBarAlert } from '../../components';
import ProductItemV2 from '../../components/ProductItemV2';
import PromotionModal from '../../components/PromotionModel';
import PromotionPack from '../../components/PromotionPack';
import style from './style';

function PromotionManagement() {
    const [pack, SetPack] = useState([]);
    const [selectedPack, SetSelectedPack] = useState(undefined);
    const [loading, SetLoading] = useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState('No Error');
    const [messageSuccess, setMessageSuccess] = useState('Notification');
    const [openModel, SetOpenModel] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };

    const loadPack = async () => {
        SetLoading(true);
        const response = await productAPI.getPromotionPack();
        if (response.status === 200) {
            SetLoading(false);
            SetPack(response.data);
        } else {
            SetLoading(false);
            console.log('error load promotion pack');
        }
    };
    const AddNewPack = async (amount, selectedProductList) => {
        const response = await productAPI.updatePromotion(
            amount,
            selectedProductList.map((item) => item.productid),
        );
        if (response.status === 200) {
            SetOpenModel(false);
            setOpenSuccessAlert(true);
            setMessageSuccess('Add New Pack Successfully');
        } else {
            console.log('System Error, cannt add discount pack');
            SetOpenModel(false);
            setOpenErrorAlert(true);
            setMessageError('Error whiling Add New Pack');
        }
        await loadPack();
    };

    const DeletePack = async (deletedPack) => {
        const response = await productAPI.updatePromotion(0, deletedPack.productids);
        if (response.status === 200) {
            SetOpenModel(false);
            setOpenSuccessAlert(true);
            setMessageSuccess('Delete Successfully');
        } else {
            console.log('System Error, can not delete discount pack');
            SetOpenModel(false);
            setOpenErrorAlert(true);
            setMessageError('Error whiling Delet Pack');
        }
        await loadPack();
        if (selectedPack.promotion === deletedPack.promotion) SetSelectedPack(undefined);
        console.log('delete pack');
    };

    useEffect(async () => {
        await loadPack();
    }, []);

    return (
        <Grid container direction="row" flex spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={6} sx={{ height: '100%' }}>
                <Stack sx={{ height: '100%', padding: 3 }}>
                    <Stack flexDirection="row" sx={{ justifyContent: 'space-between' }}>
                        <Typography fontWeight="bold">Discount Pack</Typography>
                        <Button sx={style.newButton} onClick={() => SetOpenModel(true)}>
                            New
                        </Button>
                    </Stack>
                    {loading && <CircularProgress color="inherit" />}
                    {pack.length > 0 &&
                        pack.map((item) => (
                            <PromotionPack
                                key={item.promotion}
                                pack={item}
                                deletePack={DeletePack}
                                showPackItem={(selectedPack_) => SetSelectedPack(selectedPack_)}
                            />
                        ))}
                </Stack>
            </Grid>
            <Grid item xs={6} sx={{ height: '100%' }}>
                <Stack sx={{ height: '100%', padding: 3 }}>
                    <Typography fontWeight="bold">Product In Pack</Typography>
                    {selectedPack !== undefined &&
                        selectedPack.productids.map((item) => <ProductItemV2 productid={item} />)}
                </Stack>
            </Grid>
            <PromotionModal
                open={openModel}
                onClose={() => SetOpenModel(false)}
                addNewPack={(amount, list) => {
                    AddNewPack(amount, list);
                }}
            />
            <SnackBarAlert
                severity="success"
                open={openSuccessAlert}
                handleClose={handleClose}
                message={messageSuccess}
            />
            <SnackBarAlert severity="error" open={openErrorAlert} handleClose={handleClose} message={messageError} />
        </Grid>
    );
}

export default PromotionManagement;
