import {Table} from "@tanstack/react-table";

export interface CarrelDataTableParams<T> {
    table: Table<T>;
    isLoaded?: boolean;
}
