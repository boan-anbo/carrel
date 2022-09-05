import {Select, SelectProps, Spin} from "antd";
import {useMemo, useRef, useState} from "react";
import debounce from 'lodash/debounce';
import {filterInteractions} from "../db-operations/filter-operations";
import {
    GetInteractionsQuery,
    GetInteractionsQueryResult, Interaction,
    InteractionsConnection
} from "../grl-client/interact_db_client";

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}

function FilterInteractionInner<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
    >({fetchOptions, debounceTimeout = 400, ...props}: DebounceSelectProps<ValueType>) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<ValueType[]>([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then(newOptions => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select

            size={'small'}
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
            options={options}
        />
    );
}

// Usage of DebounceSelect
export interface SelectValue {
    label: string;
    value: string;
}

async function fetchUserList(label: string): Promise<SelectValue[]> {
    console.log('fetching user', label);
    const result: Interaction[] = await filterInteractions(label);
    console.log(result);

    return result.map(user => {
        return {
            label: user.label,
            value: user.id.toString(),
        } as SelectValue;
    });


}

function FilterInteraction (props: {
    onInteractionSelected: (interactions: SelectValue[]) => void
})  {
    const [value, setValue] = useState<SelectValue[]>([]);


    return (
        <FilterInteractionInner
            mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchUserList}
            onChange={newValue => {
                setValue(newValue as SelectValue[]);
                console.log(`selected ${newValue}`);
                props.onInteractionSelected(value as SelectValue[]);
            }}
            style={{width: '100%'}}
        />
    );
};

export default FilterInteraction;

