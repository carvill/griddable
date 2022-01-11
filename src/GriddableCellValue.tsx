import React, { ReactNode, useEffect, useState } from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import GriddableColumn from './GriddableColumn'
import GriddableCheckbox from './GriddableCheckbox'

interface GriddableCellValueProps<T> {
    column: GriddableColumn<T>
    item: T
    index: number
    selected: string[]
    selectable?: boolean
    fixedIds?: string[]
    expandable?: boolean
    expanded?: boolean
    mapper?(item: T): string
    onChange(item: T): any
    onExpand?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
}

function GriddableCellValue<T>(props: GriddableCellValueProps<T>) {
    const { column, item, index, selected, mapper, fixedIds } = props
    const { title, textAlign, converter } = column

    const [id, setId] = useState('')
    const [checked, setChecked] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [valueNode, setValueNode] = useState<ReactNode>()

    useEffect(() => {
        if (mapper) {
            const id = mapper(item)
            setId(id)
            setChecked(selected.indexOf(id) >= 0)
            setDisabled(fixedIds ? fixedIds?.indexOf(id) >= 0 : false)
        } else {
            setId('')
            setChecked(false)
        }
    }, [item, selected, fixedIds, mapper])

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

    const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(item)
    }

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
                        size="small"
                        id={id}
                        name={id}
                        value={id}
                        checked={checked}
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
    )
}

export default GriddableCellValue
