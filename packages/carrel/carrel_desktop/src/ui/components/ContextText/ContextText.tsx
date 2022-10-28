import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex
} from "@chakra-ui/react";
import Highlighter from "react-highlight-words";
import { TCarrelSize } from "../../props/i-size";

export interface ContextTextProps {
  context: string;
  highlight?: string;
  fontSize?: TCarrelSize;
}

export function ContextText({
  context,
  highlight,
  fontSize,
}: ContextTextProps) {
  return (
    <Accordion fontSize={fontSize} w="full" h="full" allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Flex fontSize="xs">Context</Flex>
        </AccordionButton>
        <AccordionPanel pb={4}>
            <Highlighter
              highlightClassName="highlighted-text"
              searchWords={[highlight || ""]}
              autoEscape={true}
              textToHighlight={context}
            />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
