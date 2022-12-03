import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import productAPI from '../../api/productAPI';

function ProductSelectV3(props) {
    const [options, setOptions] = useState([]);
    async function LoadData() {
        try {
            const response = await productAPI.getProductForPromotion();
            if (response) {
                if (response.data.length === 0) {
                    props.SetError({
                        isError: true,
                        message: 'All product is discounted!',
                    });
                    return;
                }
                setOptions(
                    response.data.map((option) => {
                        const firstLetter = option.name[0].toUpperCase();
                        return {
                            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                            ...option,
                        };
                    }),
                );
                props.SetError({
                    isError: false,
                    message: 'No error',
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        LoadData();
        return () => {
            setOptions({}); // This worked for me
        };
    }, []);

    return (
        <Autocomplete
            id="grouped-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300, fontSize: '14px', margin: 3 }}
            renderInput={(params) => <TextField {...params} label="Please select product!" />}
            onChange={props.onChange}
        />
    );
}
export default ProductSelectV3;
