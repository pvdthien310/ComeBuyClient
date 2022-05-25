import * as React from 'react';
import { useDispatch } from 'react-redux'
import { getAllInvoice } from '../../redux/slices/invoiceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Row from '../../components/InvoiceRow';

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
import { Stack, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
        <Stack direction="column" sx={{
            width: "100%",
            height: "100%",
            justifyItems: 'center',
            alignItems: 'center',
            backgroundColor: 'grey',
            overflowY: 'auto'
        }}>
            <Box sx={{
                width: "90%",
                height: "95%",
                boxShadow: 10,
                borderRadius: 3,
                alignItems: 'center',
                justifyItems: 'center',
                backgroundColor: 'white'
            }}>
                <Stack sx={{
                    width: "100%",
                    height: "100%"
                }}>
                    <TableContainer
                        style={{

                            height: 600,
                            width: 1200,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                        }}
                        component={Paper}
                    >
                        <Table aria-label="collapsible table">
                            <TableHead style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                                <TableRow>
                                    <TableCell />
                                    <TableCell style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Invoice ID</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Customer ID</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Total&nbsp;(USD)</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Is Checked</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Recieved&nbsp;(USD)</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Is Paid</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Print out</TableCell>
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
                            style={{}}
                            count={invoiceList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            sx={{ color: 'black' }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Stack>
            </Box>
        </Stack>
    )
}
export default Invoice;