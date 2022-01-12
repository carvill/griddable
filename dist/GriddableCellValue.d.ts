import React from 'react';
import GriddableColumn from './GriddableColumn';
interface GriddableCellValueProps<T> {
    column: GriddableColumn<T>;
    item: T;
    id: string;
    index: number;
    selected?: boolean;
    disabled?: boolean;
    selectable?: boolean;
    onChange(item: T): any;
    expandable?: boolean;
    expanded?: boolean;
    onExpand?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any;
}
declare function GriddableCellValue<T>(props: GriddableCellValueProps<T>): JSX.Element;
export default GriddableCellValue;
