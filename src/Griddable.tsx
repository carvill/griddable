import React, { ReactNode, useEffect, useState } from 'react'
import { Grid, Box, CircularProgress, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { GriddableRow, GriddableRowHeader } from './GriddableRow'
import GriddableColumn from './GriddableColumn'
import GriddableCell from './GriddableCell'

export interface GriddableProps<T> {
    items: T[]
    columns: GriddableColumn<T>[]
    empty?: string
    loading: boolean
    error?: string
    onClick?(item: T): any
    selectable?: boolean
    mapper?(item: T): string
    onChange?(ids: string[], items: T[]): any
}

function Griddable<T>(props: GriddableProps<T>) {
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [selectedItems, setSelectedItems] = useState<T[]>([])

    const onChange = (item: T): any => {
        const id = props.mapper!(item)
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

    const onChangeAll = (checked: boolean): any => {
        var ids: string[], items: T[]
        if (checked) {
            ids = props.items.map((item) => props.mapper!(item))
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
            !!props.selectable &&
            !!props.mapper &&
            selectedIds.indexOf(props.mapper!(item)) >= 0
        )
    }

    useEffect(() => {
        if (props.selectable && props.onChange) {
            props.onChange(selectedIds, selectedItems)
        }
        // eslint-disable-next-line
    }, [props.selectable, selectedIds, selectedItems])

    const handleClick = (item: T) => () => {
        props.onClick!(item)
    }

    const gridableBody = (): any => {
        if (props.loading) {
            return genericRow(
                <CircularProgress size="1rem" color="secondary" />
            )
        }

        if (props.error) {
            return genericRow(
                <Typography variant="caption" color="error">
                    {props.error}
                </Typography>
            )
        }

        if (props.items.length === 0 && props.empty) {
            return genericRow(
                <Typography variant="caption">{props.empty}</Typography>
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
                                    selectable={
                                        props.selectable && indexColumn === 0
                                    }
                                    mapper={props.mapper}
                                    total={props.items.length}
                                    selected={selectedIds}
                                    onChange={onChange}
                                    onChangeAll={onChangeAll}
                                />
                            )
                        )}
                    </GriddableRow>
                ))}
            </Grid>
        )
    }

    const genericRow = (child: ReactNode) => {
        return (
            <Grid item xs={12}>
                <GriddableRow container justifyContent="center">
                    <Grid item xs="auto">
                        <Box py={1}>{child}</Box>
                    </Grid>
                </GriddableRow>
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
                                selectable={props.selectable && index === 0}
                                mapper={props.mapper}
                                total={props.items.length}
                                selected={selectedIds}
                                onChange={onChange}
                                onChangeAll={onChangeAll}
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
