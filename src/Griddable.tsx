import React, { useEffect, useState, useRef } from 'react'
import {
    Grid,
    CircularProgress,
    Typography,
} from '@material-ui/core'
import GriddableRowHeader from './GriddableRowHeader'
import GriddableRowGeneric from './GriddableRowGeneric'
import GriddableColumn from './GriddableColumn'
import GriddableCell from './GriddableCell'
import GriddableRowBody from './GriddableRowBody'
import GriddableSelectable from './GriddableSelectable'
import GriddableExpandable from './GriddableExpandable'
import GriddableClickable from './GriddableClickable'

interface GriddableProps<T> {
    items: T[]
    columns: GriddableColumn<T>[]
    loading: boolean
    empty?: string
    error?: string
    selectable?: GriddableSelectable<T>
    expandable?: GriddableExpandable<T>
    clickable?: GriddableClickable<T>
}

function Griddable<T>(props: GriddableProps<T>) {
    const { clickable, expandable, selectable, items } = props

    const fixedIds = useRef(selectable?.fixed || [])
    const [selectedIds, setSelectedIds] = useState<string[]>(
        selectable?.selected || []
    )

    const onLocalChange = (item: T): any => {
        const id = selectable!.mapper(item)
        const index = selectedIds.indexOf(id)
        if (index < 0) {
            setSelectedIds([...selectedIds, id])
        } else {
            setSelectedIds(selectedIds.filter((el, i) => i !== index))
        }
    }

    const onLocalChangeAll = (checked: boolean): any => {
        if (checked) {
            setSelectedIds(items.map((item) => selectable!.mapper(item)))
        } else {
            setSelectedIds(fixedIds.current)
        }
    }

    useEffect(() => {
        if (!selectable) return

        const selectedItems = items.filter((el) => {
            return selectedIds.indexOf(selectable!.mapper(el))
        })
        selectable.onChange(selectedIds, selectedItems)
    }, [selectable, items, selectedIds])

    const gridableBody = (): any => {
        if (props.loading) {
            return (
                <GriddableRowGeneric>
                    <CircularProgress size="1rem" color="secondary" />
                </GriddableRowGeneric>
            )
        }

        if (props.error) {
            return (
                <GriddableRowGeneric>
                    <Typography variant="caption" color="error">
                        {props.error}
                    </Typography>
                </GriddableRowGeneric>
            )
        }

        if (items.length === 0 && props.empty) {
            return (
                <GriddableRowGeneric>
                    <Typography variant="caption">{props.empty}</Typography>
                </GriddableRowGeneric>
            )
        }

        return (
            <Grid item xs={12}>
                {items.map((item: T, indexRow: number) => (
                    <GriddableRowBody
                        key={indexRow}
                        item={item}
                        total={items.length}
                        columns={props.columns}
                        onLocalChange={onLocalChange}
                        onLocalChangeAll={onLocalChangeAll}
                        onClick={clickable?.onClick}
                        selectedIds={selectedIds}
                        fixedIds={fixedIds.current}
                        selectable={!!selectable}
                        mapper={selectable?.mapper}
                        expandable={!!expandable}
                        detailMapper={expandable?.mapper}
                    />
                ))}
            </Grid>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <GriddableRowHeader container>
                    {props.columns.map(
                        (column: GriddableColumn<T>, index: number) => (
                            <GriddableCell
                                key={index}
                                column={column}
                                index={index}
                                selectable={selectable && index === 0}
                                mapper={selectable?.mapper}
                                total={items.length}
                                selected={selectedIds}
                                onChange={onLocalChange}
                                onChangeAll={onLocalChangeAll}
                            />
                        )
                    )}
                </GriddableRowHeader>
            </Grid>
            <Grid item xs={12}>
                {gridableBody()}
            </Grid>
        </Grid>
    )
}

export default Griddable

export type { GriddableProps }
