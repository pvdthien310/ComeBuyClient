import React, { useState, useEffect } from 'react'
import { Add, DeleteForeverOutlined, Remove } from "@material-ui/icons";
import styled from "styled-components";
import NavBar from "../../components/NavBar/NavBar";
import { BigFooter, ProductInFavorite } from '../../components';
import { mobile } from "./responsive";

import { Typography, Link } from '@mui/material';
import { Stack, Breadcrumbs } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


import { useNavigate } from 'react-router';
import { getAllFavorite, deleteFavoriteById } from './../../redux/slices/favoriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { currentUser } from '../../redux/selectors';
import { getProductWithID } from '../../redux/slices/productSlice';
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import { addCart } from '../../redux/slices/cartSlice';

const Container = styled.div`
    background-color: white
`;

const Wrapper = styled.div`
  padding: 20px;
 background-color: #F2EBDF
  ${mobile({ padding: "10px" })}
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

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#2C4001" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center,
  ${mobile({ flexDirection: "column" })}

`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='d' ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const actions = [
  { icon: <ShoppingCartCheckoutOutlined />, name: 'Get all to cart' },
  { icon: <DeleteForeverOutlined />, name: 'Delete all favorite' }
];

const FavoritePlace = () => {

  const dispatch = useDispatch()
  const _currentUser = useSelector(currentUser)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [favoriteList, setFavoriteList] = useState([])
  const [prodList, setProdList] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [isMovingToCart, setIsMovingToCart] = useState(false);
  const handleCloseMovingToCart = () => {
    setIsMovingToCart(false);
  };

  const handleToggleIsMovingToCart = () => {
    setIsMovingToCart(!isMovingToCart);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const fetchYourFavorite = async (listFavorite, listProduct) => {
    let temp = []
    try {
      const resultAction = await dispatch(getAllFavorite())
      const originalPromiseResult = unwrapResult(resultAction)
      temp = originalPromiseResult
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].userid === _currentUser.userID) {
          listFavorite.push(temp[i])
          const resultAction2 = await dispatch(getProductWithID(temp[i].productid))
          const originalPromiseResult2 = unwrapResult(resultAction2)
          listProduct.push(originalPromiseResult2)
        }
      }
      setIsLoading(false)
      await CountTotal(listFavorite, listProduct)
    } catch (rejectedValueOrSerializedError) {
      return rejectedValueOrSerializedError
    }
  }

  const CountTotal = async (_favorite, prList) => {
    let newTotal = 0
    await _favorite.map((item) => {
      let rs = prList.find((ite) => ite.productID == item.productid)
      if (rs != undefined)
        newTotal = newTotal + Number(Number(rs.price) * Number(item.amount))
    })
    setSubTotal(newTotal)
  }

  useEffect(() => {
    if (isLoading === true) {
      let listFavorite = []
      let listProduct = []
      let tempSubTotal = 0
      fetchYourFavorite(listFavorite, listProduct)
      setFavoriteList(listFavorite)
      setProdList(listProduct)
    }
  }, [])

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [openMoveToCartSuccess, setOpenMoveToCartSuccess] = useState(false)

  const handleCloseMoveToCartSuccess = () => setOpenMoveToCartSuccess(false)

  const handleMoveItemToMyCart = async (value) => {
    console.log(value)
    setIsMovingToCart(true)
    let newCart = {
      userID: _currentUser.userID,
      productID: value.productid,
      amount: 1
    }
    //addCart to db
    try {
      const resultAction = await dispatch(addCart(newCart))
      const originalPromiseResult = unwrapResult(resultAction)
      console.log(originalPromiseResult)
    } catch (rejectedValueOrSerializedError) {
      alert(rejectedValueOrSerializedError)
    }
    //delete favorite
    try {
      const resultAction = await dispatch(deleteFavoriteById(value.favoriteID))
      const originalPromiseResult = unwrapResult(resultAction)
      var index = favoriteList.indexOf(value)
      if (index !== -1) {
        favoriteList.splice(index, 1)
      }
      handleCloseMovingToCart()
      setOpenMoveToCartSuccess(true)
    } catch (rejectedValueOrSerializedError) {
      alert(rejectedValueOrSerializedError)
    }
  }

  //handle agree dis-cart
  const handleAgree = async (item) => {
    alert('dislike this product')
  }

  const [openDeleteAllSuccess, setOpenDeleteAllSuccess] = useState(false)
  const handleCloseDeleteAllSuccess = () => setOpenDeleteAllSuccess(false)

  const [openMoveAllSuccess, setOpenMoveAllSuccess] = useState(false)
  const handleCloseMoveAllSuccess = () => setOpenMoveAllSuccess(false)

  const handleDeleteAllFavorite = () => {
    setIsMovingToCart(true) //backdrop
    favoriteList.map((i) => {
      dispatch(deleteFavoriteById(i.favoriteID))
    }
    )
    favoriteList.splice(0, favoriteList.length)
    handleCloseMovingToCart()
    handleCloseConfirmDelete()
    setOpenDeleteAllSuccess(true)
  }

  const handlePlaceAllToCart = () => {
    setIsMovingToCart(true) //backdrop
    favoriteList.map((i) => {
      dispatch(addCart({
        userID: _currentUser.userID,
        productID: i.productid
      }))
      dispatch(deleteFavoriteById(i.favoriteID))
    })
    favoriteList.splice(0, favoriteList.length)
    handleCloseMovingToCart()
    handleCloseConfirmMove()
    setOpenMoveAllSuccess(true)
  }

  const handleSpeedDialClick = (action) => {
    if (action.name === 'Get all to cart') {
      if (favoriteList.length != 0) {
        setOpenConfirmMove(true)
      }
    } else {
      if (favoriteList.length != 0) {
        setOpenConfirmDelete(true)
      }
    }
  }

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const handleCloseConfirmDelete = () => setOpenConfirmDelete(false)

  const [openConfirmMove, setOpenConfirmMove] = useState(false)
  const handleCloseConfirmMove = () => setOpenConfirmMove(false)

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
      style={{ color: '#000D0A' }}
      href="/myplace"
      onClick={handleClickToHome}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      style={{ color: '#000D0A' }}
      href="/myplace"
      onClick={handleClick}
    >
      My place
    </Link>,
    <Typography key="3" style={{ color: '#000D0A' }}>
      My Favorite
    </Typography>,
  ];

  const gotoProductScreen = () => navigate('/productSpace')
  const [num, setNum] = useState(2)

  return (
    <Container>
      <NavBar hiddenCartLabel={false} />
      <Stack direction="row"
        spacing={3}
        style={{ marginLeft: '15%', marginTop: '1%' }}
      >
        <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Wrapper>
        <Title>YOUR FAVORITE</Title>
        <Top>
          <TopTexts style={{ marginLeft: '12%' }}>
            <TopText>Your Favorite ({favoriteList.length})</TopText>
            <TopText>Shopping Bag()</TopText>
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
            {
              favoriteList.map((item, i) => (
                <>
                  <ProductInFavorite key={i} handleMoveItemToCart={handleMoveItemToMyCart} productInFavorite={item} ></ProductInFavorite>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Discart"}</DialogTitle>
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
                </>
              ))
            }
          </Stack>
        </Bottom>

      </Wrapper>
      <BigFooter />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isMovingToCart}
      >
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
          Deleted all successfully
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
    </Container >
  );
};

export default FavoritePlace;