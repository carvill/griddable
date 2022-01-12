import React, { ReactNode, useEffect, useState } from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import GriddableColumn from './GriddableColumn'
import GriddableCheckbox from './GriddableCheckbox'
import GriddableCell from './GriddableCell'

interface GriddableCellValueProps<T> {
    column: GriddableColumn<T>
    item: T
    id: string
    index: number

    selected?: boolean
    disabled?: boolean
    selectable?: boolean
    onChange(item: T): any

    expandable?: boolean
    expanded?: boolean
    onExpand?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
}

function GriddableCellValue<T>(props: GriddableCellValueProps<T>) {
    const { column, item, id, selected, disabled, index, onChange } = props
    const { title, textAlign, converter } = column

    const [valueNode, setValueNode] = useState<ReactNode>()

    useEffect(() => {
        const value = converter(item, index)
        const type = typeof value
        if (textAlign && (type === 'string' || type === 'number')) {
            setValueNode(
                <Typography variant="body2" component="h6" align={textAlign}>
                    {value}
                </Typography>
            )
        } else {
            setValueNode(value)
        }
    }, [item, index, title, textAlign, converter])

    const handleSelection = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        onChange(item)
    }

    return (
        <GriddableCell column={column}>
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
                            size="small"
                            id={id}
                            name={id}
                            value={id}
                            checked={selected}
                            disabled={disabled}
                            onChange={handleSelection}
                            onClick={(event) => event.stopPropagation()}
                        />
                    </Grid>
                )}
                {props.expandable && (
                    <Grid item xs="auto">
                        <IconButton size="small" onClick={props.onExpand}>
                            {props.expanded ? (
                                <ExpandLess fontSize="small" />
                            ) : (
                                <ExpandMore fontSize="small" />
                            )}
                        </IconButton>
                    </Grid>
                )}
                <Grid item xs>
                    {valueNode}
                </Grid>
            </Grid>
        </GriddableCell>
    )
}

export default GriddableCellValue
