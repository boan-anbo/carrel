import { Highlight } from "@chakra-ui/react";
import { TCarrelFontWeight } from "../../props/i-font-weight";
import { TCarrelSize } from "../../props/i-size";

export interface HighlightableProps {
  text: string;
  highlightColor?: string;
  fontSize?: TCarrelSize;
  fontWeight?: TCarrelFontWeight;
  childrenBefore?: string;
  childrenAfter?: string;
  highlightQuery: string[];
}

export function Highlightable({
  text,
  highlightColor = "yellow.200",
  fontSize = "md",
  fontWeight = "normal",
  childrenBefore,
  childrenAfter,
  highlightQuery,
  ...props
}: HighlightableProps) {
  return <>
  {childrenBefore}
  <Highlight
              query={highlightQuery}
              styles={{ bg: highlightColor, fontWeight }}
            >
  {text}
  </Highlight>
  {childrenAfter}
  </>;
}
