const style = {
    boxWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: 'auto',
        borderRadius: '15px',
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#fff',
        color: 'black',
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'absolute',
        marginBottom: '10px',
    },
    skipBtn: {
        fontWeight: 'bold',
        textTransform: 'none',
        color: 'maroon',
        textDecoration: 'underline',
    },
    useBtn: {
        fontWeight: 'bold',
        textTransform: 'none',
        color: 'green',
        textDecoration: 'underline',
    },
};
export default style;
