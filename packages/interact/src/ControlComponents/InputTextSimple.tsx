import Search from "antd/lib/input/Search";
import {CSSProperties, ReactNode, useRef} from "react";
import {Input} from "antd";
import {SizeType} from "antd/lib/config-provider/SizeContext";

export class InputTextSimpleProps {
    size: SizeType;
    style?: CSSProperties;
    onInputChange?: (value: string) => void;
    onInputEnter?: (value: string) => void;
    placeholder?: string;
    children?: ReactNode;
}


export const InputTextSimple = (props: InputTextSimpleProps) => {

    function onSearchSearch(value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) {

    }

    return (<Input size={props.size}
                   placeholder={props.placeholder}
                   prefix={props.children}>

    </Input>)
}

InputTextSimple.defaultProps = {
    size: "small"
}
