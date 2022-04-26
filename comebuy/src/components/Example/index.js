import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductItem, SnackBarAlert } from "../../components";
import { getAllProduct } from "../../redux/slices/productSlice";

const Example = () => {
    return (
        <Grid container sx={{ width: '100%', height: '100%', p: 2,marginTop :2, backgroundColor:'#6260A6'}} spacing={1}>
            <Grid item xs={6} sx={{alignItems:'center'}}>
                <Stack sx={{ height: '100%', width: '90%' }} >
                    <Box sx={{ backgroundColor: 'white', p: 2, height: '100%', width: '100%', boxShadow: 5, borderRadius: 10 }}>
                        <Typography>asdsd</Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={6} >
                <Stack sx={{ height: '100%', width: '90%' }} >
                    <Box sx={{ backgroundColor: 'white', p: 2, height: '100%', width: '100%', boxShadow: 5, borderRadius: 10 }}>
                        <Typography>asdsd</Typography>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    )
}
export default Example