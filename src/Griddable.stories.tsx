import React from 'react'
import Griddable, { GriddableProps } from './Griddable'
import GriddableColumn from './GriddableColumn'

export default {
    title: ':: Griddable ::',
    component: Griddable,
    argTypes: {},
}

interface Item {
    id: string
    name: string
    brand: string
    group: string
    price: number
    quantity: number
    status: string
}

const Template = (args: GriddableProps<Item>) => <Griddable {...args} />

export const Default = Template.bind({})
Default.args = {
    items: [
        {
            id: '1',
            name: 'Pencil',
            brand: 'Mirado',
            group: 'Marcadores',
            price: 5,
            quantity: 10,
            status: 'active',
        },
        {
            id: '2',
            name: 'Notebook',
            brand: 'Scribe',
            group: 'Cuadernos',
            price: 34,
            quantity: 5,
            status: 'active',
        },
        {
            id: '3',
            name: 'Pen',
            brand: 'Bic',
            group: 'Marcadores',
            price: 6,
            quantity: 3,
            status: 'inactive',
        },
        {
            id: '4',
            name: 'Eraser',
            brand: 'Bic',
            group: 'Borradores',
            price: 10,
            quantity: 1,
            status: 'active',
        },
    ] as Item[],
    columns: [
        {
            title: 'ID',
            converter: (item) => item.id,
            xs: true,
        },
        {
            title: 'Nombre',
            converter: (item) => item.name,
            xs: 2,
        },
        {
            title: 'Marca',
            converter: (item) => item.brand,
            xs: 2,
        },
        {
            title: 'Grupo',
            converter: (item) => item.group,
            xs: 2,
        },
        {
            title: 'Precio',
            converter: (item) => item.price,
            textAlign: 'right',
            xs: 1,
        },
        {
            title: 'Unidades',
            converter: (item) => item.quantity,
            textAlign: 'right',
            xs: 2,
        },
        {
            title: 'Estatus',
            converter: (item) => item.status,
            xs: 1,
        },
    ] as GriddableColumn<Item>[],
    loading: false,
    selectable: true,
    expandable: true,
    mapper: (item: Item) => item.id,
    detailMapper: (item: Item) => <span>Detail: {item.name}</span>,
    onChange: (ids: string[], items: Item[]) => console.log(ids),
    onClick: (item: Item) => {
        console.log('here', item)
    },
}
