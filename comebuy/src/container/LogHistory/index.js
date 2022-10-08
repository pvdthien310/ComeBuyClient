import { Backdrop, CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import logApi from '../../api/logAPi';
import { LogItem } from '../../components';

function LogHistory() {
    const [log, SetLog] = useState([]);
    const [loading, SetLoading] = useState(false);

    const LoadRecords = async (offset) => {
        let response;
        SetLoading(true);
        if (localStorage.getItem('role') === 'admin') response = await logApi.getLog(undefined, offset);
        else response = await logApi.getLog(localStorage.getItem('idUser'), offset);
        if (response.status === 200) {
            SetLog(response.data);
            SetLoading(false);
        } else console.log('Failed Load Log');
    };

    useEffect(async () => {
        await LoadRecords(1);
        return () => {
            SetLog([]);
        };
    }, []);

    return (
        <Stack>
            <Typography variant="h5" sx={{ alignSelf: 'center', fontWeight: 'bold' }}>
                History
            </Typography>
            {log.length > 0 && log.map((item) => <LogItem key={item.logid} log={item} />)}
            <Pagination
                sx={{ alignSelf: 'center', m: 1 }}
                count={log.length > 0 ? Math.ceil(log[0].total / 5) : 0}
                color="secondary"
                onChange={async (e) => {
                    await LoadRecords(e.target.textContent);
                }}
            />
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Stack>
    );
}
export default LogHistory;
