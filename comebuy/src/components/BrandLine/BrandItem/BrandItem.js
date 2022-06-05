import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from 'react-router-dom'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CustomButton = styled(Button)(() => ({
  backgroundColor: 'black'
}));

const BrandItem = (props) => {
  const navigate = useNavigate()

  return (
    <Paper
      onClick={() => navigate("/productSpace/" + props.item.productID)}
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 380,
        maxHeight: 200,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.item.productimage[0].imageURL} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle2" component="div">
                {props.item.name.split(' (')[0]}
              </Typography>
              <Typography variant="body2" gutterBottom>
               {props.item.screenDimension}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.item.productID}
              </Typography>
            </Grid>
            <Grid item>
              <CustomButton variant="contained"
                endIcon={<ShoppingCartIcon />}
              >Buy Now</CustomButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div" color='error'>
              ${props.item.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default BrandItem;