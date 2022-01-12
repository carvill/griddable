export default interface GriddableSelectable<T> {
    selected: string[]
    fixed?: string[]
    mapper(item: T): string
    onChange(ids: string[], items: T[]): any
}
