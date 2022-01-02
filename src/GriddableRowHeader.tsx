import { Theme, withStyles } from '@material-ui/core/styles'
import GriddableRow from './GriddableRow'

const GriddableRowHeader = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
    },
}))(GriddableRow)

export default GriddableRowHeader
