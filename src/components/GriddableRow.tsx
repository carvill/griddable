import { Grid } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';

export const GriddableRow = withStyles((theme: Theme) => ({
    root: {
        borderBottom: '1px solid #e0e0e0',
        minHeight: theme.spacing(5),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        '&:not(.GridableHeader):hover': {
            backgroundColor: '#fafafa',
        },
        '&:is(.GriddableRowClickable):not(.GridableHeader)': {
            cursor: 'pointer',
        }
    },
}))(Grid);

export const GriddableRowHeader = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#f1f1f1'
    }
}))(GriddableRow);