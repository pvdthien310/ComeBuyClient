import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Chip, CircularProgress, Icon, IconButton, Stack, styled } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import productAPI from '../../api/productAPI';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: 120,
    alignSelf: 'center'
});

const ProductInCart = (props) => {
    const [product, setProduct] = useState(null)
    const [amount, setAmount] = useState(props.productInCart.amount)

    const navigate = useNavigate()
    const handleNavigateToDetail = () => navigate('/productSpace/' + product.productID)

    useEffect(async () => {
        const response = await productAPI.getProductWithID(props.productInCart.productid)
        if (response.status == 200)
            setProduct(response.data)
        else
            console.log('Load product failed')
    }, [])

    useEffect(() => {
        setAmount(props.productInCart.amount)
        return () => {
            setAmount(0)
        }
    }, [props.productInCart.amount])

    return (
        <Card sx={{ p: 2, m: 1, boxShadow: 5 }}>
            {product != null ?
                <Stack direction={'row'} sx={{ height: '100%', alignContent: 'center' }} >
                    <Img alt="complex" sx={{ maxWidth: 180 }}
                        src={product.productimage[0].imageURL} />
                    <CardContent sx={{ maxWidth: 500 }}>
                        <Typography gutterBottom variant="body1" fontWeight={'bold'} component="div" onClick={handleNavigateToDetail}>
                            {product.name}
                        </Typography>
                        <Typography gutterBottom variant="body2" color='#868C7D' component="div">
                            Warranty {product.warranty}
                        </Typography>
                        <Stack sx={{ p: 1 }} spacing={1}>
                            <Box>
                                CPU: {product.cpu}
                            </Box>
                            <Box>
                                GPU: {product.gpu}
                            </Box>
                            <Box>
                                RAM: {product.ram}
                            </Box>
                            <Box>
                                Screen: {product.screenDimension}' inch
                            </Box>
                        </Stack>

                    </CardContent>
                    <Stack direction={'row'} sx={{ height: '10%', justifyContent: 'center', alignSelf: 'center', p: 2 }} spacing={1}>
                        <IconButton onClick={() => props.handleChangeAmount(props.productInCart.productid, 'decrease')} color="primary" aria-label="add to shopping cart">
                            <RemoveIcon />
                        </IconButton>
                        <Chip label={amount} sx={{ backgroundColor: '#B360E6', color: 'white' }} />
                        <IconButton onClick={() => props.handleChangeAmount(props.productInCart.productid, 'increase')} color="primary" aria-label="add to shopping cart">
                            <AddIcon />
                        </IconButton>
                    </Stack>
                    <Typography variant="body1" fontWeight={'bold'} sx={{ textAlign: 'end', alignSelf: 'center', minWidth: 100 }} color="#D94A56">
                        $ {product.price * amount}
                    </Typography>
                </Stack>
                :
                <Stack>
                    <CircularProgress></CircularProgress>
                </Stack>
            }
        </Card>
    );
}
export default ProductInCart;