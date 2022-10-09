/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialpadIcon from '@mui/icons-material/Dialpad';
import style from './style';
import DistributionModal from '../DistributionModal';
import CreateProdReqModal from '../CreateProdReqModal';

export default function StockItem(prop) {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" sx={style.bigStack}>
                <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={2}>
                        <Badge badgeContent={prop.stock.totalamount} color="primary">
                            <StoreMallDirectoryIcon color="action" sx={style.icon} />
                        </Badge>
                        <Typography sx={style.typo}>{prop.stock.productid}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Badge badgeContent={prop.stock.remaining} color="success">
                            <WhereToVoteIcon color="action" sx={style.icon} />
                        </Badge>
                        <Typography sx={style.typo2}>{prop.stock.name}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <div style={style.lastLine} />
        </Stack>
    );
}
