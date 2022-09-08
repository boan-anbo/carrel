import Search from "antd/lib/input/Search";
import {CSSProperties} from "react";

export interface SearchSimpleProps {
    style?: CSSProperties;
    onSearch: (value: string) => void
    onChange: (value: string) => void
    placeholder?: string
}

export const SearchSimple = (props: SearchSimpleProps) => {


    function onSearchChange(e: any) {
        props.onChange(e.target.value);
    }

    return (<Search
        allowClear
        placeholder={props.placeholder}
                    onSearch={props.onSearch}

                    onChange={onSearchChange}
                    style={props.style}

    ></Search>)
}
