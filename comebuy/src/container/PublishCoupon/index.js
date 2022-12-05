/* eslint-disable no-unused-vars */
import * as React from 'react';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DiscountIcon from '@mui/icons-material/Discount';
import { useEffect, useState } from 'react';
import { Button, Stack, styled, Typography, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router';
import { ConfirmDialog, CouponInfoPopUp, CouponStatus } from '../../components';
import SnackBarAlert from '../../components/SnackBarAlert';
import couponAPI from '../../api/couponAPI';

import style from './style';

const ProductTable = styled(DataGrid)(() => ({
    height: '100%',
    width: 1200,
    alignSelf: 'center',
    backgroundColor: '#F9F7FC',
}));

function PublishCoupon() {
    const navigate = useNavigate();
    const [couponList, setCouponList] = useState([]);

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [messageError, setMessageError] = useState('No Error');
    const [messageSuccess, setMessageSuccess] = useState('Notification');
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const [filter, setFilter] = useState({
        couponStatus: 'all',
        couponType: 'all',
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
        setOpenConfirmDialog(false);
    };
    async function LoadData() {
        try {
            const data = await couponAPI.getCouponData(filter);
            if (data.status === 200) {
                setCouponList(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        LoadData();
    }, []);

    // const handleDeleteUser = async () => {
    //     if (selectedAccount.row.role === 'customer' || selectedAccount.row.role === 'admin') {
    //         setMessageError('you are not allowed to deleted Customers account or Admin :((');
    //         setOpenErrorAlert(true);
    //         handleClose();
    //         return;
    //     }

    //     const response = await accountApi.deleteAccount(selectedAccount.id);
    //     if (response.status === 200) {
    //         /// Type this to set new vlue for state
    //         setAccountList((prevList) => prevList.filter((item) => item.userID !== selectedAccount.id));
    //         setMessageSuccess('Delete Account Successfully');
    //         setOpenSuccessAlert(true);
    //         handleClose();
    //     } else {
    //         console.log('error');
    //         setMessageError('Delete Account Failed :((');
    //         setOpenErrorAlert(true);
    //         handleClose();
    //     }
    // };

    const deleteUser = React.useCallback(
        (value) => async () => {
            setSelectedCoupon(value);
            setOpenConfirmDialog(true);
        },
        [],
    );

    const changeCouponStatus = (couponId) => {
        console.log(couponId);
    };

    const columns = React.useMemo(
        () => [
            {
                field: 'editable',
                type: 'actions',
                headerName: 'Edit',
                width: 50,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon color="primary" />}
                        label="Edit"
                        onClick={deleteUser(params)}
                    />,
                ],
            },
            {
                field: 'couponid',
                headerName: 'Coupon',
                width: 250,
                renderCell: (params) => <CouponInfoPopUp coupon={params.row} />,
            },
            {
                field: 'active',
                headerName: 'Status',
                width: 150,
                renderCell: (params) => (
                    <CouponStatus coupon={params.row} handleChangeStatus={(couponId) => changeCouponStatus(couponId)} />
                ),
            },
            {
                field: 'validdate',
                headerName: 'Valid Date',
                width: 150,
                renderCell: (params) => (
                    <Typography sx={{ fontSize: '14px' }}>{params.row.dateValid.substring(0, 10)}</Typography>
                ),
            },
            {
                field: 'expireddate',
                headerName: 'Expired Date',
                width: 150,
                renderCell: (params) => (
                    <Typography sx={{ fontSize: '14px', color: 'red' }}>
                        {params.row.dateExpired.substring(0, 10)}
                    </Typography>
                ),
            },
            {
                field: 'usedCount',
                headerName: 'Used Count',
                width: 150,
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: '14px' }}>{params.row.usedCount}</Typography>
                    </Box>
                ),
            },
            {
                field: 'discount',
                type: 'actions',
                headerName: 'Discount',
                width: 150,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DiscountIcon color="secondary" />}
                        label="See discount"
                        onClick={deleteUser(params)}
                    />,
                ],
            },
            {
                field: 'couponcodes',
                type: 'actions',
                headerName: 'Codes',
                width: 150,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<RemoveRedEyeIcon color="success" />}
                        label="See codes"
                        onClick={deleteUser(params)}
                    />,
                ],
            },
        ],
        [deleteUser],
    );

    return (
        <Stack direction="column" sx={style.container}>
            <Stack sx={style.subContainer}>
                <Stack direction="row" sx={style.thirdStack}>
                    <Stack sx={style.headerStack} direction="row" spacing={2}>
                        <DiscountIcon />
                        <Typography variant="h6">Coupon Manager</Typography>
                    </Stack>
                    <Button sx={style.btnCreateCoupon} onClick={() => navigate('/publishCoupon/create')}>
                        Create Coupon
                    </Button>
                </Stack>
                <Stack spacing={2} sx={style.filterStack}>
                    <Stack direction="row" spacing={2}>
                        <FormControl sx={style.formControl} size="small">
                            <InputLabel sx={style.text} id="demo-select-small">
                                Status
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                sx={style.text}
                                value={filter.status}
                                label="Status"
                                onChange={(e) => setFilter({ ...filter, couponStatus: e.target.value })}
                            >
                                <MenuItem sx={style.text} value="all">
                                    All
                                </MenuItem>
                                <MenuItem sx={style.text} value="active">
                                    Active
                                </MenuItem>
                                <MenuItem sx={style.text} value="inactive">
                                    Inactive
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ ...style.formControl, alignSelf: 'center' }} size="small">
                            <InputLabel sx={style.text} id="demo-select-small-type">
                                Coupon Type
                            </InputLabel>
                            <Select
                                labelId="demo-select-small-type"
                                id="demo-select-small-type"
                                sx={style.text}
                                value={filter.type}
                                label="Coupon Type"
                                onChange={(e) => setFilter({ ...filter, couponType: e.target.value })}
                            >
                                <MenuItem sx={style.text} value="all">
                                    All
                                </MenuItem>
                                <MenuItem sx={style.text} value="singleCode">
                                    Single Code
                                </MenuItem>
                                <MenuItem sx={style.text} value="multiCode">
                                    Multi Code
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
                <ProductTable
                    rowHeight={80}
                    columns={columns}
                    rows={couponList}
                    pagination
                    getRowId={(row) => row.couponId}
                />
                <ConfirmDialog
                    body="Please check the product information again to make sure. This operation cannot be redo. If you are sure, please confirm!"
                    title="Confirm Action?"
                    open={openConfirmDialog}
                    handleClose={handleClose}
                    handleConfirm={() => console.log('Handle delete')}
                />
                <SnackBarAlert
                    severity="error"
                    open={openErrorAlert}
                    handleClose={handleClose}
                    message={messageError}
                />
                <Box sx={{ height: 20 }} />
            </Stack>
        </Stack>
    );
}

export default PublishCoupon;
