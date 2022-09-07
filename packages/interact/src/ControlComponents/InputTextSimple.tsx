import {ChangeEventHandler, CSSProperties, FormEventHandler} from "react";
import {Input} from "antd";
import {SizeType} from "antd/lib/config-provider/SizeContext";

export interface InputTextSimpleProps {
    min?: number;
    size?: SizeType;
    style?: CSSProperties;
    onInputChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit?: FormEventHandler<HTMLInputElement> | undefined;
    placeholder?: string;
    children?: JSX.Element | JSX.Element[];
    prefix?: JSX.Element | JSX.Element[];
}


export const InputTextSimple = (props: InputTextSimpleProps) => {

    function onSearchSearch(value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) {

    }


    return (<Input size={props.size}
                   placeholder={props.placeholder}
                   onChange={props.onInputChange}
                   allowClear={true}
                   onSubmit={props.onSubmit}
                   prefix={props.prefix}
                   min={props.min}
    >

    </Input>)
}

InputTextSimple.defaultProps = {
    size: "small",
    children: []
} as Partial<InputTextSimpleProps>
