import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const DetailProductModal = ({ open, product, onClose }) => {

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    product != null ?
                        <Box sx={style}>
                            <Grid container>
                                <Grid xs ={11}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {product.name}
                                    </Typography>
                                </Grid>
                                <Grid xs ={1}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Detail
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Box sx ={{ 
                                height: 5,
                                weight: '100%',
                                backgroundColor: '#2A93BD',
                                marginTop:'10px',
                                marginBottom: '20px'
                            }}></Box>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                            </Typography>
                            <Button onClick={onClose} variant="contained">Close</Button>
                        </Box>
                        : <Typography variant='h6'>No Data</Typography>
                }
            </Modal>
        </div>
    );
}
export default DetailProductModal;