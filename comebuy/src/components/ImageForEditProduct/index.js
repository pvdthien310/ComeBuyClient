import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, styled } from '@mui/material';

import style from './style.js'

const DeleteButton = styled(Button)(({ theme }) => ({
    alignSelf: 'flex-start',
    margin: 10,
    backgroundColor: '#F51B06',
    '&:hover': {
        backgroundColor: '#A81B06',
    }
}))

const ProductImage = styled('img')(({ theme }) => ({
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
}))

const ImageForEditProduct = ({ image }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid sx={style.container}>
            <ProductImage item="true" xs={12} src={image}></ProductImage>
            <DeleteButton item="true" variant="contained" onClick={handleClickOpen} startIcon={<DeleteIcon />}>Delete</DeleteButton>
            <Dialog
                item="true"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default ImageForEditProduct;