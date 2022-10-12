import { style } from "@vanilla-extract/css";
import {vars} from "../../styles/light.css";

export const navBarItem = style(
    {
        color: vars.colors.first,
        background: vars.colors.firstBackground,
    }
);
export const navBarItemButton = style(
    {
        color: vars.colors.danger,
        paddingLeft: vars.spacing[1],
        paddingRight: vars.spacing[1],
        ':hover': {
            color: vars.colors.firstButtonHover,
        }
    }
)
