import React, { ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'

import GriddableCell from './GriddableCell'
import GriddableRowDetail from './GriddableRowDetail'
import GriddableColumn from './GriddableColumn'
import GriddableRow from './GriddableRow'

interface GriddableRowBodyProps<T> {
    item: T
    total: number
    selectable?: boolean
    expandable?: boolean
    columns: GriddableColumn<T>[]
    selectedIds: string[]
    onLocalChange(item: T): any
    onLocalChangeAll(checked: boolean): any
    onClick?(item: T): any
    mapper?(item: T): string
    detailMapper?(item: T): ReactNode
}

function GriddableRowBody<T>(props: GriddableRowBodyProps<T>) {
    const { item, selectable, selectedIds, onClick, mapper } = props
    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState(false)
    const [clickable, setClickable] = useState(false)

    useEffect(() => {
        if (selectable && mapper) {
            const id = mapper(item)
            setSelected(selectedIds.indexOf(id) >= 0)
        } else {
            setSelected(false)
        }
    }, [item, selectable, selectedIds, mapper])

    useEffect(() => {
        setClickable(!!onClick)
    }, [onClick])

    const handleClick = () => {
        if (onClick) {
            onClick(item)
        }
    }

    const onExpand = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation()
        setExpanded(!expanded)
    }

    return (
        <GriddableRow
            container
            onClick={clickable ? handleClick : undefined}
            className={clsx({
                GriddableRowClickable: clickable,
                GriddableRowSelected: selected,
            })}
        >
            <>
                {props.columns.map(
                    (column: GriddableColumn<T>, indexColumn: number) => (
                        <GriddableCell
                            key={indexColumn}
                            column={column}
                            item={item}
                            index={indexColumn}
                            selectable={selectable && indexColumn === 0}
                            expandable={props.expandable && indexColumn === 0}
                            expanded={expanded}
                            mapper={mapper}
                            total={props.total}
                            selected={selectedIds}
                            onChange={props.onLocalChange}
                            onChangeAll={props.onLocalChangeAll}
                            onExpand={onExpand}
                        />
                    )
                )}
                {props.expandable && props.detailMapper && (
                    <GriddableRowDetail
                        expanded={expanded}
                        item={item}
                        detailMapper={props.detailMapper}
                    />
                )}
            </>
        </GriddableRow>
    )
}

export default GriddableRowBody
