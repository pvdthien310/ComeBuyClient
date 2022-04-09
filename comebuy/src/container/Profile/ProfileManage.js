import React, { useState } from 'react'

import { Avatar, Button, IconButton, Link, Modal, Stack, TextField, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import CameraSharpIcon from '@mui/icons-material/CameraSharp';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import { useSelector } from 'react-redux';

import NavBar from './../../components/NavBar/NavBar';
import { currentUser } from '../../redux/selectors';
import { TrainOutlined } from '@material-ui/icons';


const ProfileManage = () => {

    const _currentUser = useSelector(currentUser)

    const [havePhoneNumber, setHavePhoneNumber] = useState(false)
    const [haveAddress, setHaveAddress] = useState(false)
    const [haveGender, setHaveGender] = useState(false)
    const [isChanged, setIsChanged] = useState(true)

    const [openModalChangeName, setOpenModalChangeName] = useState(false)
    const handleCloseModalChangeName = () => { setOpenModalChangeName(false) }

    const handleOpenModalChangeName = () => {
        setOpenModalChangeName(true)
    }

    const [gender, setGender] = useState('');

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState("")

    const [toggleSaveBtn, setToggleSaveBtn] = useState(false)

    const handleToggleSaveButton = () => setToggleSaveBtn(true)



    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavBar></NavBar>
            <Stack direction="row" spacing={3} style={{ marginLeft: '20%', marginTop: '1%' }}>
                <Link style={{ marginRight: '-20px', color: '#A6A6A6', fontWeight: 'bold', fontSize: '14px' }} href="myplace" underline="none">
                    {' My place '}
                </Link>
                <NavigateNextIcon style={{ marginRight: '-20px', color: '#F2F2F2' }} />
                <Link style={{ color: '#F2F2F2', fontWeight: 'bold', fontSize: '14px' }} href="#" underline="none">
                    {'Profile management'}
                </Link>
            </Stack>

            <Stack direction="column" spacing={3} style={{ paddingBottom: '2%' }}>

                {/* name & avatar */}
                <Stack direction="row" spacing={3} sx={{ borderRadius: '15px', marginTop: '3%', backgroundColor: '#D7D8D9', width: '45%', alignSelf: 'center', padding: '1%' }}>
                    <Avatar alt="" src={_currentUser.avatar} sx={{ width: 100, height: 100, marginLeft: '5%' }} />
                    <IconButton style={{ marginLeft: '-2%', marginTop: '10%' }}>
                        <CameraSharpIcon />
                    </IconButton>
                    <Stack direction="column" spacing={0.5}>
                        <Stack direction="row">
                            <Typography style={{ fontSize: '23px', fontWeight: 'bold', marginTop: '10%', marginLeft: '5%' }}>{_currentUser.name}</Typography>
                            <IconButton onClick={handleOpenModalChangeName} style={{ marginTop: '8%', marginLeft: '5%' }}>
                                <BorderColorSharpIcon />
                            </IconButton>
                        </Stack>
                        <Typography style={{ color: '#8FA1A6', fontWeight: 'bold', fontSize: '14px', marginLeft: '5%' }}>Account holder</Typography>
                    </Stack>
                </Stack>

                {/* contact */}
                <Stack direction="column" spacing={0.75} sx={{ borderRadius: '15px', marginTop: '3%', backgroundColor: '#F2F2F2', width: '45%', alignSelf: 'center', padding: '1%' }}>
                    <Typography style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '1%', marginLeft: '5%' }}>Contact Details</Typography>
                    <Typography style={{ color: '#8FA1A6', fontWeight: 'bold', fontSize: '14px', marginLeft: '5%' }}>Receive important alerts for your profile here.</Typography>
                    <Stack direction="row" spacing={2} style={{ justifyContent: 'space-between' }}>
                        <Typography style={{ color: 'black', fontWeight: 'bold', fontSize: '15px', marginLeft: '5%' }}>0358075274</Typography>
                        <IconButton style={{ marginTop: '-3%' }}>
                            <BorderColorSharpIcon />
                        </IconButton>
                    </Stack>

                    {havePhoneNumber ? (
                        null
                    ) : (
                        <Typography style={{ color: '#8FA1A6', fontSize: '13px', marginLeft: '5%' }}>Not set</Typography>
                    )}
                </Stack>

                {/* address */}
                <Stack direction="column" spacing={0.75} sx={{ borderRadius: '15px', marginTop: '3%', backgroundColor: '#F2F2F2', width: '45%', alignSelf: 'center', padding: '1%' }}>
                    <Typography style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '1%', marginLeft: '5%' }}>Address Details</Typography>
                    <Typography style={{ color: '#8FA1A6', fontWeight: 'bold', fontSize: '14px', marginLeft: '5%' }}>Where do your packages go ?</Typography>
                    <Stack direction="row" spacing={2} style={{ justifyContent: 'space-between' }}>
                        <Typography style={{ color: 'black', fontWeight: 'bold', fontSize: '15px', marginLeft: '5%' }}>61 ap Tay Minh xa Lang Minh huyen Xuan Loc tinh Dong Nai</Typography>
                        <IconButton style={{ marginTop: '-3%' }}>
                            <BorderColorSharpIcon />
                        </IconButton>
                    </Stack>

                    {haveAddress ? (
                        null
                    ) : (
                        <Typography style={{ color: '#8FA1A6', fontSize: '13px', marginLeft: '5%' }}>Not set</Typography>
                    )}
                </Stack>

                {/* sex & dob */}
                <Stack direction="column" spacing={0.75} sx={{ borderRadius: '15px', marginTop: '3%', backgroundColor: '#F2F2F2', width: '45%', alignSelf: 'center', padding: '1%' }}>
                    <Typography style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '1%', marginLeft: '5%' }}>More Info...</Typography>
                    <Stack direction="row" spacing={2} style={{ marginTop: '-1%' }}>
                        <Box sx={{ minWidth: 120, marginLeft: '5%' }}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={gender}
                                    label="Gender"
                                    onChange={handleChangeGender}
                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Typography style={{ marginLeft: '10%', marginTop: '3%' }}>DOB: </Typography>
                        <Box style={{ marginTop: '3%' }}>
                            <DatePicker
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                dateFormat='yyyy/MM/dd'
                                showYearDropdown
                                scrollableMonthYearDropdown
                                isClearable
                            />
                        </Box>

                        {isChanged ? (
                            <Button style={{ marginTop: '2.5%' }}>Save</Button>
                        ) : (
                            null
                        )}

                    </Stack>
                    {haveGender ? (
                        null
                    ) : (
                        <Typography style={{ color: '#8FA1A6', fontSize: '13px', marginLeft: '5%' }}>Not set</Typography>
                    )}
                </Stack>
            </Stack>

            {/* change name modal */}
            <Modal
                open={openModalChangeName}
                onClose={handleCloseModalChangeName}
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
                    <Typography id="modal-modal-description" sx={{ mt: 2, marginTop: '1%', fontSize: '13px' }}>
                        Changes made to your profile name here, will be shown anywhere your profile is used.
                    </Typography>
                    <TextField
                        style={{ width: '100%', marginTop: '2%' }}
                        label={_currentUser.name}
                        onFocus={handleToggleSaveButton}
                    />
                    {toggleSaveBtn ? (
                        <Button style={{ marginLeft: '40%' }}>Save</Button>
                    ) : (
                        null
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default ProfileManage