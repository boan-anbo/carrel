import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button = {
        baseStyle: {
            fontSize: 'light',
            // padding: '0.2rem',
            borderRadius: 'base',
        },
        sizes: {
            md: {
                fontSize: 'md',
            }
        },
        defaultProps: {
            size: 'xs'
        }
    } as ComponentStyleConfig