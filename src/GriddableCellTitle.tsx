import React, { ReactNode, useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import GriddableCheckbox from './GriddableCheckbox'
import GriddableColumn from './GriddableColumn'
import GriddableCell from './GriddableCell'

interface GriddableCellTitleProps<T> {
    column: GriddableColumn<T>
    total: number
    selected: string[]
    selectable?: boolean
    disabled?: boolean
    onChangeAll(checked: boolean): any
}

function GriddableCellTitle<T>(props: GriddableCellTitleProps<T>) {
    const { column, total, selected, selectable } = props
    const { title, textAlign } = column

    const [titleNode, setTitleNode] = useState<ReactNode>()
    const [checked, setChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setChecked(selected.length > 0 && selected.length === total)
        setIndeterminate(selected.length > 0 && selected.length < total)
        setDisabled(props.disabled || total === 0)
    }, [total, selected, props.disabled])

    useEffect(() => {
        if (typeof title !== 'string') {
            setTitleNode(title)
        } else {
            setTitleNode(
                <Typography variant="body2" component="h6" align={textAlign}>
                    <strong>{title}</strong>
                </Typography>
            )
        }
    }, [title, textAlign])

    const handleAllCheckboxs = (
        event: React.ChangeEvent<{}>,
        checked: boolean
    ) => {
        props.onChangeAll(checked)
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
                {selectable && (
                    <Grid item xs="auto">
                        <GriddableCheckbox
                            size="small"
                            id="gridable-all"
                            name="gridable-all"
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={handleAllCheckboxs}
                            disabled={disabled}
                        />
                    </Grid>
                )}
                <Grid item xs>
                    {titleNode}
                </Grid>
            </Grid>
        </GriddableCell>
    )
}

export default GriddableCellTitle
