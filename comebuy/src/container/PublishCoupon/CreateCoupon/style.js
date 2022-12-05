const style = {
    boxContainer: {
        height: 'auto',
        position: 'relative',
        padding: '1%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    boxInfor: {
        height: 'auto',
        flex: 1,
        width: '80%',
        backgroundColor: 'grey',
        marginTop: '10px',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: 10,
        padding: 2,
    },
    boxDes: {
        height: 'auto',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '10px',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: 10,
        padding: 2,
    },
    boxDes_Stack: {
        alignItems: 'center',
    },
    BoxDes_Grid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxInfor_Stack: {
        alignItems: 'center',
    },
    boxInfor_Line: {
        height: 5,
        width: '100%',
        backgroundColor: '#233059',
        marginTop: '10px',
        marginBottom: '10px',
    },
    boxinfor_Stack_Line: {
        height: 3,
        width: '100%',
        backgroundColor: '#012030',
        marginTop: '10px',
        marginBottom: '20px',
    },
    AddImageButton: {
        backgroundColor: 'black',
        fontWeight: 'bold',
        color: 'white',
        height: '50px',
        width: '100%',
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#A6A6A4',
        },
    },
    SaveButton: {
        alignSelf: 'center',
        textTransform: 'none',
        backgroundColor: '#008080',
        '&:hover': {
            backgroundColor: 'gray',
            color: 'black',
        },
    },
    BackButton: {
        alignSelf: 'center',
        textTransform: 'none',
        backgroundColor: '#404040',
        '&:hover': {
            backgroundColor: 'gray',
            color: 'black',
        },
    },
    ResetButton: {
        alignSelf: 'center',
        textTransform: 'none',
        backgroundColor: '#EBE222',
        '&:hover': {
            backgroundColor: 'gray',
            color: 'black',
        },
    },
    genBtn: {
        alignSelf: 'end',
        textTransform: 'none',
        backgroundColor: 'green',
        '&:hover': {
            backgroundColor: 'gray',
            color: 'black',
        },
    },
    codeGenInfo: {
        fontSize: '15px',
        fontStyle: 'italic',
    },
};

export default style;
