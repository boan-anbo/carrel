import {Table} from "@tanstack/react-table";
import { TCarrelSize } from "../../props/i-size";

export interface CarrelDataTableInternalParams<T> {
    table: Table<T>;
    resultTotalCount?: number;
    isLoaded?: boolean;
    size?: TCarrelSize;
}
