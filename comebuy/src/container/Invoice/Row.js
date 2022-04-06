import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { getAll, updateInvoice } from '../../redux/slices/invoiceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import CusInfo from './CusInfo'
import ProdInfo from './ProdInfo'
import IOSSwitch from './IOSSwitch'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Row = (props) => {

    const { row } = props;
    const [open, setOpen] = React.useState(false);

    //for open backdrop
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    //Get customer information
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const openHover = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //Get product information
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const handleProductPopoverOpen = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleProductPopoverClose = () => {
        setAnchorEl2(null);
    };
    const openProductHover = Boolean(anchorEl2);

    //Execute process of managing invoice
    const [disablePaid, setDisablePaid] = React.useState(false)
    const [disableCheck, setDisableCheck] = React.useState(false)

    const [isChecked, setIsChecked] = React.useState(false)

    const [dataForUpdate, setDataForUpdate] = React.useState({
        invoiceID: row.invoiceID,
        moneyReceived: row.moneyReceived,
        total: row.total,
        isChecked: false,
        isPaid: false
    })

    //for snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    React.useEffect(() => {
        if (row.isChecked === true) {
            if (row.isPaid === true) {
                setIsChecked(true)
                setIsPaid(true)
                setDisableCheck(true)
                setDisablePaid(true)
            } else {
                setIsChecked(true)
                setIsPaid(false)
            }
        } else {
            setDisablePaid(true)
        }
        return;
    }, [])

    const [updating, setUpdating] = React.useState(false)

    const [isPaid, setIsPaid] = React.useState(false)

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (updating === true) {
            setOpenBackdrop(true)
        } else {
            setOpenBackdrop(false)
            setOpenSnackbar(true)
        }
    }, [updating])

    const handleClickPaidInvoice = async () => {
        if (isPaid === true) {
            setUpdating(true)
            const temp = {
                ...dataForUpdate,
                isPaid: false,
                moneyReceived: '0'
            }
            try {
                const resultAction = await dispatch(updateInvoice(temp))
                const originalPromiseResult = unwrapResult(resultAction)
                // handle result here
            } catch (rejectedValueOrSerializedError) {
                // handle error here
                //setOpenDialogRegFailed(true)
                console.log(rejectedValueOrSerializedError.message);
            }
            setDataForUpdate(temp)
            setIsPaid(false);
            setUpdating(false)
            setDisablePaid(false)
        } else {
            if (isChecked === false) {
                console.log("Have to check invoice first");
            } else {
                setUpdating(true)
                const temp = {
                    ...dataForUpdate,
                    isPaid: true,
                    moneyReceived: dataForUpdate.total
                }
                try {
                    const resultAction = await dispatch(updateInvoice(temp))
                    const originalPromiseResult = unwrapResult(resultAction)
                    // handle result here
                    console.log(originalPromiseResult);
                } catch (rejectedValueOrSerializedError) {
                    // handle error here
                    //setOpenDialogRegFailed(true)
                    console.log(rejectedValueOrSerializedError.message);
                }
                setUpdating(false)
                setDataForUpdate(temp)
                setIsPaid(true)
                setDisablePaid(true)
                setDisableCheck(true)
            }
        }
    }

    const handleClickCheckInvoice = async () => {
        if (isChecked === true) {
            if (isPaid === true) {
                console.log("Can not");
            } else {
                setUpdating(true)
                const temp = {
                    ...dataForUpdate,
                    isChecked: false,
                }
                try {
                    const resultAction = await dispatch(updateInvoice(temp))
                    const originalPromiseResult = unwrapResult(resultAction)
                    // handle result here
                } catch (rejectedValueOrSerializedError) {
                    // handle error here
                    //setOpenDialogRegFailed(true)
                    console.log(rejectedValueOrSerializedError.message);
                }
                setUpdating(false)
                setIsChecked(false)
                setDisablePaid(true)
            }
        } else {
            setUpdating(true)
            const temp = {
                ...dataForUpdate,
                isChecked: true,
            }
            try {
                const resultAction = await dispatch(updateInvoice(temp))
                const originalPromiseResult = unwrapResult(resultAction)
                // handle result here
                console.log(originalPromiseResult);
            } catch (rejectedValueOrSerializedError) {
                // handle error here
                //setOpenDialogRegFailed(true)
                console.log(rejectedValueOrSerializedError.message);
            }
            setUpdating(false)
            setIsChecked(true)
            setDisablePaid(false)
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon color='error' /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.invoiceID}
                </TableCell>
                <TableCell align="center">
                    <Button
                        aria-describedby={id}
                        onClick={handleClick}
                    >
                        {row.account.userid}
                    </Button>
                    <Popover
                        id={id}
                        open={openHover}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        {/* <Typography sx={{ p: 1 }}>I use Popover.</Typography> */}
                        <CusInfo userID={row.account.userid} />
                    </Popover>
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <TableCell align="center">
                    <FormGroup>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} />}
                            label=""
                            checked={isChecked}
                            disabled={disableCheck}
                            onClick={handleClickCheckInvoice}
                        />
                    </FormGroup>
                </TableCell>
                <TableCell align="center">{dataForUpdate.moneyReceived}</TableCell>
                <TableCell align="center">
                    <FormGroup>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} />}
                            label=""
                            checked={isPaid}
                            disabled={disablePaid}
                            onClick={handleClickPaidInvoice}
                        />
                    </FormGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#BAD6D6', marginLeft: '10%' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h7" style={{ fontWeight: 'bold' }} gutterBottom component="div">
                                Details:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Total price (USD)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.invoiceitem.map((detailsRow) => (
                                        <TableRow key={detailsRow.productid}>
                                            <TableCell component="th" scope="row">
                                                <Typography
                                                    aria-owns={openProductHover ? 'mouse-over-popover' : undefined}
                                                    aria-haspopup="true"
                                                    onMouseEnter={handleProductPopoverOpen}
                                                    onMouseLeave={handleProductPopoverClose}
                                                >
                                                    {detailsRow.productid}
                                                </Typography>
                                                <Popover
                                                    id="mouse-over-popover"
                                                    sx={{
                                                        pointerEvents: 'none',
                                                    }}
                                                    open={openProductHover}
                                                    anchorEl={anchorEl2}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    onClose={handleProductPopoverClose}
                                                    disableRestoreFocus
                                                >
                                                    <ProdInfo productID={detailsRow.productid} />
                                                </Popover>
                                            </TableCell>


                                            <TableCell align="center">{detailsRow.amount}</TableCell>
                                            <TableCell align="center">{detailsRow.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Updated successfully !
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default Row