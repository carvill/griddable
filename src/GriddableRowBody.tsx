import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import GriddableRowDetail from './GriddableRowDetail'
import GriddableColumn from './GriddableColumn'
import GriddableRow from './GriddableRow'
import GriddableExpandable from './GriddableExpandable'
import GriddableClickable from './GriddableClickable'
import GriddableCellValue from './GriddableCellValue'

interface GriddableRowBodyProps<T> {
    item: T
    total: number
    selectable?: boolean
    columns: GriddableColumn<T>[]
    selectedIds: string[]
    fixedIds?: string[]
    onLocalChange(item: T): any
    onLocalChangeAll(checked: boolean): any
    mapper?(item: T): string
    clickable?: GriddableClickable<T>
    expandable?: GriddableExpandable<T>
}

function GriddableRowBody<T>(props: GriddableRowBodyProps<T>) {
    const {
        item,
        selectable,
        clickable,
        expandable,
        selectedIds,
        fixedIds,
        mapper,
    } = props

    const [id, setId] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (selectable && mapper) {
            const id = mapper(item)
            setId(id)
            setSelected(selectedIds.indexOf(id) >= 0)
            setDisabled(fixedIds ? fixedIds.indexOf(id) >= 0 : false)
        } else {
            setId('')
            setSelected(false)
            setDisabled(false)
        }
    }, [item, selectable, selectedIds, fixedIds, mapper])

    const onExpand = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation()
        setExpanded(!expanded)
    }

    return (
        <GriddableRow
            container
            onClick={() => clickable?.onClick(item)}
            className={clsx({
                GriddableRowClickable: clickable,
                GriddableRowSelected: selected,
            })}
        >
            <>
                {props.columns.map(
                    (column: GriddableColumn<T>, indexColumn: number) => (
                        <GriddableCellValue
                            key={indexColumn}
                            id={id}
                            column={column}
                            item={item}
                            index={indexColumn}
                            selected={selected}
                            selectable={selectable && indexColumn === 0}
                            disabled={disabled}
                            onChange={props.onLocalChange}
                            expandable={props.expandable && indexColumn === 0}
                            expanded={expanded}
                            onExpand={onExpand}
                        />
                    )
                )}
                {expandable?.mapper && (
                    <GriddableRowDetail
                        item={item}
                        expanded={expanded}
                        mapper={expandable.mapper}
                    />
                )}
            </>
        </GriddableRow>
    )
}

export default GriddableRowBody
