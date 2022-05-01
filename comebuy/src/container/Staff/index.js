import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { renderStatus } from '../../GridDataCellTemplate/StatusTag';
import { renderAvatar } from '../../GridDataCellTemplate/Avatar';
import { useEffect, useState } from 'react'
import SnackBarAlert from "../../components/SnackBarAlert";
import accountApi from '../../api/accountAPI';
import { Button, Stack, styled } from '@mui/material';
import { ConfirmDialog, UserInfoPopOver } from '../../components';
import { useNavigate } from 'react-router';


const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'absolute',
    resize: true,
})
const ProductTable = styled(DataGrid)(({ theme }) => ({
    height: 700,
    width: 1200,
    position: 'relative',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 50

}));


const Staff = () => {
    const navigate = useNavigate()
    const [accountList, setAccountList] = useState([])
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [messageError, setMessageError] = useState("No Error")
    const [messageSuccess, setMessageSuccess] = useState("Notification")
    const [selectedAccount, setSelectedAccount] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
        setOpenConfirmDialog(false);
    };
    async function LoadData() {
        try {
            const response = await accountApi.getAll()
            if (response.status == 200) {
                setAccountList(response.data)
                setMessageSuccess("Load Account Successfully")
                setOpenSuccessAlert(true)
            }
            else {
                setMessageError("Load Account Failed :((")
                setOpenErrorAlert(true)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        LoadData()
    }, [])

    const handleDeleteUser = async () => {
        if (selectedAccount.row.role == 'customer' || selectedAccount.row.role == 'admin') {
            setMessageError("you are not allowed to deleted Customer's account or Admin :((")
            setOpenErrorAlert(true)
            handleClose()
            return
        }

        const response = await accountApi.deleteAccount(selectedAccount.id)
        if (response.status == 200) {
            /// Type this to set new vlue for state
            setAccountList((prevList) => prevList.filter((item) => (item.userID != selectedAccount.id)))
            setMessageSuccess("Delete Account Successfully")
            setOpenSuccessAlert(true)
            handleClose()
        }
        else {
            console.log("error")
            setMessageError("Delete Account Failed :((")
            setOpenErrorAlert(true)
            handleClose()
        }
    }

    const deleteUser = React.useCallback(
        (value) => async () => {
            setSelectedAccount(value)
            setOpenConfirmDialog(true)
        },
        [],
    );


    const columns = React.useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Name',
                width: 250,
                renderCell: (params) => (
                    <UserInfoPopOver user={params.row} />
                )
            },
            {
                field: 'avatar',
                width: 120,
                editable: true,
                renderCell: (params) => (
                    renderAvatar(params)
                )
            },
            { field: 'dob', headerName: 'Day of birth', width: 130 },
            {
                field: 'role', headerName: 'Role', width: 150, renderCell: (params) => (
                    renderStatus(params)
                )
            },
            {
                field: 'phoneNumber', headerName: 'Contact', width: 200,
                valueFormatter: (params) => {
                    if (params.value == "") {
                        return "Have not updated yet";
                    }
                    return params.value;
                }
            },
            {
                field: 'branch', headerName: 'Branch', width: 350,
                valueFormatter: (params) => {
                    if (params.value == null) {
                        return "This is not Manager or Not Authorized";
                    }

                    return params.value.address;
                }
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Action',
                width: 80,
                getActions: (params) => [
                    // <GridActionsCellItem
                    //     icon={<SecurityIcon />}
                    //     label="Toggle Manager"
                    //     sx={{ display: params.row.role == "staff" ? 'block' : "none" }}
                    //     onClick={toggleAdmin(params.id)}
                    //     showInMenu
                    // />,
                    // <GridActionsCellItem
                    //     icon={<SecurityIcon />}
                    //     label="Toggle Staff"
                    //     sx={{ display: params.row.role == "manager" ? 'block' : "none" }}
                    //     onClick={toggleAdmin(params.id)}
                    //     showInMenu
                    // />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteUser(params)}
                    />,

                    // <GridActionsCellItem
                    //     icon={<FileCopyIcon />}
                    //     label="Duplicate User"
                    //     onClick={duplicateUser(params.id)}

                    // />,
                ],
            },
        ],
        [deleteUser],
    );

    return (
        <Stack direction="column" sx={{
            width: "100%",
            height: "100%",
        }}>
            <BGImg src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <Button sx={{ height: 50, width: 100, backgroundColor:'white', alignSelf: 'end' }} onClick={() => navigate('/staff/add')}>Add Staff</Button>
            <ProductTable
                rowHeight={100}
                columns={columns}
                rows={accountList}
                pagination
                getRowId={(row) => row.userID} />
            <ConfirmDialog
                body="Please check the product information again to make sure. This operation cannot be redo. If you are sure, please confirm!"
                title="Confirm Action?"
                open={openConfirmDialog} handleClose={handleClose} handleConfirm={handleDeleteUser} />
            <SnackBarAlert severity='success' open={openSuccessAlert} handleClose={handleClose} message={messageSuccess} />
            <SnackBarAlert severity='error' open={openErrorAlert} handleClose={handleClose} message={messageError} />
        </Stack>
    );
}

export default Staff;