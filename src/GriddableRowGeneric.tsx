import React, { ReactNode } from 'react'
import { Box, Grid } from '@material-ui/core'
import GriddableRow from './GriddableRow'

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

export default GriddableRowGeneric
