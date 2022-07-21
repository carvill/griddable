import React, { ReactNode } from 'react'
import { Grid, Box, Hidden } from '@mui/material'
import GriddableColumn from './GriddableColumn'
import { styled } from '@mui/material/styles'

const GriddableCellBox = styled(Box)(({ theme }) => ({
    width: '100%',
    minWidth: '100%',
    minHeight: theme.spacing(5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'flex-start',
}))

interface GriddableCellProps<T> {
    column: GriddableColumn<T>
    children: ReactNode
}

function GriddableCell<T>(props: GriddableCellProps<T>) {
    const { column, children } = props
    return (
        <Hidden
            xsDown={column.xs === false}
            smDown={column.sm === false}
            mdDown={column.md === false}
            lgDown={column.lg === false}
            xlDown={column.xl === false}
        >
            <Grid
                item
                xs={column.xs}
                sm={column.sm}
                md={column.md}
                lg={column.lg}
                xl={column.xl}
            >
                <GriddableCellBox>{children}</GriddableCellBox>
            </Grid>
        </Hidden>
    )
}

export default GriddableCell
