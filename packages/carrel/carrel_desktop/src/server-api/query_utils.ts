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


import {DataTableFilterParams} from "primereact";
import {
    Condition,
    FilterSet,
    OPERATOR, SortCondition,
    SortDirection,
    StandardQuery
} from "../carrel_server_client/generic/api/query/v1/query_v1_pb";
import {PlainMessage} from "@bufbuild/protobuf";
import {DataTablePFSEvent} from "primereact/datatable";
import {camel_to_snake_case} from "../utils/camel_to_snake_case";
import {DataViewPageParams} from "primereact/dataview";


export class ApiStandardQuery {


    /**
     * Convert a lazy param to a standard query
     *
     * For repeated conditions, use the must or any conditions parameters.
     *
     * For example, I want to query only file columns with a certain archive Id, then add a Must condition for it, by calling
     *
     * ```javascript
     *
     * const archive_id_condition = new Condition();
     * archive_id_condition.field = 'archive_id';
     * archive_id_condition.operator = OPERATOR.EQUAL;
     * archive_id_condition.value = '123';
     *
     * const query = ApiStandardQuery.fromLazyParam(lazyParam, [archive_id_condition]);     *
     *
     * ```
     * @param params
     * @param additional_must_conditions
     * @param additional_any_conditions
     * @constructor
     */
    public static DatatableParamsToQueryParams = (
        params: DataTablePFSEvent,
        additional_must_conditions?: PlainMessage<Condition>[],
        additional_any_conditions?: PlainMessage<Condition> []
    ): StandardQuery => {

        let query: StandardQuery = new StandardQuery();
        query.offset = params.first;
        query.length = params.rows;
        query.findOne = false;
        query.page = params.page ?? 0;

        // loop over filters
        const filterSet: FilterSet = new FilterSet();

        // try get global filter value
        let global_filter_entyr: string = params.filters['global']
        let global_filter_value = ''
        if (global_filter_entyr) {
            global_filter_value = global_filter_entyr

        }
        console.log('global_filter_value', global_filter_value);
        for (const [lazy_filter_field, lazy_filter] of Object.entries(params.filters)) {
            // skip global
            if (lazy_filter_field === 'global') {
                continue
            }
            // get field_condition key and values;
            for (const [field_condition_key, field_condition_value] of Object.entries(lazy_filter)) {
                const condition = new Condition();
                condition.field = lazy_filter_field;

                if (!condition.field || condition.field === 'null') {
                    continue;
                }

                if (field_condition_key === 'matchMode') {
                    switch (field_condition_value) {
                        case 'contains':
                            condition.operator = OPERATOR.OPERATOR_CONTAINS;
                            break;
                    }

                } else if (field_condition_key === 'value') {
                    condition.value = field_condition_value;
                }

                if (global_filter_value.length > 0) {
                    // add global filter value to the condition
                    condition.value = global_filter_value;
                    condition.operator = OPERATOR.OPERATOR_CONTAINS;
                }

                if (condition.value || condition.valueList.length > 0 || condition.valueTo) {

                    filterSet.any.push(condition);
                }
            }
        }

        // adding must conditions
        if (additional_must_conditions) {

            filterSet.must.push(...additional_must_conditions.map((condition) => new Condition(condition)));
        }

        // adding any conditions
        if (additional_any_conditions) {
            filterSet.any.push(...additional_any_conditions.map((condition) => new Condition(condition)));
        }

        query.filter = filterSet;

        // load sort
        if (params.sortField) {
            const sortCondition = new SortCondition();
            sortCondition.field = params.sortField;
            sortCondition.order = params.sortOrder === 1 ? SortDirection.ASC : SortDirection.DESC;
            query.sort = sortCondition;
        }


        query = ApiStandardQuery.NormalizeFieldNames(query);

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

    /**
     *
     * Helper function to query files in a certain archive
     *
     * @param params
     * @param archiveId
     * @constructor
     */
    public static QueryArchiveFiles = (params: DataTablePFSEvent, archiveId: number): StandardQuery => {
        return ApiStandardQuery.DatatableParamsToQueryParams(params, [
                {
                    field: 'archive_id',
                    operator: OPERATOR.OPERATOR_EQUALS,
                    value: archiveId.toString(),
                    valueList: [],
                    valueTo: '',
                }
            ],
            []);
    }

    public static QueryFireflyFiles = (params: DataTablePFSEvent, fireflyId: number): StandardQuery => {
        return ApiStandardQuery.DatatableParamsToQueryParams(params, [],
            []);
    }


    static DataViewPageParamsToApiStandardQuery(pageParams: DataViewPageParams) {
        const query = new StandardQuery();
        query.offset = pageParams.first;
        query.length = pageParams.rows;

        return query;

    }
}
