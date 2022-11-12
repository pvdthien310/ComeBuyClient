const style = {
    wrapper: {
        backgroundColor: '#fafafa',
        left: 0,
        backgroundPosition: 'left top',
        boxShadow: '1px 0 0 #e1e1e1 inset',
    },
    stackWrapper: { height: 'auto', maxHeight: '220px', overflowY: 'scroll', overflowX: 'hidden' },
    listWrapper: {
        backgroundColor: '#F2F2F2',
        borderRadius: '8px',
        padding: '1em',
        ':hover': {
            backgroundColor: 'bisque',
        },
        width: '100%',
    },
    img: {
        width: '5em',
        height: '5em',
        borderRadius: '8px',
        background: '#fff',
        position: 'relative',
    },
    infoWrapper: { width: '100%', paddingRight: '2em' },
    listProdWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '1em',
        marginTop: '1em',
    },
    line: {
        height: '1px',
        width: '100%',
        backgroundColor: '#BFBFBF',
    },
    textField: {
        color: '#333333',
        fontFamily: 'sans-serif',
    },
    btn: {
        fontSize: '14px',
        backgroundColor: 'gray',
        marginTop: '0.5em',
        width: '100%',
        height: '100%',
        textTransform: 'none',
    },
    memberShipText: {
        color: '#333333',
        fontFamily: 'sans-serif',
        fontWeight: 300,
    },
    memberType: {
        textDecoration: 'underline',
        color: '#333333',
        fontSize: '13px',
        fontWeight: 'bold',
    },
    subTotal: {
        color: '#333333',
        fontWeight: 600,
        marginTop: '1.2em',
    },
    twoDollar: {
        color: '#333333',
        fontWeight: 800,
        marginTop: '-0.5em',
    },
    total: {
        color: '#333333',
        fontWeight: 600,
        marginTop: '1.2em',
        fontSize: '20px',
    },
};

export default style;
