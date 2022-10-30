/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import style from './style';
import DistributionModalVer2 from '../DistributionModalVer2/index';

export default function BranchItem(prop) {
    const [openModalDistribution, setOpenModalDistribution] = useState(false);
    const handleOpenModal = () => setOpenModalDistribution(true);

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" sx={style.bigStack}>
                <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={2}>
                        <Badge badgeContent={prop.branch.totalproduct} color="primary">
                            <StoreMallDirectoryIcon color="action" sx={style.icon} />
                        </Badge>
                        <Typography sx={style.typo}>Branch: {prop.branch.branchid}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <LocationOnIcon color="action" sx={style.icon} />
                        <Typography sx={style.typo2}>{prop.branch.address}</Typography>
                    </Stack>
                </Stack>
                {prop.admin.branch.branchid !== prop.branch.branchid && (
                    <Stack direction="column">
                        <IconButton onClick={handleOpenModal}>
                            <AddCircleIcon />
                        </IconButton>
                    </Stack>
                )}
            </Stack>
            <div style={style.lastLine} />
            <DistributionModalVer2
                type="single"
                user={prop.admin}
                branchId={prop.branch.branchid}
                open={openModalDistribution}
                closeModal={() => setOpenModalDistribution(false)}
                currentMainBranchId={prop.admin.branch.branchid}
            />
        </Stack>
    );
}
