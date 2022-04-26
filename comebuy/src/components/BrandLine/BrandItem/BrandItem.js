import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CustomButton = styled(Button)(() => ({
  backgroundColor: 'black'
}));

export default function BrandItem() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 380,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-14-digitalmat-gallery-1-202111?wid=364&hei=333&fmt=png-alpha&.v=1635183223000" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <CustomButton variant="contained"
                endIcon={<ShoppingCartIcon />}
              >Buy Now</CustomButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $200.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}