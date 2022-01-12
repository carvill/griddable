import { ReactNode } from 'react';
interface GriddableRowDetailProps<T> {
    item: T;
    expanded: boolean;
    mapper(item: T): ReactNode;
}
declare function GriddableRowDetail<T>(props: GriddableRowDetailProps<T>): JSX.Element;
export default GriddableRowDetail;
