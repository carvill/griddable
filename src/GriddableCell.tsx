import React, { ReactNode } from 'react'
import { Grid, Box, Hidden, Checkbox, Typography } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'
import GriddableColumn from './GriddableColumn'

const GriddableCellBox = withStyles((theme: Theme) => ({
    root: {
        width: '100%',
        minHeight: '100%',
        minWidth: '100%',
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        justifyContent: 'flex-start',
    },
}))(Box)

const GriddableCheckbox = withStyles((theme: Theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        zIndex: 1,
    },
}))(Checkbox)

interface GriddableCellProps<T> {
    column: GriddableColumn<T>
    item?: T
    index: number
    total: number
    selected: string[]
    selectable?: boolean
    mapper?(item: T): string
    onChange(item: T): any
    onChangeAll(checked: boolean): any
}

function GriddableCell<T>(props: GriddableCellProps<T>) {
    const handleAllCheckboxs = (
        event: React.ChangeEvent<{}>,
        checked: boolean
    ) => {
        props.onChangeAll(checked)
    }

    const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(props.item!)
    }

    const convert = (item: T, index: number): ReactNode => {
        const value = props.column.converter(item, props.index)
        if (
            props.column.textAlign &&
            (typeof value === 'string' || typeof value === 'number')
        ) {
            return (
                <Typography
                    variant="body2"
                    component="h6"
                    align={props.column.textAlign}
                >
                    {value}
                </Typography>
            )
        }
        return value
    }

    const value = (item: T): ReactNode => {
        const id = props.mapper ? props.mapper(item) : ''
        return (
            <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                alignContent="center"
                spacing={1}
            >
                {props.selectable && (
                    <Grid item xs="auto">
                        <GriddableCheckbox
                            id={id}
                            name={id}
                            value={id}
                            checked={props.selected.indexOf(id) >= 0}
                            onChange={handleSelection}
                            onClick={(event) => event.stopPropagation()}
                        />
                    </Grid>
                )}
                <Grid item xs>
                    {convert(item, props.index)}
                </Grid>
            </Grid>
        )
    }

    const titleValue = () => {
        if (typeof props.column.title !== 'string') {
            return props.column.title
        }

        if (props.column.textAlign) {
            return (
                <Typography
                    variant="body2"
                    component="h6"
                    align={props.column.textAlign}
                >
                    <strong>{props.column.title}</strong>
                </Typography>
            )
        }

        return <strong>{props.column.title}</strong>
    }

    const title = (): ReactNode => {
        return (
            <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                alignContent="center"
                spacing={1}
            >
                {props.selectable && (
                    <Grid item xs="auto">
                        <GriddableCheckbox
                            id="gridable-all"
                            name="gridable-all"
                            checked={
                                props.selected.length > 0 &&
                                props.selected.length === props.total
                            }
                            indeterminate={
                                props.selected.length > 0 &&
                                props.selected.length < props.total
                            }
                            onChange={handleAllCheckboxs}
                            disabled={props.total === 0}
                        />
                    </Grid>
                )}
                <Grid item xs>
                    {titleValue()}
                </Grid>
            </Grid>
        )
    }

    const content = (): ReactNode => {
        if (props.item) {
            return value(props.item)
        }
        return title()
    }

    return (
        <Hidden
            xsDown={props.column.xs === false}
            smDown={props.column.sm === false}
            mdDown={props.column.md === false}
            lgDown={props.column.lg === false}
            xlDown={props.column.xl === false}
        >
            <Grid
                item
                xs={props.column.xs}
                sm={props.column.sm}
                md={props.column.md}
                lg={props.column.lg}
                xl={props.column.xl}
            >
                <GriddableCellBox>{content()}</GriddableCellBox>
            </Grid>
        </Hidden>
    )
}

export default GriddableCell
