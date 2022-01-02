import { Checkbox } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'

const GriddableCheckbox = withStyles((theme: Theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        zIndex: 1,
    },
}))(Checkbox)

export default GriddableCheckbox
