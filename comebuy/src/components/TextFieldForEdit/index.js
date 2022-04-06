import { Stack, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';

const TextFieldForEdit = ({ Icon, Title, Text }) => {
    return (
        <Stack spacing={1}> 
            <Stack
                direction="row"
                spacing={1}>
                {Icon}
                <Typography fontWeight='bold'>{Title}</Typography>
            </Stack>
            <TextField
                label={Title }
                placeholder={Text.toString()}
                defaultValue={Text}
                variant="standard"
            />
        </Stack>
    )
}

export default TextFieldForEdit;