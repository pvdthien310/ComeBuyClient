import * as React from 'react';
import { useDispatch } from 'react-redux'
import { getAll } from '../../redux/slices/invoiceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Row from './Row'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';


const Invoice = () => {

    const [invoiceList, setInvoiceList] = React.useState([])

    const dispatch = useDispatch();

    //for paginating
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
                setInvoiceList(originalPromiseResult)
                console.log(invoiceList)
            } catch (rejectedValueOrSerializedError) {
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