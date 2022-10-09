import { Card, CardContent, CardMedia, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import accountApi from '../../api/accountAPI';

function LogItem(props) {
    const [account, SetAccount] = useState(null);
    const [loading, SetLoading] = useState(false);
    useEffect(async () => {
        SetLoading(true);
        const accResponse = await accountApi.getAccountWithID(props.log.userid);
        if (accResponse.status === 200) {
            SetAccount(accResponse.data);
            SetLoading(false);
        } else {
            SetLoading(false);
            console.log('Fetch Account By ID Failed (Log Item)');
        }
    }, []);
    return (
        <Card sx={{ display: 'flex', p: 1, margin: 2, boxShadow: 2 }}>
            {account != null && (
                <CardMedia
                    component="img"
                    sx={{ width: 80, height: 60, resize: true, alignSelf: 'center' }}
                    image={
                        account != null
                            ? account.avatar
                            : 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
                    }
                    alt="none"
                />
            )}

            <Stack sx={{ display: 'flex', width: '100%', flexDirection: 'row', borderRadius: 3 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ margin: 1 }} component="div" variant="body1" color="#2e1534" fontWeight="bold">
                        {account != null
                            ? `${account.name} (${props.log.role})`
                            : `${props.log.userid} (${props.log.role})`}
                    </Typography>
                    <Typography
                        sx={{ margin: 1, wordBreak: 'break-word', maxWidth: '45%' }}
                        variant="body2"
                        color="maroon"
                        fontWeight="bold"
                        component="div"
                    >
                        {props.log.action}{' '}
                    </Typography>
                    <Typography sx={{ margin: 1 }} variant="body1" color="teal" component="div">
                        {new Date(props.log.createdAt).toLocaleString()}
                    </Typography>
                </CardContent>
                {loading && <CircularProgress color="inherit" />}
            </Stack>
        </Card>
    );
}

export default LogItem;
