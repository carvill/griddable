import React, { ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
import {
    Grid,
    CircularProgress,
    Typography,
    Collapse,
    Hidden,
    Box,
    IconButton,
    Checkbox,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

type columns =
    | boolean
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto'

type align = 'inherit' | 'left' | 'center' | 'right' | 'justify'

interface GriddableColumn<T> {
    title: string | ReactNode
    converter(
        item: T,
        index: number,
        indexRow?: number
    ): string | number | ReactNode
    textAlign?: align
    xs?: columns
    sm?: columns
    md?: columns
    lg?: columns
    xl?: columns
}

interface GriddableSelectable<T> {
    selected: string[]
    fixed?: string[]
    mapper(item: T): string
    onChange(ids: string[], items: T[]): any
}

interface GriddableExpandable<T> {
    mapper(item: T): ReactNode
}

interface GriddableClickable<T> {
    onClick(item: T): any
}

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
                        index={indexRow}
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

const GriddableRow = styled(Grid)(({ theme }) => ({
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    minHeight: theme.spacing(6),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    '&:not(.GridableHeader):hover': {
        backgroundColor: theme.palette.grey[50],
    },
    '&:is(.GriddableRowClickable):not(.GridableHeader)': {
        cursor: 'pointer',
    },
    '&:is(.GriddableRowSelected):not(.GridableHeader)': {
        backgroundColor: theme.palette.grey[200],
    },
}))

const GriddableRowHeader = styled(GriddableRow)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
}))

const GriddableDetailContainer = styled(Grid)(({ theme }) => ({
    borderTop: '1px dashed',
    borderTopColor: theme.palette.divider,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
}))

const GriddableCheckbox = styled(Checkbox)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    zIndex: 1,
}))

interface GriddableRowDetailProps<T> {
    item: T
    expanded: boolean
    mapper(item: T): ReactNode
}

function GriddableRowDetail<T>(props: GriddableRowDetailProps<T>) {
    const { item, expanded, mapper } = props

    return (
        <Hidden xsUp={!expanded} implementation="js">
            <GriddableDetailContainer item xs={12}>
                <Collapse in={expanded}>{mapper(item)}</Collapse>
            </GriddableDetailContainer>
        </Hidden>
    )
}

const GriddableCellBox = styled(Box)(({ theme }) => ({
    width: '100%',
    minWidth: '100%',
    minHeight: theme.spacing(5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'flex-start',
}))

interface GriddableCellProps<T> {
    column: GriddableColumn<T>
    children: ReactNode
}

function GriddableCell<T>(props: GriddableCellProps<T>) {
    const { column, children } = props
    return (
        <Hidden
            xsDown={column.xs === false}
            smDown={column.sm === false}
            mdDown={column.md === false}
            lgDown={column.lg === false}
            xlDown={column.xl === false}
        >
            <Grid
                item
                xs={column.xs}
                sm={column.sm}
                md={column.md}
                lg={column.lg}
                xl={column.xl}
            >
                <GriddableCellBox>{children}</GriddableCellBox>
            </Grid>
        </Hidden>
    )
}

interface GriddableCellValueProps<T> {
    column: GriddableColumn<T>
    item: T
    id: string
    indexRow: number
    indexColumn: number

    selected?: boolean
    disabled?: boolean
    selectable?: boolean
    onChange(item: T): any

    expandable?: boolean
    expanded?: boolean
    onExpand?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
}

function GriddableCellValue<T>(props: GriddableCellValueProps<T>) {
    const {
        column,
        item,
        id,
        selected,
        disabled,
        indexColumn,
        indexRow,
        onChange,
    } = props
    const { title, textAlign, converter } = column

    const [valueNode, setValueNode] = useState<ReactNode>()

    useEffect(() => {
        const value = converter(item, indexColumn, indexRow)
        const type = typeof value
        if (type === 'string' || type === 'number') {
            setValueNode(
                <Typography variant="body2" component="h6" align={textAlign}>
                    {value}
                </Typography>
            )
        } else {
            setValueNode(value)
        }
    }, [item, indexColumn, indexRow, title, textAlign, converter])

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

interface GriddableRowBodyProps<T> {
    index: number
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
        index,
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
                            indexRow={index}
                            indexColumn={indexColumn}
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

interface GriddableRowGenericProps {
    children: ReactNode
}

const GriddableRowGeneric = (props: GriddableRowGenericProps) => {
    return (
        <Grid item xs={12}>
            <GriddableRow container justifyContent="center">
                <Grid item xs="auto">
                    <Box py={1}>{props.children}</Box>
                </Grid>
            </GriddableRow>
        </Grid>
    )
}

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

export default Griddable

export type {
    GriddableProps,
    GriddableColumn,
    GriddableSelectable,
    GriddableExpandable,
    GriddableClickable,
}
