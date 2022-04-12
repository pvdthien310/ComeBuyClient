import { styled } from "@mui/material";
import { Box, height, width } from "@mui/system";
import { memo } from "react";
import { jsx as _jsx } from "react/jsx-runtime";

const Img = styled('img')((theme) => ({
    height: '100%',
    width: '100%',
    borderRadius: 50
}))

const Avatar = (props) => {
    return (
        <Box sx={{ borderRadius: 5, height: 70, width: 70 }}>
            <Img src={props.url}></Img>
        </Box>
    )
}


export function renderAvatar(params) {

    return /*#__PURE__*/_jsx(Avatar, {
      url: params.value.toString()
    });
  }