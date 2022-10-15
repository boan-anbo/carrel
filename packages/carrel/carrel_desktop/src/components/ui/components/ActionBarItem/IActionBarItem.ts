import { ReactElement, ReactNode } from "react";

export interface IActionBarItem {
    label?: string;
    isDisabled?: boolean;
    isActive?: boolean;
    icon?: ReactNode;
    command?: () => void;
    tooltip?: string;
}