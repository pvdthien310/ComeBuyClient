import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialpadIcon from '@mui/icons-material/Dialpad';

export default function BranchItem(prop) {
    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" sx={{ width: '100%', flexDirection: 'space-between' }}>
                <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={2}>
                        <Badge badgeContent={prop.branch.totalProduct} color="primary">
                            <StoreMallDirectoryIcon color="action" sx={{ width: '30px', height: '30px' }} />
                        </Badge>
                        <Typography sx={{ color: '#289E82', fontWeight: 'bold', fontSize: '17px' }}>
                            Manager: {prop.branch.mamangerId}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <LocationOnIcon color="action" sx={{ width: '30px', height: '30px' }} />
                        <Typography sx={{ color: 'gray', fontSize: '16px' }}>{prop.branch.address}</Typography>
                    </Stack>
                </Stack>
                <Stack direction="column">
                    <IconButton>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton>
                        <DialpadIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <div style={{ width: '100%', backgroundColor: 'gray', height: '1px' }} />
        </Stack>
    );
}
