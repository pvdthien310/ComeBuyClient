import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { Avatar, Button, IconButton, Link, Modal, Stack, TextField, Typography } from '@mui/material';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import { useFilePicker } from "use-file-picker";

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import NavBar from './../../components/NavBar/NavBar';
import { currentUser } from '../../redux/selectors';
import * as Validation from '././../LoginAndRegister/ValidationDataForAccount'
import { updateAccount, getAccountWithID } from '../../redux/slices/accountSlice';
import cloudinaryApi from '../../api/cloudinaryAPI';

const ProfileManage = () => {

    const navigate = useNavigate()

    function handleClick(event) {
        event.preventDefault();
        navigate('/myplace')
    }

    function handleClickToHome(event) {
        event.preventDefault();
        navigate('/')
    }
    const breadcrumbs = [
        <Link
            underline="hover"
            key="2"
            style={{ color: 'white' }}
            href="/myplace"
            onClick={handleClickToHome}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            style={{ color: 'white' }}
            href="/myplace"
            onClick={handleClick}
        >
            My place
        </Link>,
        <Typography key="3" style={{ color: 'white' }}>
            Profile Management
        </Typography>,
    ];

    const _currentUser = useSelector(currentUser)
    const [dataForUpdate, setDataForUpdate] = useState(_currentUser)
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const resultAction = await dispatch(getAccountWithID(_currentUser.userID))
            const originalPromiseResult = unwrapResult(resultAction)
            setDataForUpdate(originalPromiseResult)
            setIsLoading(false)
        } catch (rejectedValueOrSerializedError) {
            return
        }
    }
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (isLoading === true) {
            fetchUser()
        }
    }, [isLoading])

    const [havePhoneNumber, setHavePhoneNumber] = useState(() => {
        if (dataForUpdate.phoneNumber != '' || dataForUpdate.phoneNumber != null) {
            return true;
        } else {
            return false
        }
    })
    const [haveAddress, setHaveAddress] = useState(() => {
        if (dataForUpdate.address != '' || dataForUpdate.address != null) {
            return true;
        } else {
            return false
        }
    })
    const [haveGender, setHaveGender] = useState(() => {
        if (dataForUpdate.sex != '' || dataForUpdate.sex != null) {
            return true;
        } else {
            return false
        }
    })

    //Modal change name
    const [name, setName] = useState(dataForUpdate.name)
    const [openModalChangeName, setOpenModalChangeName] = useState(false)
    const handleCloseModalChangeName = () => {
        setOpenModalChangeName(false)
    }

    const handleOpenModalChangeName = () => {
        setOpenModalChangeName(true)
        setToggleSaveBtn(false)
    }

    //modal change contact
    const [contact, setContact] = useState(dataForUpdate.phoneNumber)
    const [openModalChangeContact, setOpenModalChangeContact] = useState(false)
    const handleCloseModalChangeContact = () => {
        setOpenModalChangeContact(false)
    }
    const handleOpenModalChangeContact = () => {
        setToggleSaveContactBtn(false)
        setOpenModalChangeContact(true)
    }

    //modal change address
    const [address, setAddress] = useState(dataForUpdate.address)
    const [openModalChangeAddress, setOpenModalChangeAddress] = useState(false)
    const handleCloseModalChangeAddress = () => {
        setOpenModalChangeAddress(false)
    }
    const handleOpenModalChangeAddress = () => {
        setToggleSaveAddressBtn(false)
        setOpenModalChangeAddress(true)
    }

    const [gender, setGender] = useState(dataForUpdate.sex);

    const handleChangeGender = async (event) => {
        setGender(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState(new Date(dataForUpdate.dob))

    //save name button
    const [toggleSaveBtn, setToggleSaveBtn] = useState(false)

    const handleToggleSaveButton = () => setToggleSaveBtn(true)

    //save contact button
    const [toggleSaveContactBtn, setToggleSaveContactBtn] = useState(false)

    const handleToggleSaveContactButton = () => setToggleSaveContactBtn(true)

    //save address button
    const [toggleSaveAddressBtn, setToggleSaveAddressBtn] = useState(false)

    const handleToggleSaveAddressButton = () => setToggleSaveAddressBtn(true)

    //success snack bar
    const [openSuccess, setOpenSuccess] = useState(false)
    const handleCloseSuccess = () => setOpenSuccess(false)

    //failed snack bar
    const [openFailed, setOpenFailed] = useState(false)
    const handleCloseFailed = () => setOpenFailed(false)

    //for open backdrop
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    const [updating, setUpdating] = React.useState(false)

    useEffect(() => {
        if (updating === true) {
            setOpenBackdrop(true)
        } else {
            setOpenBackdrop(false)
        }
    }, [updating])

    // change name
    const handleChangeName = async () => {
        if (name.length <= 5 || name === "" || Validation.CheckUsername(name)) {
            setOpenNameWrong(true);
            setName(_currentUser.name)
        } else {
            setUpdating(true)
            const temp = {
                ...dataForUpdate,
                name: name
            }
            try {
                const resultAction = await dispatch(updateAccount(temp))
                const originalPromiseResult = unwrapResult(resultAction)
                console.log(originalPromiseResult);
                handleCloseModalChangeName();
                setUpdating(false)
                setOpenSuccess(true)
                setDataForUpdate(temp)
            } catch (rejectedValueOrSerializedError) {
                setUpdating(false)
                setOpenFailed(true)
            }
        }
    }

    // change contact
    const handleChangeContact = async () => {
        if (Validation.CheckPhoneNumber(contact)) {
            setUpdating(true)
            const temp = {
                ...dataForUpdate,
                phoneNumber: contact
            }
            try {
                const resultAction = await dispatch(updateAccount(temp))
                const originalPromiseResult = unwrapResult(resultAction)
                console.log(originalPromiseResult);
                handleCloseModalChangeContact();
                setUpdating(false)
                setOpenSuccess(true)
                setDataForUpdate(temp)
            } catch (rejectedValueOrSerializedError) {
                setUpdating(false)
                setOpenFailed(true)
            }
        } else {
            setOpenContactWrong(true);
            setContact(_currentUser.phoneNumber)
        }
    }

    // change address
    const handleChangeAddress = async () => {
        setUpdating(true)
        const temp = {
            ...dataForUpdate,
            address: address
        }
        try {
            const resultAction = await dispatch(updateAccount(temp))
            const originalPromiseResult = unwrapResult(resultAction)
            console.log(originalPromiseResult);
            handleCloseModalChangeAddress();
            setUpdating(false)
            setOpenSuccess(true)
            setDataForUpdate(temp)
        } catch (rejectedValueOrSerializedError) {
            setUpdating(false)
            setOpenFailed(true)
        }
    }

    const handleChangeDobAndSex = async () => {
        setUpdating(true)
        const temp = {
            ...dataForUpdate,
            sex: gender,
            dob: selectedDate.toISOString().substring(0, 10)
        }
        try {
            const resultAction = await dispatch(updateAccount(temp))
            const originalPromiseResult = unwrapResult(resultAction)
            console.log(originalPromiseResult);
            handleCloseModalChangeAddress();
            setUpdating(false)
            setOpenSuccess(true)
            setDataForUpdate(temp)
        } catch (rejectedValueOrSerializedError) {
            setUpdating(false)
            setOpenFailed(true)
        }
    }

    //change avatar
    const [stateAvt, setStateAvt] = useState(dataForUpdate.avatar)
    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: "DataURL",
        accept: "image/*",
        multiple: false,
        limitFilesConfig: { max: 2 },
        // minFileSize: 1,
        maxFileSize: 50 // in megabytes
    });

    const updateAvt = async (imgUrl) => {
        const temp = {
            ...dataForUpdate,
            avatar: imgUrl
        }
        try {
            const resultAction = await dispatch(updateAccount(temp))
            const originalPromiseResult = unwrapResult(resultAction)
            setOpenSuccess(true)
            setDataForUpdate(temp)
            setStateAvt(imgUrl)
            filesContent.splice(0, filesContent.length)
            setOpenModalPreview(false)
            setUpdating(false)
        } catch (rejectedValueOrSerializedError) {
            setOpenFailed(true)
            filesContent.splice(0, filesContent.length)
            setStateAvt(dataForUpdate.avatar)
            setOpenModalPreview(false)
            setUpdating(false)
        }
    }

    const [openPreview, setOpenModalPreview] = useState(false)
    const openModalPreviewAvatar = () => {
        setOpenModalPreview(true)
    }
    const handleCloseModalPreviewAvt = () => {
        filesContent.splice(0, filesContent.length)
        setStateAvt(dataForUpdate.avatar)
        setOpenModalPreview(false)
    }

    useEffect(() => {
        if (filesContent.length != 0) {
            openModalPreviewAvatar();
        } else {
            setOpenModalPreview(false)
        }
    }, [filesContent])

    const handleChangeAvt = async () => {
        setUpdating(true)
        const data = [filesContent[0].content]
        try {
            const response = await cloudinaryApi.uploadImages(JSON.stringify({ data: data }))
            if (response) {
                response.data.map((imgurl) => {
                    updateAvt(imgurl)
                })
            }
            else {
                setStateAvt(dataForUpdate.avatar)
                setUpdating(false)
                setOpenFailed(true)
            }
        }
        catch (err) {
            console.log(err);
            filesContent.splice(0, filesContent.length)
            setStateAvt(dataForUpdate.avatar)
            setUpdating(false)
        }
    }

    //wrong name
    const [openNameWrong, setOpenNameWrong] = useState(false);

    const handleCloseNameWrong = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNameWrong(false);
    };

    //wrong contact
    const [openContactWrong, setOpenContactWrong] = useState(false);

    const handleCloseContactWrong = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenContactWrong(false);
    };



    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavBar></NavBar>
            <Stack direction="row"
                spacing={3}
                style={{ marginLeft: '20%', marginTop: '1%' }}
            >
                <Breadcrumbs separator="›" style={{ color: 'white' }} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>

            <Stack direction="column" spacing={3} style={{ paddingBottom: '2%' }}>

                {/* name & avatar */}
                <Stack direction="row" spacing={3}
                    sx={{
                        borderRadius: '15px',
                        marginTop: '3%',
                        backgroundColor: '#D7D8D9',
                        width: '45%',
                        alignSelf: 'center',
                        padding: '1%'
                    }}>
                    {filesContent.length != 0 ? (
                        filesContent.map((file, index) => (
                            <Avatar alt={file.name} src={file.content}
                                sx={{ width: 100, height: 100, marginLeft: '5%' }} />
                        ))
                    ) : (
                        <Avatar alt="" src={stateAvt === '' ? '' : stateAvt}
                            sx={{ width: 100, height: 100, marginLeft: '5%' }}
                        />
                    )}
                    {filesContent.length != 0 ? (
                        <IconButton onClick={handleChangeAvt} style={{ marginLeft: '-2%', marginTop: '10%' }}>
                            <CheckCircleIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => openFileSelector()} style={{ marginLeft: '-2%', marginTop: '10%' }}>
                            <AddPhotoAlternateTwoToneIcon />
                        </IconButton>
                    )}
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={2}
                            style={{ justifyContent: 'space-between' }}>
                            <Typography style={{
                                fontSize: '23px',
                                fontWeight: 'bold',
                                marginTop: '10%',
                                marginLeft: '5%',

                            }}
                            >
                                {name}
                            </Typography>
                            <IconButton onClick={handleOpenModalChangeName}
                                style={{ marginTop: '8%', marginLeft: '5%' }}
                            >
                                <EditTwoToneIcon />
                            </IconButton>
                        </Stack>
                        <Typography style={{
                            color: '#8FA1A6',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginLeft: '5%'
                        }}
                        >
                            Account holder
                        </Typography>
                    </Stack>
                </Stack>

                {/* contact */}
                <Stack direction="column" spacing={0.75}
                    sx={{
                        borderRadius: '15px',
                        marginTop: '3%',
                        backgroundColor: '#F2F2F2',
                        width: '45%',
                        alignSelf: 'center',
                        padding: '1%'
                    }}
                >
                    <Typography style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginTop: '1%',
                        marginLeft: '5%'
                    }}
                    >
                        Contact Details
                    </Typography>
                    <Typography style={{
                        color: '#8FA1A6',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginLeft: '5%'
                    }}
                    >
                        Receive important alerts for your profile here.
                    </Typography>
                    <Stack direction="row" spacing={2}
                        style={{ justifyContent: 'space-between' }}
                    >
                        <Typography style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            marginLeft: '5%'
                        }}
                        >
                            {contact}
                        </Typography>
                        <IconButton onClick={handleOpenModalChangeContact} style={{ marginTop: '-3%' }}>
                            <EditTwoToneIcon />
                        </IconButton>
                    </Stack>

                    {havePhoneNumber ? (
                        null
                    ) : (
                        <Typography style={{
                            color: '#8FA1A6',
                            fontSize: '13px',
                            marginLeft: '5%'
                        }}
                        >
                            Not set
                        </Typography>
                    )}
                </Stack>

                {/* address */}
                <Stack direction="column" spacing={0.75}
                    sx={{
                        borderRadius: '15px',
                        marginTop: '3%',
                        backgroundColor: '#F2F2F2',
                        width: '45%',
                        alignSelf: 'center',
                        padding: '1%'
                    }}
                >
                    <Typography style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginTop: '1%',
                        marginLeft: '5%'
                    }}
                    >
                        Address Details
                    </Typography>
                    <Typography style={{
                        color: '#8FA1A6',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginLeft: '5%'
                    }}
                    >
                        Where do your packages go ?
                    </Typography>
                    <Stack direction="row" spacing={2}
                        style={{ justifyContent: 'space-between' }}>
                        <Typography style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            marginLeft: '5%'
                        }}
                        >
                            {address}
                        </Typography>
                        <IconButton onClick={handleOpenModalChangeAddress} style={{ marginTop: '-3%' }}>
                            <EditTwoToneIcon />
                        </IconButton>
                    </Stack>

                    {haveAddress ? (
                        null
                    ) : (
                        <Typography style={{
                            color: '#8FA1A6',
                            fontSize: '13px',
                            marginLeft: '5%'
                        }}
                        >
                            Not set
                        </Typography>
                    )}
                </Stack>

                {/* sex & dob */}
                <Stack direction="column" spacing={0.75}
                    sx={{
                        borderRadius: '15px',
                        marginTop: '3%',
                        backgroundColor: '#F2F2F2',
                        width: '45%',
                        alignSelf: 'center',
                        padding: '1%'
                    }}
                >
                    <Typography style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginTop: '1%',
                        marginLeft: '5%'
                    }}
                    >More Info
                    </Typography>
                    <Stack direction="row" spacing={2} style={{ marginTop: '2%' }}>
                        <Box sx={{ minWidth: 120, marginLeft: '5%' }}>
                            <FormControl variant="standard" fullWidth>
                                <Typography id="demo-simple-select-standard-label" style={{ fontWeight: 'bold' }}>Gender:</Typography>
                                <Select
                                    style={{ marginTop: '10%' }}
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={gender === 'male' ? 'male' : 'female'}
                                    onChange={handleChangeGender}
                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Typography style={{ marginLeft: '10%', marginTop: '6%', fontWeight: 'bold' }}>Birthday: </Typography>
                        <Box style={{ marginTop: '6%' }}>
                            <DatePicker
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                dateFormat='yyyy-MM-dd'
                                showYearDropdown
                                scrollableMonthYearDropdown
                            />
                        </Box>
                        <Button
                            onClick={handleChangeDobAndSex}
                            style={{
                                marginTop: '25px',
                                borderRadius: '20px',
                                border: '1px solid #18608a',
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                width: '5%',
                                height: '5%',
                                padding: '12px 45px',
                                letterSpacing: '1px',
                            }}>Save</Button>
                    </Stack>
                    {haveGender ? (
                        null
                    ) : (
                        <Typography style={{
                            color: '#8FA1A6',
                            fontSize: '13px',
                            marginLeft: '5%'
                        }}
                        >Not set
                        </Typography>
                    )}
                </Stack>
            </Stack>

            {/* change name modal */}
            <Modal
                open={openModalChangeName}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30%',
                    height: '20%',
                    bgcolor: 'background.paper',
                    borderRadius: '15px',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit your name
                    </Typography>
                    <Typography id="modal-modal-description"
                        sx={{ mt: 2, marginTop: '1%', fontSize: '13px' }}
                    >
                        Changes made to your profile name here, will be shown anywhere your profile is used.
                    </Typography>
                    <TextField
                        style={{ width: '100%', marginTop: '2%' }}
                        label={_currentUser.name}
                        value={name}
                        onFocus={handleToggleSaveButton}
                        onChange={e => setName(e.target.value)}
                    />
                    {toggleSaveBtn ? (
                        <Stack direction="row" spacing={3} style={{ justifyContent: 'space-between' }}>
                            <Button onClick={handleCloseModalChangeName}>
                                Cancel
                            </Button>
                            <Button onClick={handleChangeName} style={{ marginLeft: '40%' }}>Save</Button>
                        </Stack>
                    ) : (
                        <Button onClick={handleCloseModalChangeName}>
                            Cancel
                        </Button>
                    )}
                    {/* Backdrop for updating */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>

            {/* change phone number modal */}
            <Modal
                open={openModalChangeContact}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30%',
                    height: '20%',
                    bgcolor: 'background.paper',
                    borderRadius: '15px',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit your phone number
                    </Typography>
                    <Typography id="modal-modal-description"
                        sx={{ mt: 2, marginTop: '1%', fontSize: '13px' }}>
                        Changes made to your contact here so we know how to contact you.
                    </Typography>
                    <TextField
                        style={{ width: '100%', marginTop: '2%' }}
                        label={_currentUser.contact}
                        value={contact}
                        onFocus={handleToggleSaveContactButton}
                        onChange={e => setContact(e.target.value)}
                    />
                    {toggleSaveContactBtn ? (
                        <Stack direction="row" style={{ justifyContent: 'space-between' }}>
                            <Button onClick={handleCloseModalChangeContact}>
                                Cancel
                            </Button>
                            <Button onClick={handleChangeContact} style={{ marginLeft: '40%' }}>Save</Button>
                        </Stack>
                    ) : (
                        <Button onClick={handleCloseModalChangeContact}>
                            Cancel
                        </Button>
                    )}
                    {/* Backdrop for updating */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>

            {/* change address modal */}
            <Modal
                open={openModalChangeAddress}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30%',
                    height: '20%',
                    bgcolor: 'background.paper',
                    borderRadius: '15px',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit your address
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, marginTop: '1%', fontSize: '13px' }}>
                        Changes made to your address here so we know where to send your packages or voucher gift
                    </Typography>
                    <TextField
                        style={{ width: '100%', marginTop: '2%' }}
                        label={_currentUser.address}
                        value={address}
                        onFocus={handleToggleSaveAddressButton}
                        onChange={e => setAddress(e.target.value)}
                    />
                    {toggleSaveAddressBtn ? (
                        <Stack direction="row" style={{ justifyContent: 'space-between' }}>
                            <Button onClick={handleCloseModalChangeAddress}>
                                Cancel
                            </Button>
                            <Button onClick={handleChangeAddress} style={{ marginLeft: '40%' }}>Save</Button>
                        </Stack>
                    ) : (
                        <Button onClick={handleCloseModalChangeAddress}>
                            Cancel
                        </Button>
                    )}
                    {/* Backdrop for updating */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>

            {/* modal preview avatar */}
            <Modal
                open={openPreview}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '55%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '400px',
                        bgcolor: 'background.paper',
                        borderRadius: '15px',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {filesContent.map((file, index) => (
                        <Avatar alt={file.name} src={file.content}
                            sx={{ marginLeft: '5%', width: "90%", height: "90%" }} />
                    ))}
                    <Stack direction="row" spacing={2} style={{ justifyContent: 'space-between' }}>
                        <Button
                            onClick={handleCloseModalPreviewAvt}
                            style={{
                                borderRadius: '20px',
                                border: '1px',
                                backgroundColor: 'red',
                                color: '#ffffff',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                width: '5%',
                                height: '2%',
                                letterSpacing: '1px',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleChangeAvt}
                            style={{
                                borderRadius: '20px',
                                border: '1px solid #18608a',
                                backgroundColor: 'black',
                                color: '#ffffff',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                width: '5%',
                                height: '2%',
                                letterSpacing: '1px',
                            }}
                        >
                            Save
                        </Button>
                    </Stack>
                    {/* Backdrop for updating */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>


            {/*Snackbar*/}
            {/* name wrong */}
            <Snackbar open={openNameWrong} autoHideDuration={6000} onClose={handleCloseNameWrong}>
                <Alert onClose={handleCloseNameWrong} severity="error" sx={{ width: '100%' }}>
                    Username can't have length under 5 and can't have only space or any of these letter /^ *$.,;:@#""''-!`~%&\/(){ }[]/
                </Alert>
            </Snackbar>

            {/* contact wrong */}
            <Snackbar open={openContactWrong} autoHideDuration={6000} onClose={handleCloseContactWrong}>
                <Alert onClose={handleCloseContactWrong} severity="error" sx={{ width: '100%' }}>
                    Invalid phone number. Please check it and try again
                </Alert>
            </Snackbar>


            {/* Snackbar updated successfully */}
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Updated successfully
                </Alert>
            </Snackbar>

            {/* Snackbar updated failed */}
            <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleCloseFailed}>
                <Alert onClose={handleCloseFailed} severity="error" sx={{ width: '100%' }}>
                    Something went wrong. Please try again
                </Alert>
            </Snackbar>

            {/* Backdrop for updating */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default ProfileManage