import * as React from 'react';
import { useDispatch } from 'react-redux'
import { getAllInvoice } from '../../redux/slices/invoiceSlice';
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
import { styled } from '@mui/material/styles';


const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'fixed',

})

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
                    const resultAction = await dispatch(getAllInvoice())
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
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
            }}
        >
            <BGImg src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <TableContainer
                style={{
                    backgroundColor: 'transparent',
                    padding: '2%',
                    zIndex: 0,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    position: 'absolute'
                }}
                component={Paper}
            >
                <Typography
                    style={{
                        marginLeft: '35%',
                        marginTop: '0%',
                        marginBottom: '2%',
                        fontWeight: 'bold',
                        fontSize: '30px',
                        color: '#F2F2F2'
                    }}
                >
                    INVOICE MANAGEMENT
                </Typography>
                <Table aria-label="collapsible table">
                    <TableHead style={{ backgroundColor: '#F2F2F2', borderRadius: '15px' }}>
                        <TableRow>
                            <TableCell />
                            <TableCell style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Invoice ID</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Customer ID</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Total&nbsp;(USD)</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Is Checked ?</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Recieved&nbsp;(USD)</TableCell>
                            <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Is Paid ?</TableCell>
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