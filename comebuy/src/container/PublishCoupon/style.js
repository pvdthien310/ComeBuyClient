const style = {
    container: {
        width: '100%',
        height: '100%',
        justifyItems: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        overflowY: 'hidden',
    },
    subContainer: {
        width: '100%',
        height: '100%',
    },
    thirdStack: {
        alignItems: 'center',
        justifyContent: 'space-between',
        pl: '9%',
        pr: 8,
    },
    headerStack: {
        alignItems: 'center',
        justifyItems: 'center',
    },
    btnCreateCoupon: {
        width: 140,
        fontSize: '13px',
        backgroundColor: '#2E1534',
        color: 'white',
        textTransform: 'none',
        marginRight: 9,
        alignSelf: 'start',
        borderRadius: 3,
        '&:hover': {
            backgroundColor: 'blue',
            color: 'white',
        },
    },
    filterStack: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '9%',
        paddingRight: 7,
    },
    formControl: { m: 2, minWidth: 120 },
    text: { fontSize: '13px' },
};

export default style;
