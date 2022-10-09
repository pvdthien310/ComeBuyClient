import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ProductSelectV2(props) {
    return (
        <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">Select product</InputLabel>
            <Select value={props.currentProduct} label="Select product" onChange={props.onChangeProduct}>
                {props.productList?.map((item) => (
                    <MenuItem key={item.productID} value={item}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export default ProductSelectV2;
