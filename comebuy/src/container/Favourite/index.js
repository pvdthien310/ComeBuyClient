/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-props-no-spreading */
// importation from libs
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

// Importation from mui
import styled from 'styled-components';
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import { DeleteForeverOutlined } from '@material-ui/icons';
import {
    Typography,
    Link,
    Stack,
    Breadcrumbs,
    Button,
    createFilterOptions,
    TextField,
    Autocomplete,
    Pagination,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

// Importation from component
import NavBar from '../../components/NavBar/NavBar';
import { BigFooter, ProductInFavorite } from '../../components';
import { mobile } from './responsive';

// Importation from slices, api,...
import { deleteFavoriteById } from '../../redux/slices/favoriteSlice';
import { currentUser } from '../../redux/selectors';
import { addCart } from '../../redux/slices/cartSlice';
import favoriteApi from '../../api/favoriteAPI';

const Container = styled.div`
    background-color: white;
`;

const Wrapper = styled.div`
    padding: 20px;
    background-color: #f2ebdf ${mobile({ padding: '10px' })};
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    // font-family: serif
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopTexts = styled.div`
    ${mobile({ display: 'none' })}
`;

const Bottom = styled.div`
    display: flex;
    justify-content: center, ${mobile({ flexDirection: 'column' })};
`;

const Transition = React.forwardRef((props, ref) => <Slide direction="d" ref={ref} {...props} />);

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const actions = [
    { icon: <ShoppingCartCheckoutOutlined />, name: 'Get all to cart' },
    { icon: <DeleteForeverOutlined />, name: 'Delete all favorite' },
];

const filter = createFilterOptions();

function FavoritePlace() {
    // dispatch, selector, navigate,..
    const dispatch = useDispatch();
    const _currentUser = useSelector(currentUser);
    const navigate = useNavigate();

    // data state
    const [favoriteList, setFavoriteList] = useState([]);

    // process situation states
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isMovingToCart, setIsMovingToCart] = useState(false);
    const [openMoveToCartSuccess, setOpenMoveToCartSuccess] = useState(false);
    const [openDeleteAllSuccess, setOpenDeleteAllSuccess] = useState(false);
    const [openMoveAllSuccess, setOpenMoveAllSuccess] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [openConfirmMove, setOpenConfirmMove] = useState(false);
    const [total, SetTotal] = useState(0);

    // function middle handler
    const handleCloseMovingToCart = () => {
        setIsMovingToCart(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseMoveToCartSuccess = () => setOpenMoveToCartSuccess(false);
    const handleCloseDeleteAllSuccess = () => setOpenDeleteAllSuccess(false);
    const handleCloseMoveAllSuccess = () => setOpenMoveAllSuccess(false);
    const handleCloseConfirmDelete = () => setOpenConfirmDelete(false);
    const handleCloseConfirmMove = () => setOpenConfirmMove(false);
    const handleAgree = async () => {
        alert('dislike this product');
    };

    // const CountTotal = async (_favorite, prList) => {
    //     // let newTotal = 0;
    //     await _favorite.map((item) => {
    //         const rs = prList.find((ite) => ite.productID === item.productid);
    //         if (rs !== undefined) newTotal += Number(Number(rs.price) * Number(item.amount));
    //     });
    //     // setSubTotal(newTotal);
    // };

    // task function
    // const fetchYourFavorite = async (listFavorite, listProduct) => {
    //     let temp = [];
    //     try {
    //         const resultAction = await dispatch(getAllFavorite());
    //         const originalPromiseResult = unwrapResult(resultAction);
    //         temp = originalPromiseResult;
    //         for (let i = 0; i < temp.length; i++) {
    //             if (temp[i].userid === _currentUser.userID) {
    //                 listFavorite.push(temp[i]);
    //                 const resultAction2 = await dispatch(getProductWithID(temp[i].productid));
    //                 const originalPromiseResult2 = unwrapResult(resultAction2);
    //                 listProduct.push(originalPromiseResult2);
    //             }
    //         }
    //         setIsLoading(false);
    //         // await CountTotal(listFavorite, listProduct);
    //     } catch (rejectedValueOrSerializedError) {
    //         return rejectedValueOrSerializedError;
    //     }
    // };

    const handleDeleteOneFav = async (value) => {
        setIsMovingToCart(true);
        try {
            await dispatch(deleteFavoriteById(value.favoriteID));
            const index = favoriteList.indexOf(value);
            if (index !== -1) {
                favoriteList.splice(index, 1);
            }
            handleCloseMovingToCart();
            setOpenDeleteAllSuccess(true);
        } catch (rejectedValueOrSerializedError) {
            alert(rejectedValueOrSerializedError);
        }
    };

    const handleMoveItemToMyCart = async (value) => {
        setIsMovingToCart(true);
        const newCart = {
            userID: _currentUser.userID,
            productID: value.productid,
            amount: 1,
        };
        // addCart to db
        try {
            const resultAction = await dispatch(addCart(newCart));
            const originalPromiseResult = unwrapResult(resultAction);
            console.log(originalPromiseResult);
        } catch (rejectedValueOrSerializedError) {
            alert(rejectedValueOrSerializedError);
        }
        // delete favorite
        try {
            await dispatch(deleteFavoriteById(value.favoriteID));
            const index = favoriteList.indexOf(value);
            if (index !== -1) {
                favoriteList.splice(index, 1);
            }
            handleCloseMovingToCart();
            setOpenMoveToCartSuccess(true);
        } catch (rejectedValueOrSerializedError) {
            alert(rejectedValueOrSerializedError);
        }
    };
    const handleDeleteAllFavorite = () => {
        setIsMovingToCart(true); // backdrop
        favoriteList.map((i) => {
            dispatch(deleteFavoriteById(i.favoriteID));
        });
        favoriteList.splice(0, favoriteList.length);
        handleCloseMovingToCart();
        handleCloseConfirmDelete();
        setOpenDeleteAllSuccess(true);
    };
    const handlePlaceAllToCart = () => {
        setIsMovingToCart(true); // backdrop
        favoriteList.map((i) => {
            dispatch(
                addCart({
                    userID: _currentUser.userID,
                    productID: i.productid,
                }),
            );
            dispatch(deleteFavoriteById(i.favoriteID));
        });
        favoriteList.splice(0, favoriteList.length);
        handleCloseMovingToCart();
        handleCloseConfirmMove();
        setOpenMoveAllSuccess(true);
    };
    const handleSpeedDialClick = (action) => {
        if (action.name === 'Get all to cart') {
            if (favoriteList.length !== 0) {
                setOpenConfirmMove(true);
            }
        } else if (favoriteList.length !== 0) {
            setOpenConfirmDelete(true);
        }
    };
    const handleClick = (event) => {
        event.preventDefault();
        navigate('/myplace');
    };

    const handleClickToHome = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const fetchYourFavorite1 = async (offset) => {
        try {
            const res = await favoriteApi.getByOffset(offset);
            if (res.status === 200) {
                setFavoriteList(
                    res.data.map((item) => {
                        const object = { productid: item.productid };
                        return object;
                    }),
                );
                setIsLoading(false);
                SetTotal(res.data[0].total);
            } else {
                console.log('Load Favorite Failed');
                setIsLoading(false);
            }
        } catch (rejectedValueOrSerializedError) {
            return rejectedValueOrSerializedError;
        }
    };

    // useEffect..
    useEffect(() => {
        if (isLoading === true) {
            // const listFavorite = [];
            // const listProduct = [];
            // fetchYourFavorite(listFavorite, listProduct);
            fetchYourFavorite1(1);
            // setFavoriteList(listFavorite);
            // setProdList(listProduct);
        }
    }, []);

    useEffect(() => {
        console.log(favoriteList);
    }, [favoriteList]);

    // Breadcrumb
    const breadcrumbs = [
        <Link underline="hover" key="2" style={{ color: '#000D0A' }} href="/myplace" onClick={handleClickToHome}>
            Home
        </Link>,
        <Link underline="hover" key="2" style={{ color: '#000D0A' }} href="/myplace" onClick={handleClick}>
            My place
        </Link>,
        <Typography key="3" style={{ color: '#000D0A' }}>
            My Favorite
        </Typography>,
    ];

    return (
        <Container>
            <NavBar hiddenCartLabel={false} />
            <Stack direction="row" spacing={3} style={{ marginLeft: '15%', marginTop: '1%' }}>
                <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Wrapper>
                <Title>YOUR FAVORITE</Title>
                <Top>
                    <TopTexts style={{ marginLeft: '12%' }}>
                        <Autocomplete
                            onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    return newValue;
                                }
                                if (newValue && newValue.inputValue) {
                                    return newValue.inputValue;
                                }
                                // setDescription(newValue);
                                // setPrice(newValue.price)
                                // setCurrentProduct(newValue)
                                // setOpenModal(true)
                                navigate(`/productSpace/${newValue.productid}`);
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option.name);
                                if (inputValue !== '' && !isExisting) {
                                    return filtered;
                                }
                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="free-solo-with-text-demo"
                            options={favoriteList}
                            getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option;
                                }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                // Regular option
                                return option.product.name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.product.name}</li>}
                            sx={{ width: 500 }}
                            freeSolo
                            renderInput={(params) => <TextField {...params} label="Search your Favorite" />}
                        />
                    </TopTexts>
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        sx={{ top: 0, right: 16, marginRight: '20%' }}
                        icon={<SpeedDialIcon />}
                        direction="left"
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => handleSpeedDialClick(action)}
                            />
                        ))}
                    </SpeedDial>
                    {/* <TopButton onClick={handlePlaceAllToCart} type="filled">Add all to cart</TopButton> */}
                </Top>
                <Bottom>
                    <Stack sx={{ marginLeft: '12%', p: 2 }}>
                        {favoriteList.map((item) => (
                            <Stack key={item.productid}>
                                <ProductInFavorite
                                    handleDeleteOneFavorite={handleDeleteOneFav}
                                    handleMoveItemToCart={handleMoveItemToMyCart}
                                    productInFavorite={item}
                                />
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>Discart</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Are you sure want de-Favorite this product ?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={() => handleAgree(item)}>Ok</Button>
                                    </DialogActions>
                                </Dialog>
                            </Stack>
                        ))}
                        {Math.ceil(total / 3) > 1 && (
                            <Pagination
                                sx={{ alignSelf: 'center', m: 1 }}
                                count={Math.ceil(total / 3)}
                                color="secondary"
                                onChange={async (e) => {
                                    await fetchYourFavorite1(e.target.textContent);
                                }}
                            />
                        )}
                    </Stack>
                </Bottom>
            </Wrapper>
            <BigFooter />
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isMovingToCart}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    Add some product ti your cart first
                </Alert>
            </Snackbar>

            <Snackbar open={openMoveToCartSuccess} autoHideDuration={6000} onClose={handleCloseMoveToCartSuccess}>
                <Alert onClose={handleCloseMoveToCartSuccess} severity="success" sx={{ width: '100%' }}>
                    Added to cart successfully
                </Alert>
            </Snackbar>

            <Snackbar open={openDeleteAllSuccess} autoHideDuration={6000} onClose={handleCloseDeleteAllSuccess}>
                <Alert onClose={handleCloseDeleteAllSuccess} severity="success" sx={{ width: '100%' }}>
                    Deleted favorite successfully
                </Alert>
            </Snackbar>

            <Snackbar open={openMoveAllSuccess} autoHideDuration={6000} onClose={handleCloseMoveAllSuccess}>
                <Alert onClose={handleCloseMoveAllSuccess} severity="success" sx={{ width: '100%' }}>
                    Added all to cart successfully
                </Alert>
            </Snackbar>

            <Dialog
                open={openConfirmDelete}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Confirm task</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to delete all your favorite product ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDelete}>Cancel</Button>
                    <Button onClick={handleDeleteAllFavorite}>Ok</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfirmMove}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Confirm task</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to add all your favorite product to cart ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmMove}>Cancel</Button>
                    <Button onClick={handlePlaceAllToCart}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default FavoritePlace;
