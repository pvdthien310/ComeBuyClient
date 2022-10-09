const style = {
    stack1: {
        borderRadius: '10px',
        p: 2,
    },
    satck2: {
        width: '100%',
        flexDirection: 'space-between',
    },
    button1: {
        width: '100%',
        textTransform: 'none',
    },
    icon: {
        width: '30px',
        height: '30px',
    },
    typo1: {
        fontWeight: 'bold',
        fontSize: '17px',
    },
    typo2: {
        color: 'gray',
        fontSize: '16px',
    },
    paperPropMenu: {
        elevation: 0,
        sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
    },
};
export default style;
