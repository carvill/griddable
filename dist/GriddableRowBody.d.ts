import { ReactNode } from 'react';
import GriddableColumn from './GriddableColumn';
interface GriddableRowBodyProps<T> {
    item: T;
    total: number;
    selectable?: boolean;
    expandable?: boolean;
    columns: GriddableColumn<T>[];
    selectedIds: string[];
    onLocalChange(item: T): any;
    onLocalChangeAll(checked: boolean): any;
    onClick?(item: T): any;
    mapper?(item: T): string;
    detailMapper?(item: T): ReactNode;
}
declare function GriddableRowBody<T>(props: GriddableRowBodyProps<T>): JSX.Element;
export default GriddableRowBody;
