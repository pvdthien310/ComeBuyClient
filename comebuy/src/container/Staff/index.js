import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { renderStatus } from '../../GridDataCellTemplate/StatusTag';
import { renderAvatar } from '../../GridDataCellTemplate/Avatar';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SnackBarAlert from "../../components/SnackBarAlert";
import accountApi from '../../api/accountAPI';
import { Stack, styled } from '@mui/material';


const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'absolute',
    resize: true,
})
const ProductTable = styled(DataGrid)(({ theme }) => ({
    marginTop: 30,
    height: 700,
    width: 1400,
    position: 'relative',
    backgroundColor: 'white',
    alignSelf: 'center'

}));


const Staff = () => {

    const dispatch = useDispatch()
    const [accountList, setAccountList] = useState([])
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState("No Error")
    const [messageSuccess, setMessageSuccess] = useState("Notification")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };

    const LoadData = async () => {
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

    useEffect(async () => {
        await LoadData()
    }, [])

    useEffect(() => {
        console.log(accountList)
    },[accountList])

    const deleteUser = React.useCallback(
        (id) => () => {

        },
        [],
    );

    const toggleAdmin = React.useCallback(
        (id) => async () => {
            const response = await accountApi.updateAccount({
                userID: id,
                name: "Vong Minh Huynh"
            })
            if (response) {
                setAccountList((prevList) => prevList.map((item) => {
                    if (item.userID == response.data.userID)
                        return response.data
                    else return item
                }))
            }
            else console.log("error")
        },
        [],
    );

    const duplicateUser = React.useCallback(
        (id) => () => {
            // setRows((prevRows) => {
            //     const rowToDuplicate = prevRows.find((row) => row.id === id);
            //     return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            // });
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: 'userID', headerName: 'ID', width: 250 },
            {
                field: 'avatar',
                width: 120,
                editable: true,
                renderCell: (params) => (
                    renderAvatar(params)
                )
            },
            { field: 'name', headerName: 'Name', width: 250 },
            { field: 'dob', headerName: 'Day of birth', width: 130 },
            { field: 'sex', headerName: 'Sex', width: 130 },
            { field: 'email', headerName: 'Email', width: 180 },
            {
                field: 'role', headerName: 'Role', width: 150, renderCell: (params) => (
                    renderStatus(params)
                )
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteUser(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<SecurityIcon />}
                        label="Toggle Admin"
                        onClick={toggleAdmin(params.id)}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<FileCopyIcon />}
                        label="Duplicate User"
                        onClick={duplicateUser(params.id)}
                        showInMenu
                    />,
                ],
            },
        ],
        [deleteUser, toggleAdmin, duplicateUser],
    );

    return (
        <Stack direction="column" sx={{
            width: "100%",
            height: "100%",
        }}>
            <BGImg src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <ProductTable
                rowHeight={100}
                columns={columns}
                rows={accountList}
                pagination
                getRowId={(row) => row.userID} />
            <SnackBarAlert severity='success' open={openSuccessAlert} handleClose={handleClose} message={messageSuccess} />
            <SnackBarAlert severity='error' open={openErrorAlert} handleClose={handleClose} message={messageError} />
        </Stack>
    );
}

export default Staff;