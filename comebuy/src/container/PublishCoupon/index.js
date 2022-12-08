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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router';
import { ConfirmDialog, CouponInfoPopUp, CouponStatus, DiscountInfoModal } from '../../components';
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
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [openModalDiscount, setOpenModalDiscount] = useState(false);
    const [filter, setFilter] = useState({
        couponStatus: 'all',
        couponType: 'all',
    });

    const handleCloseDiscountModal = () => setOpenModalDiscount(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert({
            ...alert,
            open: false,
        });
        setOpenConfirmDialog(false);
    };
    async function LoadData() {
        setCouponList([]);
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

    const deleteCoupon = React.useCallback(
        (value) => async () => {
            setSelectedCoupon(value.id);
            setOpenConfirmDialog(true);
        },
        [],
    );

    const getDiscountInfo = React.useCallback(
        (value) => async () => {
            setSelectedCoupon(value.row);
            setOpenModalDiscount(true);
        },
        [],
    );

    const handleDeleteCoupon = async () => {
        setOpenConfirmDialog(false);
        setOpenBackdrop(true);
        await couponAPI
            .deleteOneCoupon(selectedCoupon)
            .then((data) => {
                if (data.status === 200) {
                    setOpenBackdrop(false);
                    setAlert({
                        ...alert,
                        open: true,
                        message: 'Deleted coupon successful',
                        severity: 'success',
                    });
                    LoadData();
                }
            })
            .catch((err) => {
                setOpenBackdrop(false);
                setAlert({
                    ...alert,
                    open: true,
                    message: 'Deleted coupon failed',
                    severity: 'error',
                });
            });
    };

    const changeCouponStatus = async (coupon) => {
        try {
            setOpenBackdrop(true);
            const params = {
                couponId: coupon.couponId,
                active: !coupon.active,
            };
            await couponAPI.updateStatusCoupon(params).then((data) => {
                if (data.status === 200) {
                    setOpenBackdrop(false);
                    setAlert({
                        ...alert,
                        open: true,
                        message: 'Update coupon successful',
                        severity: 'success',
                    });
                }
            });
        } catch (err) {
            setOpenBackdrop(false);
            setAlert({
                ...alert,
                open: true,
                message: 'Coupon active failed. Please  try again',
                severity: 'error',
            });
        }
    };

    useEffect(() => {
        LoadData();
    }, [filter]);

    const columns = React.useMemo(
        () => [
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
                    <CouponStatus coupon={params.row} handleChangeStatus={(coupon) => changeCouponStatus(coupon)} />
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
                        onClick={getDiscountInfo(params)}
                    />,
                ],
            },
            {
                field: 'delete',
                type: 'actions',
                headerName: 'Action',
                width: 100,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteForeverIcon color="error" />}
                        label="Delete"
                        onClick={deleteCoupon(params)}
                    />,
                ],
            },
        ],
        [deleteCoupon],
        [getDiscountInfo],
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
                    body="Do you want to delete this coupon out of system ?"
                    title="Confirm Deletion?"
                    open={openConfirmDialog}
                    handleClose={handleClose}
                    handleConfirm={() => handleDeleteCoupon()}
                />
                <SnackBarAlert
                    severity={alert.severity}
                    open={alert.open}
                    handleClose={handleClose}
                    message={alert.message}
                />
                <Box sx={{ height: 20 }} />
            </Stack>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <DiscountInfoModal
                handleCloseDiscountModal={handleCloseDiscountModal}
                openDiscountModal={openModalDiscount}
                discount={selectedCoupon?.discount[0]}
            />
        </Stack>
    );
}

export default PublishCoupon;
