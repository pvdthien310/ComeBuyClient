import React from 'react';
import { Modal, Box, Grid, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import TechInforLine from '../TechInforLine/index';
import style from './style';

function DiscountInfoModal(props) {
    return (
        <Modal
            open={props.openDiscountModal}
            onClose={props.handleCloseDiscountModal}
            aria-labelledby="modal-verify-title"
            aria-describedby="modal-verify-description"
        >
            <Box sx={style.boxWrapper}>
                <Grid direction="row" container spacing={1}>
                    <Grid item xs={12} marginBottom={1}>
                        <Box sx={{ height: 5, width: '100%', backgroundColor: 'blue', borderRadius: 5 }} />
                    </Grid>
                    <Grid item xs={7}>
                        <Stack spacing={2}>
                            <TechInforLine
                                Icon={<InfoIcon color="primary" />}
                                Title="Discount ID"
                                Text={props.discount?.discountid}
                            />
                            <TechInforLine
                                Icon={<InfoIcon color="primary" />}
                                Title="Discount type"
                                Text={props.discount?.type}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={5}>
                        <Stack spacing={2}>
                            <TechInforLine
                                Icon={<InfoIcon color="primary" />}
                                Title="Value type"
                                Text={props.discount?.valuetype}
                            />
                            <TechInforLine
                                Icon={<InfoIcon color="primary" />}
                                Title="Discount value"
                                Text={props.discount?.value}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default DiscountInfoModal;
