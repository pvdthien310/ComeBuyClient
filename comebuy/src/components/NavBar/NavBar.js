import React, { useEffect, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from '../../assets/img/logo-removebg.png';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cartListSelector, currentUser, isSignedIn_user } from './../../redux/selectors'
import { accountSlice } from './../../redux/slices/accountSlice'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '150%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const CartButton = styled(Button)(({ theme }) => ({
    borderRadius: 20,
    backgroundColor: '#B360E6',
    color: 'white',
    '&:hover': {
        backgroundColor: '#B360A0',
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavBar(props) {
    // const _isSignedIn = useSelector(isSignedIn_user)
    const _currentUser = useSelector(currentUser)
    let isSignedIn = (localStorage.getItem('role') !== '') ? true : false
    const _cart = useSelector(cartListSelector)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [numberCart, setNumberCart] = useState(JSON.parse(localStorage.getItem('cart')).length)
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const selections_1 = ['Sign In']
    const selections_2 = ['My place', 'Log Out']

    useEffect(() => {
        setNumberCart(_cart.length)
    })

    const handleLogin = () => {
        navigate('/login')
    }

    const handleMyPlace = () => {
        navigate('/myplace')
    }

    const navigateToCart = () => {
        if (localStorage.getItem('role') == '')
            navigate('/guestCart')
        else if (localStorage.getItem('role') == 'customer') {
            navigate('/myplace/mycart')
        }
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = async (e) => {
        setAnchorEl(null);
        handleMobileMenuClose();

        if (e.target.innerText === 'Sign In')
            handleLogin();
        else if (e.target.innerText === 'Log Out') {
            dispatch(accountSlice.actions.logout());
            localStorage.setItem('role', '')
            localStorage.setItem('idUser', '')
            localStorage.setItem('cart', JSON.stringify([]));
            navigate(0)
        } else if (e.target.innerText === 'My place') {
            handleMyPlace();
        }
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Box>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {
                    !isSignedIn ?
                        <div>
                            {selections_1.map((sel) => (
                                <MenuItem key={sel} onClick={handleMenuClose}>
                                    {sel}
                                </MenuItem>
                            ))}
                        </div>
                        :
                        <div>
                            {selections_2.map((sel) => (
                                <MenuItem key={sel} onClick={handleMenuClose}>
                                    {sel}
                                </MenuItem>
                            ))}
                        </div>
                }
            </Menu>
        </Box>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: 'white', padding: 2 }}>
                <Toolbar>

                    {/* <Typography variant="h5" fontWeight={'bold'} sx={{
                        color: 'black',
                        fontFamily: 'Monospace',
                        textDecoration: 'underline',
                        alignSelf: 'center',
                        cursor: 'pointer',
                    }}
                        onClick={() => navigate("/")}>
                        ComeBuy</Typography> */}
                    <img style={{ width: 120, backgroundSize: 'cover', cursor: 'pointer' }}
                        onClick={() => navigate("/")}
                        src={logo}></img>

                    <Box sx={{ flexGrow: 1 }} />
                    {
                        (localStorage.getItem('role') == 'customer' || localStorage.getItem('role') == '' && props.hiddenCartLabel != false) &&
                        <CartButton onClick={navigateToCart} variant="contained" endIcon={<ShoppingCartIcon />}>
                            {numberCart}
                        </CartButton>
                    }
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 1 }}>
                        <Button
                            size='small'
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            sx={{ color: 'gray', borderColor: 'black', fontWeight: 'bold' }}
                        >
                            <MenuIcon></MenuIcon>
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
