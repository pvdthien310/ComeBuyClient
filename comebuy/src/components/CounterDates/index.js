import { Typography } from '@mui/material';

function Dates({ invoiceDate }) {
    return (
        <Typography sx={{ marginTop: '-7%', fontSize: '13px', marginLeft: '3.5rem', color: 'grey' }}>
            {invoiceDate}
        </Typography>
    );
}
export default Dates;
