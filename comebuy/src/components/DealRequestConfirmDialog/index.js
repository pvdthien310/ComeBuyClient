/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DealRequestConfirmDialog(props) {
    return (
        <Dialog sx={{ width: '100%', height: '100%' }} open={props.openDialog}>
            <DialogTitle>Deal request confirm</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.messageConfirm}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDialog}>Cancel</Button>
                <Button onClick={props.handleDeal}>Deal</Button>
            </DialogActions>
        </Dialog>
    );
}
