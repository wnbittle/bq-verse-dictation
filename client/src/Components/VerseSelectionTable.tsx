import * as React from "react";
import {
    TableColumnDefinition,
    TableRowId,
    createTableColumn,
    DataGrid,
    DataGridProps,
    DataGridHeader,
    DataGridRow,
    DataGridHeaderCell,
    DataGridBody,
    DataGridCell,
    TableCellLayout,
    TableColumnSizingOptions
} from "@fluentui/react-components";

import IVerse from "../model/IVerse";

export interface IEnhancedVerse extends IVerse {
    id: string;
}

export interface IVerseSelectionTableViewProps {
    items: IEnhancedVerse[];
    selectedVerses: Set<string>;
    onSelectionChanged: (selected: string[]) => void
}

const columns: TableColumnDefinition<IEnhancedVerse>[] = [
    createTableColumn<IEnhancedVerse>({
        columnId: "number",
        compare: (a, b) => {
            return a.number - b.number;
        },
        renderHeaderCell: () => {
            return "#";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    {item.number}
                </TableCellLayout>);
        }
    }),
    createTableColumn<IEnhancedVerse>({
        columnId: "text",
        compare: (a, b) => {
            return a.text.localeCompare(b.text);
        },
        renderHeaderCell: () => {
            return "Text";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout
                    truncate
                >
                    {item.text}
                </TableCellLayout>);
        }
    })
];

export const VerseSelectionTable = (props: IVerseSelectionTableViewProps) => {
    const [selectedRows, setSelectedRows] = React.useState(
        new Set<TableRowId>(props.selectedVerses)
    );

    const onSelectionChange: DataGridProps["onSelectionChange"] = (e, data) => {
        setSelectedRows(data.selectedItems);

        const selected: string[] = [];
        data.selectedItems.forEach(i => {
            selected.push(i as string);
        });
        props.onSelectionChanged(selected);
    };

    // clear the selection when the items list changes
    React.useEffect(() => {
        setSelectedRows(new Set<TableRowId>(props.selectedVerses));
    }, [props.items, props.selectedVerses]);

    const columnSizing: TableColumnSizingOptions = {
        'number': {
            defaultWidth: 40,
            idealWidth: 40,
        }
    };

    return (
        <DataGrid
            items={[...props.items]}
            columns={columns}
            selectionMode="multiselect"
            selectedItems={selectedRows}
            defaultSelectedItems={props.selectedVerses}
            onSelectionChange={onSelectionChange}
            getRowId={(item: IEnhancedVerse) => item.id}
            sortable
            resizableColumns
            size="small"
            columnSizingOptions={columnSizing}
            // as="table"
            style={{ width: '100%' }}
        >
            <DataGridHeader>
                <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
                    {({ renderHeaderCell, columnId }) => {
                        return <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>;
                    }}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<IEnhancedVerse>>
                {({ item, rowId }) => (
                    <DataGridRow<IEnhancedVerse>
                        key={item.id}
                        itemID={item.id}
                        selectionCell={{ "aria-label": "Select row" }}
                    >
                        {({ renderCell, columnId }) => {
                            return <DataGridCell>{renderCell(item)}</DataGridCell>;
                        }}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    );
};