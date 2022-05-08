import React, { useState, useEffect } from 'react'
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import NavBar from "../../components/NavBar/NavBar";
import { BigFooter, ProductInCart } from '../../components';
import { mobile } from "./responsive";

import { Typography, Link } from '@mui/material';
import { Stack, Breadcrumbs } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router';
import { getAllCart } from './../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { currentUser } from '../../redux/selectors';
import { getProductWithID } from '../../redux/slices/productSlice';

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
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;
const ProductBrand = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #254031;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  // border: 0.5px solid lightslategrey;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  box-shadow: 2px 2px 2px 2px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const CustomerCart = () => {

  const dispatch = useDispatch()
  const _currentUser = useSelector(currentUser)

  const [isLoading, setIsLoading] = useState(true)
  const [cartList, setCartList] = useState([])
  const [prodList, setProdList] = useState([])

  const fetchYourCart = async (listCart, listProduct) => {
    let temp = []
    try {
      const resultAction = await dispatch(getAllCart())
      const originalPromiseResult = unwrapResult(resultAction)
      temp = originalPromiseResult
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].userid === _currentUser.userID) {
          listCart.push(temp[i])
          const resultAction2 = await dispatch(getProductWithID(temp[i].productid))
          const originalPromiseResult2 = unwrapResult(resultAction2)
          listProduct.push(originalPromiseResult2)
        }
      }
      setIsLoading(false)
    } catch (rejectedValueOrSerializedError) {
      return rejectedValueOrSerializedError
    }
  }

  useEffect(() => {
    if (isLoading === true) {
      let listCart = []
      let listProduct = []
      fetchYourCart(listCart, listProduct)
      setCartList(listCart)
      setProdList(listProduct)
    }
  }, [])

  function handleClick(event) {
    event.preventDefault();
    navigate('/myplace')
  }

  function handleClickToHome(event) {
    event.preventDefault();
    navigate('/')
  }

  const navigate = useNavigate()
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
      My Cart
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
        <Title>YOUR CART</Title>
        <Top>
          <TopButton onClick={gotoProductScreen}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cartList.length})</TopText>
            <TopText>Your Favorite (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          {/* <Info>
            {cartList.map((p) => (
              <div>
                <Product>
                  <ProductDetail>
                    {prodList.map((i) => (
                      i.productID === p.productid ? (
                        <Image src={i.productimage[0].imageURL} />
                      ) : (
                        null
                      )
                    ))}
                    <Details>
                      <ProductName>
                        <b>Prod:</b> {p.product.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {p.productid}
                      </ProductId>
                      {prodList.map((i) => (
                        i.productID === p.productid ? (
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}>
                            <ProductBrand>
                              <b>Brand:</b> {i.brand}
                            </ProductBrand>
                            <ProductBrand>
                              <b>Memory/RAM/Weight:</b> {`${i.memory} GB/${i.ram} GB/${i.weight} kg`}
                            </ProductBrand>
                          </div>
                        ) : (
                          null
                        )
                      ))}
                    </Details>
                    {console.log(cartList)}
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{p.amount}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice></ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info> */}
          <Stack sx={{ m: 2, p: 2 }}>
            {
              cartList.map((item, i) => (
                <ProductInCart key={i} productInCart={item} handleChangeAmount={() => { console.log(item) }}></ProductInCart>
              ))
            }
          </Stack>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <BigFooter />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default CustomerCart;