import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Stack, Typography, Link, Breadcrumbs, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const CheckoutPage = () => {

    const navigate = useNavigate()

    const [province, setProvince] = useState({})
    const [provinceList, setProvinceList] = useState([])

    const [district, setDistrict] = useState({})
    const [districtList, setDistrictList] = useState([])

    const [commune, setCommune] = useState({})
    const [communeList, setCommuneList] = useState([])

    //get province
    useEffect(() => {
        const getProvinceList = async () => {
            const resProvince = await fetch('https://sheltered-anchorage-60344.herokuapp.com/province')
            const resProv = resProvince.json()
            setProvinceList(await resProv)
        }
        getProvinceList()
    }, [])

    function handleChangeProvince(event) {
        setProvince(event.target.value)
    }


    //get district
    useEffect(() => {
        const getDistrict = async () => {
            const resDistrict = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${province.idProvince}`)
            const resDis = resDistrict.json()
            setDistrictList(await resDis)
        }
        getDistrict()
    }, [province])

    function handleChangeDistrict(event) {
        setDistrict(event.target.value)
    }

    //get commune
    useEffect(() => {
        const getCommune = async () => {
            const reCommune = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${district.idDistrict}`)
            const resCom = reCommune.json()
            setCommuneList(await resCom)
        }
        getCommune()
    }, [district])

    function handleChangeCommune(event) {
        setCommune(event.target.value)
    }



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
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#338dbc',
                lineHeight: '1.3em'
            }}
            href="/myplace"
            onClick={handleClickToHome}
        >
            Cart
        </Link>,
        <Typography
            key="2"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#000D0A',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif'
            }}
        >
            Cart Information
        </Typography>,
        <Typography key="3"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#999999',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif'
            }}>
            Payment method
        </Typography>,
    ];

    return (
        <Grid container
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: 'white'
            }}
            spacing={1}
        >
            <Grid item xs={7} height="100%">
                <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                    <Stack direction="column"
                        sx={{
                            paddingBottom: '1em',
                            display: 'block'
                        }}>
                        <Button
                            sx={{
                                marginLeft: '-1.2%',
                                color: '#333333',
                                fontSize: '2em',
                                fontWeight: 'normal',
                                lineHeight: '1em',
                                display: 'block',
                                marginBlockStart: '0.67em',
                                marginBlockEnd: '0.67em',
                                background: 'white !important',
                                fontFamily: 'sans-serif'
                            }}

                        >ComeBuy
                        </Button>
                        <Stack direction="row"
                            sx={{
                                marginTop: '-2%',
                                listStyleType: 'none',
                                display: 'block',
                                marginBlockEnd: '1em',
                            }}
                        >
                            <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                                {breadcrumbs}
                            </Breadcrumbs>
                        </Stack>
                        <Stack marginTop="-3%">
                            <Typography
                                sx={{
                                    color: '#333333',
                                    fontSize: '1.28571em',
                                    fontWeight: 'normal',
                                    lineHeight: '1em',
                                    marginBlockStart: '0.83em',
                                    marginBlockEnd: '0.83em',
                                    display: 'block',
                                    fontFamily: 'sans-serif'
                                }}
                            >
                                Cart Information
                            </Typography>
                        </Stack>
                        <p
                            style={{
                                marginBlockStart: '1em',
                                marginBlockEnd: '1em',
                                display: 'block',
                                marginBottom: '0.75em',
                                lineHeight: '1.5em',
                                fontSize: '14px',
                                fontFamily: 'sans-serif',
                                marginTop: '0.1%'
                            }}
                        >
                            Did you have an account ?
                            <a href='/login'
                                style={{
                                    textDecoration: 'none',
                                    color: '#338dbc',
                                    transition: 'color 0.2s ease-in-out',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    lineHeight: '1.5em',
                                    marginLeft: '0.5%'
                                }}
                            >
                                Sign in
                            </a>
                        </p>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Full name"
                            variant="outlined"
                            sx={{
                                color: '#333333',
                                fontFamily: 'sans-serif',
                            }}
                        />
                        <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '0.25rem' }}>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Phone number"
                                    variant="outlined"
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Your address"
                            variant="outlined"
                            sx={{
                                color: '#333333',
                                fontFamily: 'sans-serif',
                                marginTop: '1.3rem'
                            }}
                        />
                        <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '0.25rem' }}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">City/Province</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={province}
                                        label="Province/City"
                                        onChange={handleChangeProvince}
                                    >
                                        {provinceList.map((province) => (
                                            <MenuItem value={province}>{province.name}</MenuItem>
                                        )
                                        )}
                                    </Select>
                                </FormControl>

                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">District</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={district}
                                        label="District"
                                        onChange={handleChangeDistrict}
                                    >
                                        {districtList.map((district) => (
                                            <MenuItem value={district}>{district.name}</MenuItem>
                                        )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Commune</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={commune}
                                        label="Commune"
                                        onChange={handleChangeCommune}
                                    >
                                        {communeList.map((commune) => (
                                            <MenuItem value={commune}>{commune.name}</MenuItem>
                                        )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                    </Stack>
                </Stack>
            </Grid>

            <Grid sx={{ backgroundColor: 'gray' }} height="100%" item xs={5}>

            </Grid>
        </Grid >
    )
}
