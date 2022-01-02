import React, { ReactNode, useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import GriddableCheckbox from './GriddableCheckbox'
import GriddableColumn from './GriddableColumn'

interface GriddableCellTitleProps<T> {
    column: GriddableColumn<T>
    total: number
    selected: string[]
    selectable?: boolean
    onChangeAll(checked: boolean): any
}

function GriddableCellTitle<T>(props: GriddableCellTitleProps<T>) {
    const { column, total, selected, selectable } = props
    const { title, textAlign } = column

    const [titleNode, setTitleNode] = useState<ReactNode>()
    const [allChecked, setAllChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setAllChecked(selected.length > 0 && selected.length === total)
        setIndeterminate(selected.length > 0 && selected.length < total)
        setDisabled(total === 0)
    }, [total, selected])

    useEffect(() => {
        if (typeof title !== 'string') {
            setTitleNode(title)
        } else if (textAlign) {
            setTitleNode(
                <Typography variant="body2" component="h6" align={textAlign}>
                    <strong>{title}</strong>
                </Typography>
            )
        } else {
            setTitleNode(<strong>{title}</strong>)
        }
    }, [title, textAlign])

    const handleAllCheckboxs = (
        event: React.ChangeEvent<{}>,
        checked: boolean
    ) => {
        props.onChangeAll(checked)
    }

    return (
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
                        checked={allChecked}
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
    )
}

export default GriddableCellTitle
