import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../styles/light.css";
import { CUButtonVariant } from "./CUButtonVariant";

export const button = style(
    {
        color: vars.colors.first,
        backgroundColor: vars.colors.firstBackground,
        border: `1px solid ${vars.colors.firstBorder}`,
        borderRadius: vars.spacing[1],
        padding: vars.spacing[1],
        ':hover': {
            backgroundColor: vars.colors.firstButtonHover,
        }
    }
)
export const buttonStyles = recipe({
    base: {

    },
    variants: {
        size: {
            xs: {
                fontSize: vars.fontSizes.xs
            },
            sm: {
                fontSize: vars.fontSizes.sm
            },
            md: {
                fontSize: vars.fontSizes.md
            },
            lg: {
                fontSize: vars.fontSizes.lg
            },
            xl: {
                fontSize: vars.fontSizes.xl
            },
            '2xl': {
                fontSize: vars.fontSizes['2xl']
            },
            '3xl': {
                fontSize: vars.fontSizes['3xl']
            },
            '4xl': {
                fontSize: vars.fontSizes['4xl']
            },
            '5xl': {
                fontSize: vars.fontSizes['5xl']
            }
            
        },
        
        variant: {

[CUButtonVariant.NAVIGATION]: {
                color: vars.colors.first,
                backgroundColor: vars.colors.firstBackground,
                border: `1px solid ${vars.colors.firstBorder}`,
                ':hover': {
                    backgroundColor: vars.colors.firstButtonHover,
                }
            },
            [CUButtonVariant.ACTION]: {
                color: vars.colors.second,
                backgroundColor: vars.colors.secondBackground,
                border: `1px solid ${vars.colors.secondBorder}`,
                ':hover': {
                    backgroundColor: vars.colors.secondButtonHover,
                }
            },
            [CUButtonVariant.ACTION_2nd]: {
                color: vars.colors.third,
                backgroundColor: vars.colors.thirdBackground,
                border: `1px solid ${vars.colors.thirdBorder}`,
                ':hover': {
                    backgroundColor: vars.colors.thirdButtonHover,
                }
            
            },

        },


    },
    )
    