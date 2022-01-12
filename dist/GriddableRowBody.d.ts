/// <reference types="react" />
import GriddableColumn from './GriddableColumn';
import GriddableExpandable from './GriddableExpandable';
import GriddableClickable from './GriddableClickable';
interface GriddableRowBodyProps<T> {
    item: T;
    total: number;
    selectable?: boolean;
    columns: GriddableColumn<T>[];
    selectedIds: string[];
    fixedIds?: string[];
    onLocalChange(item: T): any;
    onLocalChangeAll(checked: boolean): any;
    mapper?(item: T): string;
    clickable?: GriddableClickable<T>;
    expandable?: GriddableExpandable<T>;
}
declare function GriddableRowBody<T>(props: GriddableRowBodyProps<T>): JSX.Element;
export default GriddableRowBody;
