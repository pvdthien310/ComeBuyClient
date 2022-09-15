/* eslint-disable jsx-a11y/alt-text */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack, TextField } from '@mui/material';
import style from './style';

function AddBannerModal(props) {
    const [image, SetImage] = useState(null);
    const [imageFromURL, SetImageFromURL] = useState(null);

    const HandleImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            SetImage(reader.result);
        };
    };
    return (
        <Modal
            open={props.open}
            onClose={() => props.SetOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack sx={style.container}>
                <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight="bold">
                    New Banner
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.type}
                            label="Type"
                            onChange={(e) => props.SetType(e.target.value)}
                        >
                            <MenuItem value={1}>URL</MenuItem>
                            <MenuItem value={2}>From Device</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {props.type === 1 ? (
                    <Stack sx={{ p: 2, m: 1 }}>
                        <TextField sx={{ minWidth: 550 }} onChange={(e) => SetImageFromURL(e.target.value)} />
                        {imageFromURL && (
                            <img src={imageFromURL} style={{ height: 300, width: 500, alignSelf: 'center' }} />
                        )}
                    </Stack>
                ) : (
                    <Stack>
                        <input style={{ padding: 2, margin: 5 }} accept="image/*" type="file" onChange={HandleImage} />
                        {image && <img src={image} style={{ height: 300, width: 400 }} />}
                    </Stack>
                )}
                <Button onClick={async () => props.UploadNewBanner(image, imageFromURL)}>Submit</Button>
                <Button onClick={() => props.SetOpenModal(false)}>Close</Button>
            </Stack>
        </Modal>
    );
}

export default AddBannerModal;
