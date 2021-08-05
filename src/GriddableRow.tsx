import { Grid } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'
import { grey, green } from '@material-ui/core/colors'

export const GriddableRow = withStyles((theme: Theme) => ({
    root: {
        borderBottom: '1px solid',
        borderBottomColor: grey[100],
        minHeight: theme.spacing(5),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        '&:not(.GridableHeader):hover': {
            backgroundColor: grey[50],
        },
        '&:is(.GriddableRowClickable):not(.GridableHeader)': {
            cursor: 'pointer',
        },
        '&:is(.GriddableRowSelected):not(.GridableHeader)': {
            backgroundColor: green[50],
        },
    },
}))(Grid)

export const GriddableRowHeader = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: grey[100],
    },
}))(GriddableRow)
