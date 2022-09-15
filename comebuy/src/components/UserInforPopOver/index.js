import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, Grid, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TechInforLine from '../TechInforLine';

function UserInfoPopOver(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Typography onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                {props.user.name}
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
                <Box sx={{ height: 350, width: 700, padding: 5 }}>
                    <Grid direction="row" container spacing={1}>
                        <Grid item xs={12} marginBottom={1}>
                            <Box sx={{ height: 5, width: '100%', backgroundColor: '#2E1534', borderRadius: 5 }} />
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={2}>
                                <TechInforLine Icon={<EditIcon />} Title="Name" Text={props.user.name} />
                                <TechInforLine Icon={<EditIcon />} Title="Sex" Text={props.user.sex} />
                                <TechInforLine Icon={<EditIcon />} Title="Address" Text={props.user.address} />
                                <TechInforLine Icon={<EditIcon />} Title="Day Of Birth" Text={props.user.dob} />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={2}>
                                <TechInforLine Icon={<EditIcon />} Title="User ID" Text={props.user.userID} />
                                <TechInforLine Icon={<EditIcon />} Title="Phone Number" Text={props.user.phoneNumber} />
                                <TechInforLine Icon={<EditIcon />} Title="Email" Text={props.user.email} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {props.user.role !== 'customer' ? (
                                <TechInforLine Icon={<EditIcon />} Title="Password" Text={props.user.password} />
                            ) : (
                                <TechInforLine Icon={<EditIcon />} Title="Password" Text="Unauthorized" />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </div>
    );
}
export default UserInfoPopOver;
