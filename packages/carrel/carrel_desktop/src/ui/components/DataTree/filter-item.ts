import { IDataTreeCollection, IDataTreeItem } from "./i-data-tree-node";
import _ from 'lodash';

/**
 * @param collection
 * @param filter
 * @param filterFields: E.g. filter the fileName of the item's data ['data', 'fileName']
 */
export const shouldShowDataTreeItem = (item: IDataTreeItem<any> | IDataTreeCollection<any>, filterPatern: RegExp, filterFields: string[][]): string | undefined => {
    if (filterFields.length === 0) {
        return '';
    }
    // iterate over the filter fields
    for (let i = 0; i < filterFields.length; i++) {
        const field = filterFields[i];
        // parse field parse written in the format: "field1.field2.field3"
        let value = _.get(item, field, null);
        if (value === null) {
            continue;
        }
        // convert to string
        value = value.toString();
        // check if the value matches the pattern
        if (filterPatern.test(value)) {
            const matchedSubString = value.match(filterPatern)[0];
            return matchedSubString;
        }
    }
    return undefined;
}

export interface NodeMatch {
    key: string;
    substring: string;
}