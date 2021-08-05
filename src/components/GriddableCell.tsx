import React, { ReactNode } from 'react';
import { Grid, Box, Hidden, Checkbox } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import GriddableColumn from './GriddableColumn';

const GriddableCellBox = withStyles((theme: Theme) => ({
    root: {
        minHeight: '100%',
        minWidth: '100%',
    },
}))(Box);

const GriddableCheckbox = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1),
        zIndex: 1,
    },
}))(Checkbox);

interface GriddableCellProps<T> {
    column: GriddableColumn<T>;
    item?: T;
    index: number;
    total: number;
    selected: string[];
    selectable?: boolean;
    mapper?(item: T): string;
    onChange(item: T): any;
    onChangeAll(checked: boolean): any;
}

function GriddableCell<T>(props: GriddableCellProps<T>) {

    const handleAllCheckboxs = (event: React.ChangeEvent<{}>, checked: boolean) => {
        props.onChangeAll(checked);
    };

    const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(props.item!);
    };

    const value = (item: T): ReactNode => {
        const id = props.mapper ? props.mapper(item) : '';
        return (
            <Grid item xs={12}>
                <Grid container justifyContent="flex-start" alignItems="center" alignContent="center" spacing={1}>
                    {props.selectable && (
                        <Grid item xs="auto">
                            <GriddableCheckbox
                                id={id}
                                name={id}
                                value={id}
                                checked={props.selected.indexOf(id) >= 0}
                                onChange={handleSelection}
                                onClick={(event) => event.stopPropagation()}
                            />
                        </Grid>
                    )}
                    <Grid item xs>
                        {props.column.converter(item, props.index)}
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    const title = (): ReactNode => {
        return (
            <Grid item xs={12}>
                <Grid container justifyContent="flex-start" alignItems="center" alignContent="center" spacing={1}>
                    {props.selectable && (
                        <Grid item xs="auto">
                            <GriddableCheckbox
                                id="gridable-all"
                                name="gridable-all"
                                checked={props.selected.length > 0 && props.selected.length === props.total}
                                indeterminate={props.selected.length > 0 && props.selected.length < props.total}
                                onChange={handleAllCheckboxs}
                                disabled={props.total === 0}
                            />
                        </Grid>
                    )}
                    <Grid item xs>
                        {!props.item && (typeof props.column.title === 'string') && (<strong>{props.column.title}</strong>)}
                        {!props.item && (typeof props.column.title !== 'string') && (<div>{props.column.title}</div>)}
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    const content = (): ReactNode => {
        if (props.item) {
            return value(props.item);
        }
        return title();
    };

    return (
        <Hidden
            xsDown={props.column.xs === false}
            smDown={props.column.sm === false}
            mdDown={props.column.md === false}
            lgDown={props.column.lg === false}
            xlDown={props.column.xl === false}>
            <Grid item xs={props.column.xs} sm={props.column.sm} md={props.column.md} lg={props.column.lg} xl={props.column.xl}>
                <GriddableCellBox px={2} display="flex" alignItems="center" justifyContent={props.column.justify || 'flex-start'}>
                    <Box textOverflow="ellipsis"
                        overflow={props.column.fullWidth === undefined || props.column.fullWidth ? undefined : 'auto hidden'}
                        width={props.column.fullWidth === undefined || props.column.fullWidth ? '100%' : undefined}>
                        {content()}
                    </Box>
                </GriddableCellBox>
            </Grid>
        </Hidden>
    );
}

export default GriddableCell;