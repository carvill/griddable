import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography } from '@material-ui/core'
import GriddableRowHeader from './GriddableRowHeader'
import GriddableRowGeneric from './GriddableRowGeneric'
import GriddableColumn from './GriddableColumn'
import GriddableRowBody from './GriddableRowBody'
import GriddableSelectable from './GriddableSelectable'
import GriddableExpandable from './GriddableExpandable'
import GriddableClickable from './GriddableClickable'
import GriddableCellTitle from './GriddableCellTitle'

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

    const [disableAll, setDisableAll] = useState(false)

    const onLocalChange = (item: T): any => {
        const id = selectable!.mapper(item)
        const index = selectable!.selected.indexOf(id)
        let ids: string[]
        if (index < 0) {
            ids = [...selectable!.selected, id]
        } else {
            ids = selectable!.selected.filter((el, i) => i !== index)
        }

        inform(ids)
    }

    const onLocalChangeAll = (checked: boolean): any => {
        let ids: string[]
        if (checked) {
            ids = items.map((item) => selectable!.mapper(item))
        } else {
            ids = selectable!.fixed || []
        }

        inform(ids)
    }

    const inform = (ids: string[]) => {
        if (!selectable) return

        const selectedItems = items.filter((el) => {
            return ids.indexOf(selectable!.mapper(el)) >= 0
        })

        selectable.onChange(ids, selectedItems)
    }

    useEffect(() => {
        if (selectable) {
            const ids = items.map(selectable.mapper)
            const notFixed = selectable.fixed
                ? ids.filter((el) => selectable!.fixed!.indexOf(el) < 0)
                : []
            setDisableAll(notFixed.length === 0)
        } else {
            setDisableAll(false)
        }
    }, [selectable, items])

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
                        selectable={!!selectable}
                        selectedIds={selectable?.selected || []}
                        fixedIds={selectable?.fixed || []}
                        mapper={selectable?.mapper}
                        clickable={clickable}
                        expandable={expandable}
                    />
                ))}
            </Grid>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <GriddableRowHeader className="GridableHeader" container>
                    {props.columns.map(
                        (column: GriddableColumn<T>, index: number) => (
                            <GriddableCellTitle
                                key={index}
                                column={column}
                                selectable={selectable && index === 0}
                                disabled={disableAll}
                                total={items.length}
                                selected={selectable?.selected || []}
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
