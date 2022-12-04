import * as React from 'react';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DiscountIcon from '@mui/icons-material/Discount';
import { useEffect, useState } from 'react';
import { Button, Stack, styled, Typography, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router';
import { ConfirmDialog, UserInfoPopOver } from '../../components';
import accountApi from '../../api/accountAPI';
import SnackBarAlert from '../../components/SnackBarAlert';
import renderAvatar from '../../GridDataCellTemplate/Avatar';
import renderStatus from '../../GridDataCellTemplate/StatusTag';

const ProductTable = styled(DataGrid)(() => ({
    height: 700,
    width: 1200,
    alignSelf: 'center',
    backgroundColor: 'white',
}));

function PublishCoupon() {
    const navigate = useNavigate();
    const [accountList, setAccountList] = useState([]);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [messageError, setMessageError] = useState('No Error');
    const [messageSuccess, setMessageSuccess] = useState('Notification');
    const [selectedAccount, setSelectedAccount] = useState(null);

    const [filter, setFilter] = useState({
        status: 'all',
        type: 'all',
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
        setOpenConfirmDialog(false);
    };
    async function LoadData() {
        try {
            const response = await accountApi.getAll();
            if (response.status === 200) {
                setAccountList(response.data);
                setMessageSuccess('Load Account Successfully');
                setOpenSuccessAlert(true);
            } else {
                setMessageError('Load Account Failed :((');
                setOpenErrorAlert(true);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        LoadData();
    }, []);

    const handleDeleteUser = async () => {
        if (selectedAccount.row.role === 'customer' || selectedAccount.row.role === 'admin') {
            setMessageError('you are not allowed to deleted Customers account or Admin :((');
            setOpenErrorAlert(true);
            handleClose();
            return;
        }

        const response = await accountApi.deleteAccount(selectedAccount.id);
        if (response.status === 200) {
            /// Type this to set new vlue for state
            setAccountList((prevList) => prevList.filter((item) => item.userID !== selectedAccount.id));
            setMessageSuccess('Delete Account Successfully');
            setOpenSuccessAlert(true);
            handleClose();
        } else {
            console.log('error');
            setMessageError('Delete Account Failed :((');
            setOpenErrorAlert(true);
            handleClose();
        }
    };

    const deleteUser = React.useCallback(
        (value) => async () => {
            setSelectedAccount(value);
            setOpenConfirmDialog(true);
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Name',
                width: 250,
                renderCell: (params) => <UserInfoPopOver user={params.row} />,
            },
            {
                field: 'avatar',
                width: 120,
                editable: true,
                renderCell: (params) => renderAvatar(params),
            },
            { field: 'dob', headerName: 'Day of birth', width: 130 },
            {
                field: 'role',
                headerName: 'Role',
                width: 150,
                renderCell: (params) => renderStatus(params),
            },
            {
                field: 'phoneNumber',
                headerName: 'Contact',
                width: 200,
                valueFormatter: (params) => {
                    if (params.value === '') {
                        return 'Have not updated yet';
                    }
                    return params.value;
                },
            },
            {
                field: 'branch',
                headerName: 'Branch',
                width: 350,
                valueFormatter: (params) => {
                    if (params.value == null) {
                        return 'This is not Manager or Not Authorized';
                    }

                    return params.value.address;
                },
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Action',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={deleteUser(params)} />,
                ],
            },
        ],
        [deleteUser],
    );

    return (
        <Stack
            direction="column"
            sx={{
                width: '100%',
                height: '100%',
                justifyItems: 'center',
                alignItems: 'center',
                backgroundColor: 'grey',
                overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                    width: '90%',
                    height: '95%',
                    boxShadow: 10,
                    borderRadius: 3,
                    alignItems: 'center',
                    justifyItems: 'center',
                    backgroundColor: '#D2D5FA',
                }}
            >
                <Stack
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Stack
                        sx={{ alignItems: 'center', justifyItems: 'center', pl: 2, pt: 2 }}
                        direction="row"
                        spacing={2}
                    >
                        <DiscountIcon />
                        <Typography variant="h6">Coupon Manager</Typography>
                    </Stack>
                    <Stack
                        spacing={2}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 7,
                            paddingRight: 7,
                        }}
                    >
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                                <InputLabel sx={{ fontSize: '13px' }} id="demo-select-small">
                                    Status
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    sx={{ fontSize: '13px' }}
                                    value={filter.status}
                                    label="Status"
                                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                >
                                    <MenuItem sx={{ fontSize: '13px' }} value="all">
                                        All
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '13px' }} value="active">
                                        Active
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '13px' }} value="inactive">
                                        Inactive
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 2, alignSelf: 'center', minWidth: 120 }} size="small">
                                <InputLabel sx={{ fontSize: '13px' }} id="demo-select-small-type">
                                    Coupon Type
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small-type"
                                    id="demo-select-small-type"
                                    sx={{ fontSize: '13px' }}
                                    value={filter.type}
                                    label="Coupon Type"
                                    onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                                >
                                    <MenuItem sx={{ fontSize: '13px' }} value="all">
                                        All
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '13px' }} value="singleCode">
                                        Single Code
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '13px' }} value="multiCode">
                                        Multi Code
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack
                            sx={{
                                m: 2,
                                paddingRight: 7,
                            }}
                        >
                            <Button
                                sx={{
                                    width: 140,
                                    fontSize: '13px',
                                    backgroundColor: '#2E1534',
                                    color: 'white',
                                    textTransform: 'none',
                                    marginRight: 9,
                                    alignSelf: 'start',
                                    borderRadius: 3,
                                    '&:hover': {
                                        backgroundColor: 'black',
                                        color: 'white',
                                    },
                                }}
                                onClick={() => navigate('/publishCoupon/create')}
                            >
                                Create Coupon
                            </Button>
                        </Stack>
                    </Stack>
                    <ProductTable
                        rowHeight={100}
                        columns={columns}
                        rows={accountList}
                        pagination
                        getRowId={(row) => row.userID}
                    />
                    <ConfirmDialog
                        body="Please check the product information again to make sure. This operation cannot be redo. If you are sure, please confirm!"
                        title="Confirm Action?"
                        open={openConfirmDialog}
                        handleClose={handleClose}
                        handleConfirm={handleDeleteUser}
                    />
                    <SnackBarAlert
                        severity="success"
                        open={openSuccessAlert}
                        handleClose={handleClose}
                        message={messageSuccess}
                    />
                    <SnackBarAlert
                        severity="error"
                        open={openErrorAlert}
                        handleClose={handleClose}
                        message={messageError}
                    />
                    <Box sx={{ height: 20 }} />
                </Stack>
            </Box>
        </Stack>
    );
}

export default PublishCoupon;
