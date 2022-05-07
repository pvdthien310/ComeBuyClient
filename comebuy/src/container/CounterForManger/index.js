import { useState, useRef, useEffect } from "react"

import ClientDetails from "../../components/CounterClientDetails"
import Dates from "../../components/CounterDates"
import Footer from "../../components/CounterFooter"
import Header from "../../components/CounterHeader"
import MainDetails from "../../components/CounterMainDetails"
import Notes from "../../components/CounterNotes"
import TablePrint from "../../components/CounterTablePrint"
import TableForm from "../../components/CounterTableForm"
import { currentUser } from "../../redux/selectors"
import { getAllBranch } from "../../redux/slices/branchSlice"
import logo from '../../assets/img/logo.png'

import ReactToPrint from "react-to-print"
import { Stack, Grid, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
import { BigFooter } from "../../components"

const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'absolute',
    resize: true,
})

const CounterForManager = () => {

    const _currentUser = useSelector(currentUser)
    const dispatch = useDispatch()
    const [listBranch, setListBranch] = useState([])

    const [name, setName] = useState(_currentUser.name)
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState(_currentUser.email)
    const [phone, setPhone] = useState(_currentUser.phoneNumber)
    const [clientName, setClientName] = useState("")
    const [clientAddress, setClientAddress] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState(String(new Date().getDate()).padStart(2, '0') + '/' + String(new Date().getMonth() + 1).padStart(2, '0') + '/' + new Date().getFullYear())
    const [dueDate, setDueDate] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState(null)
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

    const AfterPrint = () => {
        setClientName("")
        setClientAddress("")
        setList([])
        setNotes("")
        setTotal(0)
    }

    const getListBranch = async () => {
        try {
            const resultAction = await dispatch(getAllBranch())
            const originalPromiseResult = unwrapResult(resultAction)
            setListBranch(originalPromiseResult)
        } catch (rejectedValueOrSerializedError) {
            return rejectedValueOrSerializedError
        }
    }
    useEffect(() => {
        if (listBranch.length === 0) {
            getListBranch()
        }
    }, [])

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
                p: 2,
                position: 'relative'
            }}
            spacing={1}
        >
            <BGImg style={{ zIndex: -1 }} src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <Grid item xs={7}
                sx={{
                    height: 'auto',
                    width: '100%'
                }}
            >
                <Stack sx={{ height: 'auto', width: '92%' }} >
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
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontStyle: 'italic',
                                }}
                            >
                                at ComeBuy store:
                            </Typography>
                            <TextField
                                label="Branch address"
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{ width: 'auto', height: 'auto' }}
                            />
                        </Stack>

                        <Stack direction="row" paddingLeft="2%" width='100%' spacing={2} sx={{ marginTop: '-2%' }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    textDecoration: 'underline'
                                }}
                            >
                                Your email:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontStyle: 'italic'
                                }}
                            >
                                {email}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    textDecoration: 'underline'
                                }}
                            >
                                Your contact:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontStyle: 'italic'
                                }}
                            >
                                {phone}
                            </Typography>
                        </Stack>

                        <Stack direction="row" padding="2%" width='100%' spacing={3} sx={{ marginTop: '-1%' }}>
                            <Stack direction="column" spacing={2} width="50%">
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Client's name:
                                </Typography>
                                <TextField
                                    label="Name"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    sx={{ width: '85%' }}
                                />
                            </Stack>

                            <Stack direction="column" spacing={2} width="50%">
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Client's address:
                                </Typography>
                                <TextField
                                    label="Address"
                                    value={clientAddress}
                                    onChange={(e) => setClientAddress(e.target.value)}
                                    sx={{ width: '85%' }}
                                />
                            </Stack>
                        </Stack>
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'black' }}></div>

                        <TableForm
                            style={{ paddingLeft: "2%" }}
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
                        <Typography
                            style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            Additional notes
                        </Typography>
                        <TextareaAutosize
                            minRows={5}
                            value={notes}
                            placeholder="Additional note to client (paid by...)"
                            onChange={(e) => setNotes(e.target.value)}
                            style={{
                                minHeight: '50px',
                                minWidth: '200px',
                                maxWidth: "90%",
                                width: '90%',
                                alignSelf: 'center',
                                fontSize: '18px',
                                marginTop: '2%',
                                borderRadius: '15px',
                                padding: '2%',
                                maxHeight: '100px'
                            }}
                        />
                        <IconButton onClick={AfterPrint}
                            sx={{
                                backgroundColor: 'transparent',
                                width: '15%',
                                height: "auto",
                                marginLeft: '45%'
                            }}>
                            <BackspaceSharpIcon color="error" sx={{ backgroundColor: 'transparent' }} />
                            <Typography sx={{ marginLeft: '1%', fontWeight: 'bold' }}>Clear</Typography>
                        </IconButton>
                    </Box>
                </Stack >
            </Grid >

            <Grid item xs={5} sx={{ padding: "5%" }}>
                <Stack sx={{ height: 'auto', width: '100%' }} >
                    <Box sx={{
                        backgroundColor: 'white', p: 2,
                        height: '100%',
                        width: '100%',
                        padding: "5%",
                        boxShadow: 5,
                        borderRadius: 10,
                        marginTop: '3%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    >
                        <Stack ref={componentRef} sx={{ paddingTop: '3rem' }} direction="column" width="100%">
                            <Stack direction="row" width="100%" sx={{ marginRight: '2rem', backgroundColor: 'grey' }}>
                                <Stack direction="column" width="100%">
                                    <Header handlePrint={handlePrint} />
                                    <Dates
                                        invoiceDate={invoiceDate}
                                        dueDate={dueDate}
                                    />
                                </Stack>
                                <Stack direction="column" width="100%">
                                    <h1
                                        style={{
                                            fontSize: '30px',
                                            fontWeight: 'bold',
                                            letterSpacing: '0.1rem',
                                            marginTop: '1.2rem'
                                        }}
                                    >
                                        ComeBuy
                                    </h1>
                                    <Typography
                                        sx={{
                                            marginTop: '-7%',
                                            fontSize: '13px',
                                            color: 'grey',
                                            marginLeft: '2rem'
                                        }}
                                    >
                                        invoice at branch
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/* <div style={{ height: '0.5px', backgroundColor: 'grey', marginLeft: '3rem', marginRight: '3rem' }}> </div> */}
                            <Stack direction="row" width="100%" sx={{ marginRight: '2rem', marginTop: '1.5rem', backgroundColor: 'grey' }}>
                                <Stack width="50%">
                                    <ClientDetails
                                        clientName={clientName}
                                        clientAddress={clientAddress}
                                    />
                                </Stack>
                                <Stack>
                                    <MainDetails contact={phone} name={name} address={address} />
                                </Stack>
                            </Stack>

                            <TablePrint
                                description={description}
                                quantity={quantity}
                                price={price}
                                amount={amount}
                                list={list}
                                setList={setList}
                                total={total}
                                setTotal={setTotal}
                            />

                            <Notes notes={notes} />
                            <div style={{ marginLeft: '2rem', marginRight: '2rem', height: '1px', backgroundColor: 'grey' }}></div>
                            <Footer
                                name={name}
                                address={address}
                                email={email}
                                phone={phone}
                            />
                        </Stack>
                        <ReactToPrint
                            trigger={() => (
                                <Button style={{ marginLeft: '30%', marginTop: '5%', width: '40%' }} variant="outlined">
                                    Print / Download
                                </Button>
                            )}
                            content={() => componentRef.current}
                            onAfterPrint={() => AfterPrint()}
                        />
                    </Box>
                </Stack>
            </Grid>
            <BigFooter />
        </Grid >
    )
}


export default CounterForManager