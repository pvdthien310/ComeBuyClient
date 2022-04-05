import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../redux/slices/invoiceSlice';
import { getAccountWithID } from '../../redux/slices/accountSlice';
import { unwrapResult } from '@reduxjs/toolkit';

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
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import Popover from '@mui/material/Popover';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

function CusInfo({ cusID }) {
    const [customer, setCustomer] = React.useState([]);

    const customerID = cusID

    const dispatch = useDispatch()

    React.useEffect(async () => {
        if (customer.length === 0) {
            try {
                const resultAction = await dispatch(getAccountWithID(customerID))
                const originalPromiseResult = unwrapResult(resultAction)
                // handle result here
                setCustomer(originalPromiseResult)
                console.log(originalPromiseResult)
            } catch (rejectedValueOrSerializedError) {
                // handle error here
                //setOpenDialogRegFailed(true)
                console.log(rejectedValueOrSerializedError);
            }
        }
        return () => {
            setCustomer({});
        };
    }, [])

    return (
        <div>
            Helllo
        </div>
    )
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openHover = Boolean(anchorEl);

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
                    <Typography
                        aria-owns={openHover ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        {row.account.userid}
                    </Typography>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={openHover}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        {/* <Typography sx={{ p: 1 }}>I use Popover.</Typography> */}
                        <CusInfo id={row.account.userid} />
                    </Popover>
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <TableCell align="center">
                    <FormGroup>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked={row.isChecked} />}
                            label=""
                        />
                    </FormGroup>
                </TableCell>
                <TableCell align="center">{row.moneyReceived}</TableCell>
                <TableCell align="center">
                    <FormGroup>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked={row.isPaid} />}
                            label=""
                        />
                    </FormGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#BAD6D6' }} colSpan={6}>
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
                                                {detailsRow.productid}
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
        </React.Fragment>
    );
}

const Invoice = () => {

    const [invoiceList, setInvoiceList] = React.useState([])

    const dispatch = useDispatch();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(async () => {
        if (invoiceList.length === 0) {
            try {
                const resultAction = await dispatch(getAll())
                const originalPromiseResult = unwrapResult(resultAction)
                // handle result here
                setInvoiceList(originalPromiseResult)
                console.log(invoiceList)
            } catch (rejectedValueOrSerializedError) {
                // handle error here
                //setOpenDialogRegFailed(true)
                console.log(rejectedValueOrSerializedError);
            }
        }
        return () => {
            setInvoiceList({});
        };
    }, [])


    return (
        <div>
            <TableContainer style={{ backgroundColor: 'white', padding: '4%', borderRadius: '5%' }} component={Paper}>
                <Typography style={{ marginLeft: '35%', marginBottom: '2%', fontWeight: 'bold', fontSize: '30px' }}>INVOICE MANAGEMENT</Typography>
                <Table aria-label="collapsible table">
                    <TableHead style={{ backgroundColor: '#B7C3C7' }}>
                        <TableRow>
                            <TableCell />
                            <TableCell>Invoice ID</TableCell>
                            <TableCell align="center">Customer ID</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Total&nbsp;(USD)</TableCell>
                            <TableCell align="center">Is Checked ?</TableCell>
                            <TableCell align="center">Recieved&nbsp;(USD)</TableCell>
                            <TableCell align="center">Is Paid ?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoiceList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <Row key={row.invoiceID} row={row} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={invoiceList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}
export default Invoice;