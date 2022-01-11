import React from 'react';
import GriddableColumn from './GriddableColumn';
interface GriddableCellValueProps<T> {
    column: GriddableColumn<T>;
    item: T;
    index: number;
    selected: string[];
    selectable?: boolean;
    expandable?: boolean;
    expanded?: boolean;
    mapper?(item: T): string;
    onChange(item: T): any;
    onExpand?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any;
}
declare function GriddableCellValue<T>(props: GriddableCellValueProps<T>): JSX.Element;
export default GriddableCellValue;
