import React from 'react'
import { Grid, Box, Hidden } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'
import GriddableColumn from './GriddableColumn'
import GriddableCellTitle from './GriddableCellTitle'
import GriddableCellValue from './GriddableCellValue'

const GriddableCellBox = withStyles((theme: Theme) => ({
    root: {
        width: '100%',
        minWidth: '100%',
        minHeight: theme.spacing(5),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        justifyContent: 'flex-start',
    },
}))(Box)

interface GriddableCellProps<T> {
    column: GriddableColumn<T>
    item?: T
    index: number
    total: number
    selected: string[]
    selectable?: boolean
    expandable?: boolean
    expanded?: boolean
    mapper?(item: T): string
    onChange(item: T): any
    onChangeAll(checked: boolean): any
    onExpand?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
}

function GriddableCell<T>(props: GriddableCellProps<T>) {
    const { item, column } = props

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
                <GriddableCellBox>
                    {item && <GriddableCellValue item={item} {...props} />}
                    {!item && <GriddableCellTitle {...props} />}
                </GriddableCellBox>
            </Grid>
        </Hidden>
    )
}

export default GriddableCell
