import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, Grid, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import TechInforLine from '../TechInforLine';

function CouponInfoPopUp(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div style={{ padding: 3 }}>
            <Typography
                onMouseEnter={handlePopoverOpen}
                sx={{ textOverflow: 'ellipsis', fontSize: '14px' }}
                onMouseLeave={handlePopoverClose}
            >
                {props.coupon.name}
            </Typography>
            <Popover
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Box sx={{ height: 250, width: 600, padding: 5 }}>
                    <Grid direction="row" container spacing={1}>
                        <Grid item xs={12} marginBottom={1}>
                            <Box sx={{ height: 5, width: '100%', backgroundColor: '#2E1534', borderRadius: 5 }} />
                        </Grid>
                        <Grid item xs={7}>
                            <Stack spacing={2}>
                                <TechInforLine
                                    Icon={<InfoIcon color="primary" />}
                                    Title="Name"
                                    Text={props.coupon.name}
                                />
                                <TechInforLine
                                    Icon={<InfoIcon color="primary" />}
                                    Title="Description"
                                    Text={props.coupon.description}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <Stack spacing={2}>
                                <TechInforLine
                                    Icon={<InfoIcon color="primary" />}
                                    Title="Limit uses"
                                    Text={props.coupon.limitUses}
                                />
                                <TechInforLine
                                    Icon={<InfoIcon color="primary" />}
                                    Title="Limit per account uses"
                                    Text={props.coupon.limitAccountUses}
                                />
                                <TechInforLine
                                    Icon={<InfoIcon color="primary" />}
                                    Title="Created At"
                                    Text={props.coupon.createdAt.substring(0, 10)}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </div>
    );
}
export default CouponInfoPopUp;
