/// <reference types="react" />
import GriddableColumn from './GriddableColumn';
import GriddableSelectable from './GriddableSelectable';
import GriddableExpandable from './GriddableExpandable';
import GriddableClickable from './GriddableClickable';
interface GriddableProps<T> {
    items: T[];
    columns: GriddableColumn<T>[];
    loading: boolean;
    empty?: string;
    error?: string;
    selectable?: GriddableSelectable<T>;
    expandable?: GriddableExpandable<T>;
    clickable?: GriddableClickable<T>;
}
declare function Griddable<T>(props: GriddableProps<T>): JSX.Element;
export default Griddable;
export type { GriddableProps };
