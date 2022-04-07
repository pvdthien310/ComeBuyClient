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


const  Invoice = () => {

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

    React.useEffect(() => {
        async function fetchInvoice() {
            if (invoiceList.length === 0) {
                try {
                    const resultAction = await dispatch(getAll())
                    const originalPromiseResult = unwrapResult(resultAction)
                    setInvoiceList(originalPromiseResult)
                } catch (rejectedValueOrSerializedError) {
                    console.log(rejectedValueOrSerializedError);
                }
            }
        }
        fetchInvoice()
        return () => {
            setInvoiceList({});
        };
    }, [])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: '#D8E0F2', height: '100%' }}>
            <TableContainer style={{ marginTop: '6%', padding: '6%', backgroundColor: '#D8E0F2', height: '100%' }} component={Paper}>
                <Typography style={{ marginLeft: '35%', marginTop: '0%', marginBottom: '5%', fontWeight: 'bold', fontSize: '30px', color: '#3B4E59' }}>INVOICE MANAGEMENT</Typography>
                <Table aria-label="collapsible table">
                    <TableHead style={{ backgroundColor: '#0F4001' }}>
                        <TableRow>
                            <TableCell />
                            <TableCell style={{ color: '#D8E0F2' }}>Invoice ID</TableCell>
                            <TableCell align="center" style={{ color: '#D8E0F2' }}>Customer ID</TableCell>
                            <TableCell align="center" style={{ color: '#D8E0F2' }}>Date</TableCell>
                            <TableCell align="center" style={{ color: '#D8E0F2' }}>Total&nbsp;(USD)</TableCell>
                            <TableCell align="center" style={{ color: '#D8E0F2' }}>Is Checked ?</TableCell>
                            <TableCell align="center" style={{ color: '#D8E0F2' }}>Recieved&nbsp;(USD)</TableCell>
                            <TableCell align="center" style={{ color: '#D8E0F2' }}>Is Paid ?</TableCell>
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
        </div >
    )
}
export default Invoice;