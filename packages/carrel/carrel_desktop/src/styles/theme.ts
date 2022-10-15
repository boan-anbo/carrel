import { extendTheme, Heading, ThemeConfig, withDefaultColorScheme, withDefaultSize } from "@chakra-ui/react";
import { Button } from "./components/button";
import { Checkbox } from "./components/checkbox";
import { Table } from "./components/table";
import { colors } from "./foundations/colors";
import {Text} from './components/text'
import { borderRadius } from "./foundations/borders";
import { fontSizes, sizes, styles, fonts } from "./styles";
  const overrides = {
    fonts,
    colors,
    styles,
    sizes,
    fontSizes,
    borderRadius,
    components: {
        Button,
        Table,
        Checkbox,
        Heading,
        Text
    }
  }

const defaultSize ={
    size: 'sm',
    components: ['Button', 'Heading', 'IconButton'],
}

const defaultColorScheme= {
    colorScheme: 'teal',
}

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
}

export const carrelTheme = extendTheme(
    overrides,
    config,
    withDefaultSize(defaultSize),
    withDefaultColorScheme(defaultColorScheme),
)