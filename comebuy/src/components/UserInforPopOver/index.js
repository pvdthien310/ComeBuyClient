import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const UserInfoPopOver = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {props.user.name}
      </Typography>
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box>
          <Typography>{props.user.email}</Typography>
        </Box>
      </Popover>
    </div>
  );
}
export default UserInfoPopOver;