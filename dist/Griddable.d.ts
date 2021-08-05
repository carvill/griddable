/// <reference types="react" />
import GriddableColumn from './GriddableColumn';
interface GriddableProps<T> {
    items: T[];
    columns: GriddableColumn<T>[];
    empty?: string;
    loading: boolean;
    error?: string;
    onClick?(item: T): any;
    selectable?: boolean;
    mapper?(item: T): string;
    onChange?(ids: string[], items: T[]): any;
}
declare function Griddable<T>(props: GriddableProps<T>): JSX.Element;
export default Griddable;
