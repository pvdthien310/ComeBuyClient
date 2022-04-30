import { useState, useRef, useEffect } from "react"

import ClientDetails from "./ClientDetails"
import Dates from "./Dates"
import Footer from "./Footer"
import Header from "./Header"
import MainDetails from "./MainDetails"
import Notes from "./Notes"
import Table from "./Table"
import TableForm from "./TableForm"
import { currentUser } from "../../redux/selectors"
import { getAllBranch } from "../../redux/slices/branchSlice"


import ReactToPrint from "react-to-print"
import { Stack, Grid, Box, Typography, TextField, Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"

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
    const [bankName, setBankName] = useState("")
    const [bankAccount, setBankAccount] = useState("")
    const [website, setWebsite] = useState("")
    const [clientName, setClientName] = useState("")
    const [clientAddress, setClientAddress] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleString())
    const [dueDate, setDueDate] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [width] = useState(641)
    const [openConfirmBox, setOpenConfirmBox] = useState(false)
    const handleCloseConfirmBox = () => setOpenConfirmBox(false)

    const componentRef = useRef()

    const handlePrint = () => {
        window.print()
    }

    const AfterPrint = () => {
        setOpenConfirmBox(true)
    }

    const handleSaveInvoice = () => {
        console.log("Saving invoice...");
        setIsAddingInvoice(true)
        handleCloseConfirmBox()
        setOpenBackdrop(true)
    }

    const [isAddingInvoice, setIsAddingInvoice] = useState(false)
    const [openBackdrop, setOpenBackdrop] = useState(false);

    useEffect(() => {
        if (isAddingInvoice === true) {
            //adding invoice
            console.log("Tao them invoice ne");
            setIsAddingInvoice(false)
        } else {
            setOpenBackdrop(false)
        }
    }, [isAddingInvoice])

    const getListBranch = async () => {
        try {
            const resultAction = await dispatch(getAllBranch())
            const originalPromiseResult = unwrapResult(resultAction)
            setListBranch(originalPromiseResult)
            console.log(originalPromiseResult);
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
                p: 2
            }}
            spacing={1}
        >
            <BGImg style={{ zIndex: -1 }} src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <Grid item xs={7}
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
                                {name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontStyle: 'italic',
                                    textDecoration: 'underline',
                                    fontFamily: 'serif'
                                }}
                            >
                                at ComeBuy store:
                            </Typography>
                            <TextField
                                label="Branch address"
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{ width: 'auto', fontFamily: 'serif', height: 'auto' }}
                            />
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
                                {email}
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
                                {phone}
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
                                    onChange={(e) => setClientName(e.target.value)}
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
                                fontSize: '20px',
                                fontWeight: 'bold',
                                fontFamily: 'serif',
                            }}
                        >
                            Additional notes
                        </Typography>
                        <TextareaAutosize
                            minRows={5}
                            placeholder="Additional note to client (paid by...)"
                            onChange={(e) => setNotes(e.target.value)}
                            style={{
                                minHeight: '50px',
                                minWidth: '200px',
                                maxWidth: "90%",
                                width: '90%',
                                alignSelf: 'center',
                                fontFamily: 'serif',
                                fontSize: '18px',
                                marginTop: '2%',
                                borderRadius: '15px',
                                padding: '2%',
                                maxHeight: '100px'
                            }}
                        />

                    </Box>
                </Stack>
            </Grid>

            <Grid item xs={5} padding="3%">
                <Stack sx={{ height: '105%', width: '100%' }} >
                    <Box sx={{
                        backgroundColor: '#F2F2F2', p: 2,
                        height: '100%',
                        width: '100%',
                        boxShadow: 5,
                        borderRadius: 10,
                        marginTop: '3%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    >
                        <Stack ref={componentRef} direction="column" width="100%">
                            <Header handlePrint={handlePrint} />
                            <MainDetails name={name} address={address} />
                            <ClientDetails
                                clientName={clientName}
                                clientAddress={clientAddress}
                            />

                            <Dates
                                invoiceDate={invoiceDate}
                                dueDate={dueDate}
                            />

                            <Table
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
                            <div style={{ height: '1px', width: '100%', backgroundColor: 'black' }}></div>
                            <Footer
                                name={name}
                                address={address}
                                email={email}
                                phone={phone}
                            />
                        </Stack>
                        <ReactToPrint
                            trigger={() => (
                                <Button style={{ marginTop: '5%' }} variant="outlined">
                                    Print / Download
                                </Button>
                            )}
                            content={() => componentRef.current}
                            onAfterPrint={() => AfterPrint()}
                        />
                    </Box>
                </Stack>
            </Grid>
            <Dialog
                open={openConfirmBox}
                onClose={handleCloseConfirmBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Save this invoice ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to save this invoice ?
                        Once yes, it means these products were sold and this invoice was accepted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmBox}>No</Button>
                    <Button onClick={handleSaveInvoice} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid >
    )
}


export default CounterForManager