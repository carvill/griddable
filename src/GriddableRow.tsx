import { Grid } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'

const GriddableRow = withStyles((theme: Theme) => ({
    root: {
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.divider,
        minHeight: theme.spacing(6),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        '&:not(.GridableHeader):hover': {
            backgroundColor: theme.palette.grey[50],
        },
        '&:is(.GriddableRowClickable):not(.GridableHeader)': {
            cursor: 'pointer',
        },
        '&:is(.GriddableRowSelected):not(.GridableHeader)': {
            backgroundColor: theme.palette.grey[200],
        },
    },
}))(Grid)

export default GriddableRow
