import React, { ReactNode } from 'react'
import { Box, Grid } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'

const GriddableRow = withStyles((theme: Theme) => ({
    root: {
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.divider,
        minHeight: theme.spacing(5),
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

const GriddableRowHeader = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
    },
}))(GriddableRow)

interface GriddableRowGenericProps {
    children: ReactNode
}

const GriddableRowGeneric = (props: GriddableRowGenericProps) => {
    return (
        <Grid item xs={12}>
            <GriddableRow container justifyContent="center">
                <Grid item xs="auto">
                    <Box py={1}>{props.children}</Box>
                </Grid>
            </GriddableRow>
        </Grid>
    )
}

export { GriddableRow, GriddableRowHeader, GriddableRowGeneric }
