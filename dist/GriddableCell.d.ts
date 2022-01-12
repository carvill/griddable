import { ReactNode } from 'react';
import GriddableColumn from './GriddableColumn';
interface GriddableCellProps<T> {
    column: GriddableColumn<T>;
    children: ReactNode;
}
declare function GriddableCell<T>(props: GriddableCellProps<T>): JSX.Element;
export default GriddableCell;
