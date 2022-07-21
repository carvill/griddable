import { ReactNode } from 'react'
import { PropTypes } from '@mui/material'
import { SystemProps } from '@mui/system'

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

export default GriddableColumn
