import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BranchSelectV2(props) {
    return (
        <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">Select branch</InputLabel>
            <Select value={props.currentBranch} label="Select branch" onChange={props.onChangeBranch}>
                {props.branchList?.map((item) => (
                    <MenuItem key={item.branchID} value={item.branchID}>
                        {item.address}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export default BranchSelectV2;
