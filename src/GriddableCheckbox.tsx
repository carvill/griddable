import { Checkbox } from '@mui/material'
import { styled } from '@mui/material/styles'

const GriddableCheckbox = styled(Checkbox)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    zIndex: 1,
}))

export default GriddableCheckbox
