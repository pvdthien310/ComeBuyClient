import React from 'react';
import { Modal, Box, Grid, Stack, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import TechInforLine from '../TechInforLine/index';
import style from './style';

function ScratchCouponModal(props) {
    return (
        <Modal
            open={props.openScratchCoupon}
            onClose={props.closeScratchCoupon}
            aria-labelledby="modal-verify-title"
            aria-describedby="modal-verify-description"
        >
            <Box sx={style.boxWrapper}>
                <Grid direction="row" container spacing={1}>
                    <Grid item xs={12} marginBottom={1}>
                        <Box sx={{ height: 5, width: '100%', backgroundColor: 'green', borderRadius: 5 }} />
                    </Grid>
                    <Grid item xs={7}>
                        <Stack spacing={2}>
                            <TechInforLine
                                Icon={<InfoIcon color="success" />}
                                Title="Discount Type"
                                Text={props.discount?.discountType}
                            />
                            <TechInforLine
                                Icon={
                                    <InfoIcon
                                        color={props.discount?.minTotal <= props.totalCost ? 'success' : 'error'}
                                    />
                                }
                                Title="Min total"
                                Text={props.discount?.minTotal}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={5}>
                        <Stack spacing={2}>
                            <TechInforLine
                                Icon={<InfoIcon color="success" />}
                                Title="Value type"
                                Text={props.discount?.valueType}
                            />
                            <TechInforLine
                                Icon={<InfoIcon color="success" />}
                                Title="Value"
                                Text={props.discount?.value}
                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Button onClick={props.closeScratchCoupon} sx={style.skipBtn}>
                        Skip
                    </Button>
                    <Button
                        onClick={props.useHandle}
                        disabled={props.discount?.minTotal > props.totalCost}
                        sx={style.useBtn}
                    >
                        Use
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default ScratchCouponModal;
