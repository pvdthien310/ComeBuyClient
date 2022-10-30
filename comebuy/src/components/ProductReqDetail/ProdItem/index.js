/* eslint-disable react/jsx-fragments */
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Badge, Box, Button, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { getProductWithID } from '../../../redux/slices/productSlice';

import style from './style';
import DetailProductModal from '../../DetailProductModal';

const ItemClickToolTips = styled(({ className, ...props }) => (
    <Tooltip placement="right-start" {...props} arrow classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: '#99ab9a',
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#99ab9a',
    },
}));

export default function ProdItem(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [product, setProduct] = useState(null);
    const handleDoubleClick = async () => {
        setOpenBackdrop(true);
        const action = await dispatch(getProductWithID(props.info.productid));
        const result = unwrapResult(action);
        setProduct(result);
        setOpenBackdrop(false);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    return (
        <Stack direction="row" spacing={1}>
            <Box sx={style.box}>
                <ItemClickToolTips
                    title={
                        <Fragment>
                            <Typography fontSize="10px" color="inherit">
                                Note:
                            </Typography>
                            <Typography fontSize="10px" color="inherit">
                                Double Click to view detail
                            </Typography>
                        </Fragment>
                    }
                >
                    <Badge components="span" badgeContent={props.info.quantity} color="success">
                        <Button onDoubleClick={handleDoubleClick} sx={style.btnText}>
                            {props.info.productid}
                        </Button>
                    </Badge>
                </ItemClickToolTips>
                <DetailProductModal open={open} product={product} onClose={handleClose} />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Stack>
    );
}
