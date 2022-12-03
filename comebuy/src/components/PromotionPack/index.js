import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, Stack, styled } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: 120,
    alignSelf: 'center',
});

function PromotionPack(props) {
    return (
        <Card sx={{ p: 2, m: 1, boxShadow: 5 }}>
            <Stack direction="row" sx={{ height: '100%', justifyContent: 'space-between' }}>
                <Stack direction="row">
                    <Img
                        alt="complex"
                        sx={{ maxWidth: 180, margin: 0 }}
                        src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1215&q=80"
                    />
                    <CardContent sx={{ maxWidth: 500 }}>
                        <Typography gutterBottom variant="body1" fontWeight="bold" component="div">
                            Percent: {props.pack.promotion}%
                        </Typography>
                        <Typography gutterBottom variant="body2" color="#868C7D" component="div">
                            Amount: {props.pack.productids.length}
                        </Typography>
                    </CardContent>
                </Stack>
                <Stack
                    direction="row"
                    sx={{ height: '10%', justifyContent: 'center', alignSelf: 'center', p: 2, marginLeft: '3%' }}
                    spacing={1}
                >
                    <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() => props.deletePack(props.pack)}
                    >
                        <ClearIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Card>
    );
}
export default PromotionPack;
