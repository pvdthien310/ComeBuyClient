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

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import "react-datepicker/dist/react-datepicker.css"

import { useFilePicker } from "use-file-picker";

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import NavBar from '../NavBar/NavBar';
import { currentUser } from '../../redux/selectors';
import * as Validation from '../../container/LoginAndRegister/ValidationDataForAccount'
import { updateAccount, getAccountWithID } from '../../redux/slices/accountSlice';
import cloudinaryApi from '../../api/cloudinaryAPI';
import BigFooter from './../BigFooter/index';

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
            style={{ color: 'black' }}
            href="/myplace"
            onClick={handleClickToHome}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            style={{ color: 'black' }}
            href="/myplace"
            onClick={handleClick}
        >
            My place
        </Link>,
        <Typography key="3" style={{ color: 'black' }}>
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
        console.log(selectedDate.toISOString().substring(0, 10));
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
        <Stack direction="column" style={{
            flex: 1,
            display: 'flex',
            height: '100%',
            width: '100%',
            backgroundColor: '#F2EBDF'
        }}>
            <NavBar></NavBar>
            <Stack direction="row"
                spacing={3}
                style={{ marginLeft: '15%', marginTop: '1%' }}
            >
                <Breadcrumbs separator="›" style={{ color: 'black' }} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Typography style={{
                marginLeft: '15%',
                marginTop: '3%',
                color: 'black',
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'serif'
            }}>
                Your information
            </Typography>
            <div style={{ marginLeft: '15%', height: '1px', backgroundColor: 'black', width: '60%' }}></div>

            {/* name & Avatar */}
            <Stack direction="row" width='100%' spacing={2}
                sx={{
                    backgroundColor: '#F2EBDF',
                    marginTop: '2%',
                    paddingBottom: '1%',
                }}>
                {filesContent.length != 0 ? (
                    filesContent.map((file, index) => (
                        <Avatar alt={file.name} src={file.content}
                            style={{
                                width: '150px',
                                height: '150px',
                                marginLeft: '15%',
                                borderWidth: '1px',
                                borderColor: 'white'
                            }} />
                    ))
                ) : (
                    <Avatar alt="" src={stateAvt === '' ? '' : stateAvt}
                        sx={{
                            width: '150px',
                            height: '150px',
                            marginLeft: '15%',
                            borderWidth: '1px',
                            borderColor: 'white'
                        }}
                    />
                )}
                {filesContent.length != 0 ? (
                    <IconButton onClick={handleChangeAvt}
                        style={{
                            marginLeft: '-2%',
                            marginTop: '8%',
                            backgroundColor: '#F2EBDF',
                            height: '30px',
                            width: '30px',
                            top: '75%'
                        }}>
                        <CheckCircleIcon style={{ color: 'black' }} />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => openFileSelector()}
                        style={{
                            marginLeft: '-2%',
                            marginTop: '8%',
                            backgroundColor: '#F2EBDF',
                            height: '30px',
                            width: '30px',
                            top: '75%'
                        }}
                    >
                        <AddPhotoAlternateTwoToneIcon style={{ color: 'black' }} />
                    </IconButton>
                )}
                <Stack direction="column" width="auto" spacing={2}>
                    <Typography style={{
                        fontSize: '23px',
                        fontWeight: 'bold',
                        marginTop: '5%',
                        marginLeft: '5%',
                        color: 'black'
                    }}
                    >
                        {name}
                    </Typography>
                    <Typography style={{
                        color: '#8FA1A6',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginLeft: '5%',
                        marginTop: '10%',
                        fontStyle: 'italic'
                    }}
                    >
                        Account holder
                    </Typography>
                </Stack>
                <IconButton onClick={handleOpenModalChangeName}
                    style={{ marginTop: '0%', marginLeft: '5%', backgroundColor: '#F2EBDF' }}
                >
                    <EditTwoToneIcon style={{ color: 'black' }} />
                </IconButton>
            </Stack>

            {/* contact */}
            <Stack direction="column" spacing={3}
                style={{
                    width: '100%',
                    backgroundColor: '#F2EBDF',
                    marginTop: '0%',
                    paddingTop: '-1%'
                }}
            >
                <Typography style={{
                    fontSize: '23px',
                    fontWeight: 'bold',
                    marginTop: '1%',
                    marginLeft: '15%',
                    color: 'black'
                }}
                >
                    Contact
                </Typography>
                <div style={{
                    height: '1px',
                    backgroundColor: 'black',
                    width: '40%',
                    marginTop: '0%',
                    marginLeft: '15%'
                }}>
                </div>
                <Typography style={{
                    color: '#8FA1A6',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginLeft: '15%',
                    marginTop: '0.5%',
                    fontStyle: 'italic'
                }}
                >
                    Receive important alerts for your profile here.
                </Typography>
                <Stack direction="row" spacing={2}
                    style={{ width: '100%' }}
                >
                    <Typography style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '17px',
                        marginLeft: '15%',
                        marginTop: '0%',
                    }}
                    >
                        {contact}
                    </Typography>
                    <IconButton onClick={handleOpenModalChangeContact}
                        style={{
                            marginTop: '-0.5%',
                            backgroundColor: '#F2EBDF',
                            marginLeft: '7%'
                        }}>
                        <EditTwoToneIcon style={{ color: 'black' }} />
                    </IconButton>

                    {havePhoneNumber ? (
                        null
                    ) : (
                        <Typography style={{
                            color: '#8FA1A6',
                            fontSize: '13px',
                            marginLeft: '5%',
                            fontStyle: 'italic',
                            marginTop: '0.5%',
                        }}
                        >
                            Not set
                        </Typography>
                    )}
                </Stack>
            </Stack>

            {/* address */}
            <Stack direction="column" spacing={3}
                style={{
                    width: '100%',
                    backgroundColor: '#F2EBDF',
                    marginTop: '0%',
                    paddingTop: '-1%'
                }}
            >
                <Typography style={{
                    fontSize: '23px',
                    fontWeight: 'bold',
                    marginTop: '1%',
                    marginLeft: '15%',
                    color: 'black'
                }}
                >
                    Address
                </Typography>
                <div style={{
                    height: '1px',
                    backgroundColor: 'black',
                    width: '40%',
                    marginTop: '0%',
                    marginLeft: '15%'
                }}>
                </div>
                <Typography style={{
                    color: '#8FA1A6',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginLeft: '15%',
                    marginTop: '0.5%',
                    fontStyle: 'italic'
                }}
                >
                    Where do your packages go ?
                </Typography>
                <Stack direction="row" spacing={2}
                    style={{ width: '100%' }}
                >
                    <Typography style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '17px',
                        marginLeft: '15%',
                        marginTop: '0%',
                    }}
                    >
                        {address}
                    </Typography>
                    <IconButton onClick={handleOpenModalChangeAddress}
                        style={{
                            marginTop: '-0.5%',
                            backgroundColor: '#F2EBDF',
                            marginLeft: '7%'
                        }}>
                        <EditTwoToneIcon style={{ color: 'black' }} />
                    </IconButton>

                    {haveAddress ? (
                        null
                    ) : (
                        <Typography style={{
                            color: '#8FA1A6',
                            fontSize: '13px',
                            marginLeft: '5%',
                            fontStyle: 'italic',
                            marginTop: '0.5%',
                        }}
                        >
                            Not set
                        </Typography>
                    )}
                </Stack>
            </Stack>

            {/* Dob */}
            <Stack direction="column" spacing={3}
                style={{
                    width: '100%',
                    backgroundColor: '#F2EBDF',
                    marginTop: '0%',
                    paddingTop: '-1%',
                    paddingBottom: '2%'
                }}
            >
                <Typography style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginTop: '1%',
                    color: 'black',
                    marginLeft: '15%'
                }}
                >
                    DOB & Gender
                </Typography>
                <div style={{
                    height: '1px',
                    marginLeft: '15%',
                    backgroundColor: 'black',
                    width: '40%',
                    marginTop: '0%'
                }}>
                </div>
                <Typography style={{
                    color: '#8FA1A6',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginLeft: '15%',
                    marginTop: '0.5%',
                    fontStyle: 'italic'
                }}
                >
                    If you're a regular customer, we will have gift for your birthday
                </Typography>
                <Stack direction="row" spacing={2}
                    style={{ width: '100%' }}
                >
                    <Typography style={{ color: 'black', fontWeight: 'bold', marginTop: '1%', marginLeft: '15%' }}>Birthday:</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            value={selectedDate}
                            onChange={(newValue) => {
                                setSelectedDate(newValue);
                            }}
                            renderInput={(params) => <TextField style={{ height: '5%', backgroundColor: '#F2EBDF' }} {...params} />}
                        />
                    </LocalizationProvider>
                    <Typography style={{ color: 'black', fontWeight: 'bold', marginTop: '1%', marginLeft: '3%' }}>Gender:</Typography>
                    <FormControl variant="standard" width="100" style={{ marginTop: '0.75%' }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            style={{ color: 'black' }}
                            value={gender === 'male' ? 'male' : 'female'}
                            onChange={handleChangeGender}
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        onClick={handleChangeDobAndSex}
                        style={{
                            marginTop: '0%',
                            borderRadius: '20px',
                            border: '1px solid #18608a',
                            backgroundColor: '#127361',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            width: '5%',
                            height: '3%',
                            padding: '12px 45px',
                            letterSpacing: '1px',
                        }}>Save</Button>
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
            <BigFooter />
        </Stack >
    )
}

export default ProfileManage