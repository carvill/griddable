import { ReactNode } from 'react';
import { GridJustification } from '@material-ui/core';

export type columns = boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | undefined;

interface GriddableColumn<T> {
    title: string | ReactNode;
    converter(item: T, index: number): ReactNode;
    justify?: GridJustification;
    xs?: columns;
    sm?: columns;
    md?: columns;
    lg?: columns;
    xl?: columns;
    fullWidth?: boolean;
}

export default GriddableColumn;