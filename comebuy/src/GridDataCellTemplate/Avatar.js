import { Avatar, styled } from "@mui/material";
import { Box, } from "@mui/system";
import { jsx as _jsx } from "react/jsx-runtime";


const Img = styled('img')((theme) => ({
    height: '100%',
    width: '100%',
    borderRadius: 50
}))

const _Avatar = (props) => {
    return (
        <Box sx={{ borderRadius: 5, height: 100, width: 100, justifyContent:'center', alignItems: 'center' }}>
            <Avatar sx={{height: 70, width: 70, alignSelf: 'center'}} src={props.url}></Avatar>
        </Box>
    )
}


export function renderAvatar(params) {

    return /*#__PURE__*/_jsx(_Avatar, {
      url: params.value.toString()
    });
  }