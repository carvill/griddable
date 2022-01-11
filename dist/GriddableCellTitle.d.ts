/// <reference types="react" />
import GriddableColumn from './GriddableColumn';
interface GriddableCellTitleProps<T> {
    column: GriddableColumn<T>;
    total: number;
    selected: string[];
    selectable?: boolean;
    onChangeAll(checked: boolean): any;
}
declare function GriddableCellTitle<T>(props: GriddableCellTitleProps<T>): JSX.Element;
export default GriddableCellTitle;
