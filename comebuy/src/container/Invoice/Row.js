import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../redux/slices/invoiceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import CusInfo from './CusInfo'
import ProdInfo from './ProdInfo'
import IOSSwitch from './IOSSwitch'

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
import Button from '@mui/material/Button';


const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

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
        </React.Fragment>
    );
}

export default Row