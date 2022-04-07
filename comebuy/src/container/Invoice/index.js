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
        <div style={{ top: '0', right: '0', left: '0', right: '0' }}>
            <TableContainer style={{ backgroundColor: '#0D0D0D', height: 'inherit', width: 'inherit', padding: '5%' }} component={Paper}>
                <Typography style={{ marginLeft: '35%', marginTop: '0%', marginBottom: '5%', fontWeight: 'bold', fontSize: '30px', color: '#F2F2F2' }}>INVOICE MANAGEMENT</Typography>
                <Table aria-label="collapsible table">
                    <TableHead style={{ backgroundColor: '#F2F2F2', borderRadius: '15px' }}>
                        <TableRow>
                            <TableCell />
                            <TableCell style={{ color: '#0D0D0D' }}>Invoice ID</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D' }}>Customer ID</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D' }}>Date</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D' }}>Total&nbsp;(USD)</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D' }}>Is Checked ?</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D' }}>Recieved&nbsp;(USD)</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D' }}>Is Paid ?</TableCell>
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    style={{ color: '#F2F2F2' }}
                    count={invoiceList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div >
    )
}
export default Invoice;