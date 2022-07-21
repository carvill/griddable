import { styled } from '@mui/material/styles'
import GriddableRow from './GriddableRow'

const GriddableRowHeader = styled(GriddableRow)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
}))

export default GriddableRowHeader
