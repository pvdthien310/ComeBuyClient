/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Stack, Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import style from './style';
import requestProdApi from '../../api/requestProductAPI';
import ProdItem from './ProdItem';

export default function ProductReqDetail(props) {
    const [request, setRequest] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => setOpenBackdrop(false);

    useEffect(async () => {
        await requestProdApi.getReqById(props.request.requestProductId).then((data) => {
            setRequest(data.data);
            console.log(data.data);
        });
    }, []);

    return (
        <div>
            <Modal open={props.open} onClose={props.closeModal}>
                <Box sx={style.container}>
                    <Stack direction="column" width="100%">
                        <Stack direction="row" sx={{ width: '100%', flexDirection: 'space-between' }}>
                            <Stack direction="row" spacing={1} width="100%" alignSelf="flex-start">
                                <InfoIcon color="primary" />
                                <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                                    Product request details
                                </Typography>
                            </Stack>
                            <Stack width="100%">
                                <IconButton onClick={props.closeModal} sx={{ alignSelf: 'flex-end' }}>
                                    <HighlightOffRoundedIcon color="error" />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Stack>
                                <Typography sx={{ fontWeight: 'bold' }}>From branch:</Typography>
                            </Stack>
                            <Stack>
                                <span style={{ fontStyle: 'italic' }}>{request?.fromBranchId}</span>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Stack>
                                <Typography sx={{ fontWeight: 'bold' }}>To branch:</Typography>
                            </Stack>
                            <Stack>
                                <span style={{ fontStyle: 'italic' }}>{request?.toBranchId}</span>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Stack>
                                <Typography sx={{ fontWeight: 'bold' }}>Request total:</Typography>
                            </Stack>
                            <Stack>
                                <span style={{ fontStyle: 'italic' }}>{request?.total}</span>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Stack>
                                <Typography sx={{ fontWeight: 'bold' }}>Status:</Typography>
                            </Stack>
                            <Stack>
                                <span
                                    style={{
                                        fontStyle: 'italic',
                                        color: 'gray',
                                    }}
                                >
                                    {request?.status}
                                </span>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Stack>
                                <Typography sx={{ fontWeight: 'bold' }}>Message:</Typography>
                            </Stack>
                            <Stack>
                                <span
                                    style={{
                                        fontStyle: 'italic',
                                        color: 'gray',
                                    }}
                                >
                                    {request?.message}
                                </span>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Stack>
                                <Typography sx={{ fontWeight: 'bold' }}>Requested at:</Typography>
                            </Stack>
                            <Stack>
                                <span style={{ fontStyle: 'italic' }}>{request?.timeRequest}</span>
                            </Stack>
                        </Stack>
                        <div style={style.lastLine} />
                        <Stack sx={style.stackContent} direction="column" spacing={1.5}>
                            {request?.requestproditem?.map((item) => (
                                <ProdItem info={item} />
                            ))}
                        </Stack>
                    </Stack>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                        onClick={handleCloseBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    );
}
