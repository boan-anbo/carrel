import {createTheme } from '@vanilla-extract/css';
import {defineProperties} from "@vanilla-extract/sprinkles";

export const [baseThemeClass, baseVars] = createTheme({
    fontSizes: {
        small: '12px',
        medium: '16px',
    },
    spacing: {
        0: '2px',
        1: '8px',
    },
    lineHeights: {
        small: '16px',
        medium: '24px',

    }
});

const responsiveProperties = defineProperties({
    conditions: {
        mobile: {},
        tablet: { "@media": "screen and (min-width: 768px)" },
        desktop: { "@media": "screen and (min-width: 1024px)" }
    },
    defaultCondition: "desktop",
    properties: {
        fontSize: baseVars.fontSizes,
        lineHeight: baseVars.lineHeights
    },
    shorthands: {
        text: ["fontSize", "lineHeight"]
    }
});
export const colors = {
    text: '#81dbdb',
    background: '#fff',

    gray: '#D3D7DA',
    highlight: 'hsla(205, 100%, 40%, 0.125)',

    success: 'green',
    message: 'blue',
    warning: 'yellow',
    danger: 'red',
    // basic colors
    white: '#FFF',
    black: '#111212',

    // core colors

    // first: the primary color
    first: '#00311f',
    firstBackground: '#F2F5F8',
    firstButtonHover: '#00311f8e',
    firstBorder: '#2877c7',
    // second: the secondary color
    second: '#13a872',
    secondBackground: '#F2F5F8',
    secondButtonHover: '#00311f8e',
    secondBorder: '#2877c7',

    // third: the tertiary color
    third: '#00311f',
    thirdBackground: '#F2F5F8',
    thirdButtonHover: '#00311f8e',
    thirdBorder: '#2877c7',

    muted: '#f6f6f9',
}

export const gradients = {
    subtle: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    purple: `linear-gradient(180deg, ${colors.primary} 0%, #A000C4 100%)`,
    blue: `linear-gradient(180deg, #00D2FF 0%, ${colors.secondary} 100%)`,
}

export const font = {
    family: {
        sans: '"Inter", sans-serif',
        mono: '"Fira Code", monospace',
    },
}

export const layout = {
    flex: {
        horizontal: {
            display: 'flex',
            flexDirection: 'row',
        },
    }

}

export const spacing = {
    0: '0em',
    1: '0.25em',
    2: '0.5em',
    3: '1em',
    4: '2em',
    5: '4em',
    6: '8em',
    7: '16em',
    8: '32em',
    9: '64em',
}

export const fontSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
}

export const fontStyles = {
    normal: 'normal',
    italic: 'italic',
}

export const fontWeight = {
    normal: 'normal',
    bold: 'bold',
    light: 'light',
    lighter: 'lighter',
    bolder: 'bolder',
}

export const lineHeights = {
    xs: '1rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '1.75rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem',
    '5xl': '1',

}

export const [lightTheme, vars] = createTheme({
    colors,
    gradients,
    font,
    fontSizes,
    fontStyles,
    layout,
    spacing,
    lineHeights,
});
