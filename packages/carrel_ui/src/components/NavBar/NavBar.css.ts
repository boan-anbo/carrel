import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/light.css";

export const navBar = style(
    {
        color: vars.colors.first,
        backgroundColor: vars.colors.firstBackground,
        // bottom only
        borderBottom: `1px solid ${vars.colors.firstBorder}`,
        paddingTop: vars.spacing[1],
        paddingBottom: vars.spacing[1],
    }
)

export const navBarTitle = style(
    {
        fontSize: vars.fontSizes[2],
        fontWeight: 'lighter'

    }
)
