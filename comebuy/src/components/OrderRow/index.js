/* eslint-disable no-confusing-arrow */
// eslint-disable-next-line no-unused-vars
import { useDispatch } from 'react-redux';
import {
    Button,
    IconButton,
    TableRow,
    Collapse,
    Box,
    Typography,
    TableCell,
    Table,
    TableHead,
    TableBody,
} from '@mui/material';
import * as React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popover from '@mui/material/Popover';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ProdInfo from '../InvoiceProdInfo';

const steps = ['Checked', 'Delivered'];

function OrderRow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    // eslint-disable-next-line no-unused-vars
    const [anchorEl, setAnchorEl] = React.useState(null);
    const id = open ? 'simple-popover' : undefined;

    // eslint-disable-next-line no-unused-vars
    const [anchorE3, setAnchorE3] = React.useState(null);
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    // eslint-disable-next-line no-unused-vars
    const handleProductPopoverOpen = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleProductPopoverClose = () => {
        setAnchorEl2(null);
    };
    const openProductHover = Boolean(anchorEl2);

    // eslint-disable-next-line no-unused-vars
    const [disablePaid, setDisablePaid] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [disableCheck, setDisableCheck] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isChecked, setIsChecked] = React.useState(row.isChecked);
    // eslint-disable-next-line no-unused-vars
    const [isPaid, setIsPaid] = React.useState(row.isPaid);
    // eslint-disable-next-line no-unused-vars
    const [dataForUpdate, setDataForUpdate] = React.useState({
        invoiceID: row.invoiceID,
        moneyReceived: row.moneyReceived,
        total: row.total,
        isChecked: row.isChecked,
        isPaid: row.isPaid,
    });

    // eslint-disable-next-line no-unused-vars
    const [updating, setUpdating] = React.useState(false);

    function Total() {
        let total = 0;
        for (let i = 0; i < row.invoiceitem.length; i++) {
            total += Number(row.invoiceitem[i].total);
        }
        return total;
    }

    const [invoiceTotal, setInvoiceTotal] = React.useState(0);

    React.useEffect(() => {
        if (invoiceTotal === 0) {
            setInvoiceTotal(Total());
        }
    }, []);

    const [activeStep, setActiveStep] = React.useState(0);

    React.useEffect(() => {
        let t = false;
        const setActive = () => {
            if (Boolean(row.isChecked) === true) {
                if (Boolean(row.isPaid) === true) {
                    setActiveStep(2);
                } else {
                    setActiveStep(1);
                }
            } else {
                setActiveStep(0);
            }
        };
        if (t === false) {
            setActive();
            t = true;
        }
    }, []);
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'set', backgroundColor: 'white' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        sx={{ backgroundColor: 'white' }}
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon sx={{ color: 'black' }} />
                        ) : (
                            <KeyboardArrowDownIcon sx={{ color: 'black' }} />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">
                    <Typography sx={{ fontSize: '13px' }} aria-describedby={id}>
                        #{row.invoiceID}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography sx={{ fontSize: '13px' }} aria-describedby={id}>
                        {row.date}
                    </Typography>
                </TableCell>
                <TableCell align="center" style={{ color: 'black', fontWeight: 'bold', fontSize: '14px' }}>
                    {invoiceTotal}
                </TableCell>
                <TableCell align="center" style={{ color: 'black', fontSize: '14px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step color="success" key={label}>
                                    <StepLabel sx={{ fontSize: '7px' }}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow sx={{ '& > *': { borderBottom: 'set', backgroundColor: 'white' } }}>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'white', marginLeft: '10%' }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h7"
                                style={{ fontWeight: 'bold', color: 'black', textDecoration: 'underline' }}
                                gutterBottom
                                component="div"
                            >
                                Details:
                            </Typography>
                            <Typography
                                variant="h8"
                                style={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }}
                                gutterBottom
                                component="div"
                            >
                                Receive at: {row.address}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: 'black' }}>Product ID</TableCell>
                                        <TableCell align="center" style={{ color: 'black' }}>
                                            Amount
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'black' }}>
                                            Total price (USD)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.invoiceitem.map(
                                        (detailsRow) =>
                                            // eslint-disable-next-line implicit-arrow-linebreak
                                            detailsRow.productid != null ? (
                                                <TableRow key={detailsRow.productid}>
                                                    <TableCell component="th" scope="row">
                                                        <Button
                                                            aria-describedby={id}
                                                            onClick={handleProductPopoverOpen}
                                                            style={{
                                                                fontWeight: 'bold',
                                                                fontSize: '14px',
                                                                color: 'black',
                                                                fontStyle: 'italic',
                                                            }}
                                                        >
                                                            {detailsRow.productid}
                                                        </Button>
                                                        <Popover
                                                            id={id}
                                                            open={openProductHover}
                                                            anchorEl={anchorEl2}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            onClose={handleProductPopoverClose}
                                                            // disableRestoreFocus
                                                        >
                                                            <ProdInfo productID={detailsRow.productid} />
                                                        </Popover>
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '13px' }}>
                                                        {detailsRow.amount}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ fontWeight: 'bold', color: 'black', fontSize: '13px' }}
                                                    >
                                                        {detailsRow.total}
                                                    </TableCell>
                                                </TableRow>
                                            ) : null,
                                        // eslint-disable-next-line function-paren-newline
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default OrderRow;
