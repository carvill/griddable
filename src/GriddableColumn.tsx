import { ReactNode } from 'react'
import { PropTypes } from '@material-ui/core'

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

interface GriddableColumn<T> {
    title: string | ReactNode
    converter(item: T, index: number): string | number | ReactNode
    textAlign?: PropTypes.Alignment
    xs?: columns
    sm?: columns
    md?: columns
    lg?: columns
    xl?: columns
}

export default GriddableColumn
