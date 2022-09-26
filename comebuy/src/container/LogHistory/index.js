import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import logApi from '../../api/logAPi';

function LogHistory() {
    const [log, SetLog] = useState([]);
    useEffect(async () => {
        let response;
        if (localStorage.getItem('role') === 'admin') response = await logApi.getLog();
        else response = await logApi.getLog(localStorage.getItem('idUser'));
        if (response.status === 200) {
            SetLog(response.data);
        } else console.log('Failed Load Log');
    }, []);
    return <Stack>{log.length > 0 && log.map((item) => <Typography>{item.action}</Typography>)}</Stack>;
}
export default LogHistory;
