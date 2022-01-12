import { ReactNode } from 'react'

export default interface GriddableExpandable<T> {
    mapper(item: T): ReactNode
}
