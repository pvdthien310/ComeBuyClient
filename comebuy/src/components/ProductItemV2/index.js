import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress, Stack, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import productAPI from '../../api/productAPI';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: 120,
    alignSelf: 'center',
});

function ProductItemV2(props) {
    const [product, setProduct] = useState(null);

    useEffect(async () => {
        const response = await productAPI.getProductWithID(props.productid);
        if (response.status === 200) setProduct(response.data);
        else alert('Load product failed');
    }, []);

    return (
        <Card sx={{ p: 1, m: 1, boxShadow: 5 }}>
            {product != null ? (
                <Stack direction="row" sx={{ height: '100%', alignContent: 'center' }}>
                    <Img alt="complex" sx={{ maxWidth: 150 }} src={product.productimage[0].imageURL} />
                    <CardContent sx={{ maxWidth: 400 }}>
                        <Typography gutterBottom variant="body1" fontWeight="bold" component="div">
                            {product.name}
                        </Typography>
                        <Typography gutterBottom variant="body2" color="#868C7D" component="div">
                            Warranty {product.warranty}
                        </Typography>
                        <Stack sx={{ p: 1 }} spacing={1}>
                            <Box>CPU: {product.cpu}</Box>
                            <Box>GPU: {product.gpu}</Box>
                            <Box>RAM: {product.ram}</Box>
                            <Box>Screen: {product.screenDimension}' inch</Box>
                        </Stack>
                    </CardContent>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ marginLeft: '5%', textAlign: 'end', alignSelf: 'center', minWidth: 100 }}
                        color="#D94A56"
                    >
                        ${product.price} -&gt; ${Math.round((product.price * (100 - product.promotion)) / 100)}
                    </Typography>
                </Stack>
            ) : (
                <Stack>
                    <CircularProgress />
                </Stack>
            )}
        </Card>
    );
}
export default ProductItemV2;
