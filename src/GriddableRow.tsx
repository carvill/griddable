import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

const GriddableRow = styled(Grid)(({ theme }) => ({
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
}))

export default GriddableRow
