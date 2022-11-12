import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddressSelector(props) {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.holder}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.selected}
                label={props.holder}
                onChange={(event) => props.handleChangePlace(event)}
            >
                {props.listPlace.map((province) => (
                    <MenuItem value={province}>{province.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
