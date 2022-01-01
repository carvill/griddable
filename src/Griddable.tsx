import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography } from '@material-ui/core'
import clsx from 'clsx'
import {
    GriddableRow,
    GriddableRowHeader,
    GriddableRowGeneric,
} from './GriddableRow'
import GriddableColumn from './GriddableColumn'
import GriddableCell from './GriddableCell'

interface GriddableProps<T> {
    items: T[]
    columns: GriddableColumn<T>[]
    loading: boolean
    empty?: string
    error?: string
    selectable?: boolean
    onChange?(ids: string[], items: T[]): any
    onClick?(item: T): any
    mapper?(item: T): string
}

function Griddable<T>(props: GriddableProps<T>) {
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [selectedItems, setSelectedItems] = useState<T[]>([])
    const { selectable, onChange, mapper } = props

    const onLocalChange = (item: T): any => {
        const id = mapper!(item)
        const ids =
            selectedIds.length === 0
                ? ([] as string[])
                : selectedIds.join(',').split(',')
        const items = selectedItems.map((item) => item)

        const index = selectedIds.indexOf(id)
        if (index < 0) {
            ids.push(id)
            items.push(item)
        } else {
            ids.splice(index, 1)
            items.splice(index, 1)
        }

        setSelectedIds(ids)
        setSelectedItems(items)
    }

    const onLocalChangeAll = (checked: boolean): any => {
        var ids: string[], items: T[]
        if (checked) {
            ids = props.items.map((item) => mapper!(item))
            items = props.items
        } else {
            ids = []
            items = []
        }

        setSelectedIds(ids)
        setSelectedItems(items)
    }

    const isSelected = (item: T): boolean => {
        return (
            !!selectable && !!mapper && selectedIds.indexOf(mapper!(item)) >= 0
        )
    }

    useEffect(() => {
        if (selectable && onChange) {
            onChange(selectedIds, selectedItems)
        }
    }, [selectable, onChange, selectedIds, selectedItems])

    const handleClick = (item: T) => () => {
        if (props.onClick) {
            props.onClick!(item)
        }
    }

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

        if (props.items.length === 0 && props.empty) {
            return (
                <GriddableRowGeneric>
                    <Typography variant="caption">{props.empty}</Typography>
                </GriddableRowGeneric>
            )
        }

        return (
            <Grid item xs={12}>
                {props.items.map((item: T, indexRow: number) => (
                    <GriddableRow
                        key={indexRow}
                        container
                        onClick={props.onClick ? handleClick(item) : undefined}
                        className={clsx({
                            GriddableRowClickable: !!props.onClick,
                            GriddableRowSelected: isSelected(item),
                        })}
                    >
                        {props.columns.map(
                            (
                                column: GriddableColumn<T>,
                                indexColumn: number
                            ) => (
                                <GriddableCell
                                    key={indexColumn}
                                    column={column}
                                    item={item}
                                    index={indexColumn}
                                    selectable={selectable && indexColumn === 0}
                                    mapper={mapper}
                                    total={props.items.length}
                                    selected={selectedIds}
                                    onChange={onLocalChange}
                                    onChangeAll={onLocalChangeAll}
                                />
                            )
                        )}
                    </GriddableRow>
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
                                mapper={mapper}
                                total={props.items.length}
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
