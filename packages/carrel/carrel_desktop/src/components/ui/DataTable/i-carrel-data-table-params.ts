import {Table} from "@tanstack/react-table";

export interface CarrelDataTableInternalParams<T> {
    table: Table<T>;
    isLoaded?: boolean;
}
