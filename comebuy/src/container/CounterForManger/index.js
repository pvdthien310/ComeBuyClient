import { useState, useRef, useEffect } from "react"

import ClientDetails from "./ClientDetails"
import Dates from "./Dates"
import Footer from "./Footer"
import Header from "./Header"
import MainDetails from "./MainDetails"
import Notes from "./Notes"
import Table from "./Table"
import TableForm from "./TableForm"

import ReactToPrint from "react-to-print"
import { Stack, Grid, Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'absolute',
    resize: true,
})

const CounterForManager = () => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [bankName, setBankName] = useState("")
    const [bankAccount, setBankAccount] = useState("")
    const [website, setWebsite] = useState("")
    const [clientName, setClientName] = useState("")
    const [clientAddress, setClientAddress] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [width] = useState(641)

    const componentRef = useRef()

    const handlePrint = () => {
        window.print()
    }

    useEffect(() => {
        if (window.innerWidth < width) {
            alert("Place your phone in landscape mode for the best experience")
        }
    }, [width])

    return (
        <Grid container
            sx={{
                width: '100%',
                height: '100%',
                p: 2
            }}
            spacing={1}
        >
            <BGImg style={{ zIndex: -1 }} src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <Grid item xs={8}
                sx={{
                    height: '100%',
                    width: '100%'
                }}
            >
                <Stack sx={{ height: '107%', width: '92%' }} >
                    <Box flexDirection="column" sx={{
                        backgroundColor: 'white',
                        p: 2, height: '100%',
                        width: '100%',
                        boxShadow: 5,
                        borderRadius: 10,
                        marginTop: '2%',
                        marginLeft: '2%'
                    }}
                    >
                        <Stack direction="row" padding="2%" width='100%' spacing={2}>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    fontFamily: 'serif'
                                }}
                            >
                                Manager name
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontStyle: 'italic',
                                    textDecoration: 'underline',
                                    fontFamily: 'serif'
                                }}
                            >
                                at BID number:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    fontFamily: 'serif',
                                    fontStyle: 'italic'
                                }}
                            >
                                Branch id
                            </Typography>
                        </Stack>

                        <Stack direction="row" paddingLeft="2%" width='100%' spacing={2} sx={{ marginTop: '-2%' }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    fontFamily: 'serif',
                                    textDecoration: 'underline'
                                }}
                            >
                                Your email:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontFamily: 'serif',
                                    fontStyle: 'italic'
                                }}
                            >
                                Manager@gmail.com
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    fontFamily: 'serif',
                                    textDecoration: 'underline'
                                }}
                            >
                                Your contact:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontFamily: 'serif',
                                    fontStyle: 'italic'
                                }}
                            >
                                0123456789
                            </Typography>
                        </Stack>

                        <Stack direction="row" padding="2%" width='100%' spacing={3} sx={{ marginTop: '-1%' }}>
                            <Stack direction="column" spacing={2} width="50%">
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        fontFamily: 'serif',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Client's name:
                                </Typography>
                                <TextField
                                    label="Name"
                                    sx={{ width: '85%', fontFamily: 'serif' }}
                                />
                            </Stack>

                            <Stack direction="column" spacing={2} width="50%">
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        fontFamily: 'serif',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Client's address:
                                </Typography>
                                <TextField
                                    label="Address"
                                    sx={{ width: '85%' }}
                                />
                            </Stack>
                        </Stack>
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'black' }}></div>

                        <TableForm
                            description={description}
                            setDescription={setDescription}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            price={price}
                            setPrice={setPrice}
                            amount={amount}
                            setAmount={setAmount}
                            list={list}
                            setList={setList}
                            total={total}
                            setTotal={setTotal}
                        />

                    </Box>
                </Stack>
            </Grid>

            <Grid item xs={4} >
                <Stack sx={{ height: '105%', width: '90%' }} >
                    <Box sx={{
                        backgroundColor: 'white', p: 2,
                        height: '100%',
                        width: '100%',
                        boxShadow: 5,
                        borderRadius: 10,
                        marginTop: '3%'
                    }}
                    >
                        <Typography>asdsd</Typography>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    )
}


export default CounterForManager