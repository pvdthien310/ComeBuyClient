import * as React from 'react';
import Switch from '@mui/material/Switch';

function CouponStatus(props) {
    const [active, setActive] = React.useState(props.coupon.active);
    const handleChange = () => {
        setActive(!active);
        props.handleChangeStatus(props.coupon);
    };
    return <Switch size="large" checked={active} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />;
}
export default CouponStatus;
