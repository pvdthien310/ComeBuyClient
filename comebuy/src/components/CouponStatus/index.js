import * as React from 'react';
import Switch from '@mui/material/Switch';

function CouponStatus(props) {
    return (
        <Switch
            size="large"
            checked={props.coupon.active}
            onChange={() => props.handleChangeStatus(props.coupon.couponId)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}
export default CouponStatus;
