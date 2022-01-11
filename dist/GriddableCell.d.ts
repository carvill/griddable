import React from 'react';
import GriddableColumn from './GriddableColumn';
interface GriddableCellProps<T> {
    column: GriddableColumn<T>;
    item?: T;
    index: number;
    total: number;
    selected: string[];
    selectable?: boolean;
    expandable?: boolean;
    expanded?: boolean;
    mapper?(item: T): string;
    onChange(item: T): any;
    onChangeAll(checked: boolean): any;
    onExpand?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any;
}
declare function GriddableCell<T>(props: GriddableCellProps<T>): JSX.Element;
export default GriddableCell;
