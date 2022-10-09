const style = {
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '70%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
    },
    lastLine: {
        width: '100%',
        backgroundColor: 'gray',
        height: '1px',
        marginTop: 10,
    },
    wrapper: {
        width: '100%',
        heigh: '100%',
    },
    stackContent: {
        height: '50vh',
        overflow: 'scroll',
        p: 1,
        pt: 2,
    },
    titleList: {
        fontWeight: 'bold',
        fontSize: '17px',
        color: 'black',
        textDecoration: 'underlined',
    },
    textArea: {
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: '35vh',
        maxHeight: '40vh',
        padding: 2,
        fontStyle: 'italic',
    },
    btnStart: {
        textTransform: 'none',
        alignSelf: 'center',
        marginTop: 3,
    },
};

export default style;
