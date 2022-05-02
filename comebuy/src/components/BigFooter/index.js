import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";

import styled from "styled-components";
import { mobile } from "../../container/CustomerCart/responsive";
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { Link } from "@material-ui/core";

import { accountSlice } from "../../redux/slices/accountSlice";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const BigFooter = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const gotoHome = () => navigate('/')
  const gotoCart = () => navigate('/myplace/mycart')
  const gotoFavorite = () => alert("Go to favorite chua lam")
  const gotoPlace = () => navigate('/myplace')
  const gotoOrders = () => alert("Orders chua lam")

  const logOut = async () => {
    dispatch(accountSlice.actions.logout());
    await localStorage.setItem('role', null)
    navigate("/")
  }

  return (
    <Container>
      <Left>
        <Logo>COMEBUY.</Logo>
        <Desc>
          ComeBuy is a web store which includes a lot of the best laptop in the world.
          Come with us, you will never be confused about choosing, type, proper price of Laptop you want
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          {/* <ListItem onClick={gotoHome} style={{
            textDecoration: 'underline',
          }}>
            Home
          </ListItem> */}
          <ListItem>
            <Link
              underline="hover"
              key="2"
              style={{ color: 'black' }}
              onClick={gotoHome}
            >
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link
              underline="hover"
              key="2"
              style={{ color: 'black' }}
              onClick={gotoCart}
            >
              Your cart
            </Link>
          </ListItem>
          <ListItem>
            <Link
              underline="hover"
              key="2"
              style={{ color: 'black' }}
              onClick={gotoPlace}
            >
              Your place
            </Link>
          </ListItem>
          <ListItem>
            <Link
              underline="hover"
              key="2"
              style={{ color: 'black' }}
              onClick={gotoFavorite}
            >
              Your favorite
            </Link>
          </ListItem>
          <ListItem>
            <Link
              underline="hover"
              key="2"
              style={{ color: 'black' }}
              onClick={gotoOrders}
            >
              Your orders
            </Link>
          </ListItem>
          <ListItem>
            <Link
              underline="hover"
              key="2"
              style={{ color: 'black' }}
              onClick={logOut}
            >
              Log out
            </Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> KTPM2019, Software engineering team 89, UIT
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +84 358075274
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> comebuyproject@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default BigFooter;