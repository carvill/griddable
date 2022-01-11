import { ReactNode } from 'react';
import GriddableColumn from './GriddableColumn';
interface GriddableProps<T> {
    items: T[];
    columns: GriddableColumn<T>[];
    loading: boolean;
    empty?: string;
    error?: string;
    selectable?: boolean;
    expandable?: boolean;
    onChange?(ids: string[], items: T[]): any;
    onClick?(item: T): any;
    mapper?(item: T): string;
    detailMapper?(item: T): ReactNode;
}
declare function Griddable<T>(props: GriddableProps<T>): JSX.Element;
export default Griddable;
export type { GriddableProps };
