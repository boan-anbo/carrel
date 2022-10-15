// import {useState} from "react";
//
// const [lazyParams, setLazyParams] = useState({
//     first: 0,
//     rows: 10,
//     page: 1,
//     sortField: null,
//     sortOrder: null,
//     filters: {
//         // 'name': { value: '', matchMode: 'contains' },
//         // 'country.name': { value: '', matchMode: 'contains' },
//         // 'company': { value: '', matchMode: 'contains' },
//         // 'representative.name': { value: '', matchMode: 'contains' },
//     }
// });


import {
    Condition,
    FilterSet,
    OPERATOR, SortCondition,
    SortDirection,
    StandardQuery
} from "../carrel_server_client/generic/api/query/v1/query_v1_pb";
import {PlainMessage} from "@bufbuild/protobuf";
import {camel_to_snake_case} from "../utils/camel_to_snake_case";
import { SortingState } from "@tanstack/react-table";


export class StandardQueryHelper {

    public static addArchiveId(query: StandardQuery, archiveId: number) {
        return this.addMustCondition(query, "archive_id", archiveId.toString(), OPERATOR.OPERATOR_EQUALS);
    }

    public static addMustCondition(query: StandardQuery, fieldName: string, fieldValue: string, operator: OPERATOR): StandardQuery {
        const condition = new Condition();
        condition.field = fieldName;
        condition.operator = operator;
        condition.value = fieldValue;
        if (query.filter) {
            query.filter.must.push(condition);
        }
        else {
            const filter = new FilterSet();
            filter.must.push(condition);
            query.filter = filter;
        }
        return query;
    }

    public static NormalizeFieldNames = (query: StandardQuery): StandardQuery => {

        // normalize all condition fields
        for (const condition of query.filter?.must ?? []) {
            condition.field = camel_to_snake_case(condition.field);
        }

        for (const condition of query.filter?.any ?? []) {
            condition.field = camel_to_snake_case(condition.field);
        }

        if (query.sort) {
            query.sort.field = camel_to_snake_case(query.sort.field);
        }

        return query;

    }

    static fromPageChange(pageIndex: number, pageSize: number, sorting: SortingState, globalFilter: string) {
        const query = new StandardQuery();
        query.offset = pageIndex * pageSize;
        query.length = pageSize;

        for (const sort of sorting) {
            const sortCondition = new SortCondition();
            sortCondition.field = sort.id;
            sortCondition.order = sort.desc ? SortDirection.DESC : SortDirection.ASC;
            query.sort = sortCondition;
        }

        if (globalFilter) {
            if (query.filter) {
                query.filter.globalFilter = globalFilter;
            } else {
                const filterSet = new FilterSet();
                filterSet.globalFilter = globalFilter;
                query.filter = filterSet;
            }
        }
        return query;
    }
}
