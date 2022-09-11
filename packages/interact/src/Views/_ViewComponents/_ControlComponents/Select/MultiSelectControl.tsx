import {IMultiSelectControlProps} from "./IMultiSelectControlProps";
import {MultiSelect} from "@mantine/core";
import React, {KeyboardEvent, useEffect} from "react";

export function MultiSelectControl(props: IMultiSelectControlProps) {


    return <MultiSelect
        size={props.size}
        description={props.description}
        label={props.label}
        searchable
        value={props.value}
        placeholder={props.placeholder}
        style={props.style}
        creatable
        onKeyDown={props.onKeyDown}
        clearSearchOnBlur={props.clearSearchOnBlur}
        clearSearchOnChange={props.clearSearchOnChange}
        getCreateLabel={props.getCreateLabel}
        shouldCreate={props.shouldCreate}
        onCreate={props.onCreate}
        onChange={props.onChange}
        data={props.data}
        readOnly={props.readOnly}
    >


    </MultiSelect>;
}
