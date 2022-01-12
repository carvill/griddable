import React, { ReactNode } from 'react'
import { Collapse, Grid, Hidden } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'

const GriddableDetailContainer = withStyles((theme: Theme) => ({
    root: {
        borderTop: '1px dashed',
        borderTopColor: theme.palette.divider,
        padding: theme.spacing(1.5),
        marginTop: theme.spacing(0.5),
    },
}))(Grid)

interface GriddableRowDetailProps<T> {
    item: T
    expanded: boolean
    mapper(item: T): ReactNode
}

function GriddableRowDetail<T>(props: GriddableRowDetailProps<T>) {
    const { item, expanded, mapper } = props

    return (
        <Hidden xsUp={!expanded} implementation="js">
            <GriddableDetailContainer item xs={12}>
                <Collapse in={expanded}>{mapper(item)}</Collapse>
            </GriddableDetailContainer>
        </Hidden>
    )
}

export default GriddableRowDetail
