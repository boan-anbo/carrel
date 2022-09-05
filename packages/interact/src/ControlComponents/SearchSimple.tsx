import Search from "antd/lib/input/Search";
import {CSSProperties} from "react";

export interface SearchSimpleProps {
    style?: CSSProperties;
    onSearch: (value: string) => void
    placeholder?: string
}

export const SearchSimple = (props: SearchSimpleProps) => {

    function onSearchSearch(value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) {

    }

    return (<Search placeholder={props.placeholder}
                    onSearch={props.onSearch}
                    style={props.style}
                    
    ></Search>)
}
