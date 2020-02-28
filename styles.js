export default theme => ({
    mdBlock: {
        '&:not(:last-child)': {
            marginBottom: 30,
            [theme.breakpoints.up('md')]: {
                marginBottom: 45
            }
        }
    },
    mdBlockTitle: {
        fontSize: 18,
        fontWeight: 400,
        '& b': {
            textTransform: 'uppercase'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 20
        }
    }
});
