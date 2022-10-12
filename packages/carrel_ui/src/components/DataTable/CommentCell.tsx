import {NoInfer} from "@tanstack/react-table";
import React from "react";

export function CommentCell(props: { value: NoInfer<String> }) {
    return <div>
        <div>CCC: {props.value}</div>
    </div>;
}
