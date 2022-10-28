import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { TCarrelSize } from "../../../../../../ui/props/i-size";

export interface CommentCellProps {
  children?: React.ReactNode;
  fontSize?: TCarrelSize;
}

export function CommentCell({ children, fontSize = "xs" }: CommentCellProps) {
  return (
    <Accordion fontSize={fontSize} w="full" h="full" allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Flex fontSize="xs">
            {
              // first ten words
              children?.toString().split(" ").slice(0, 10).join(" ")
            }
          </Flex>
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Box
            bg="gray.200"
            py="4"
            px="2"
            fontSize={fontSize}
            fontWeight="semibold"
            h="full"
          >
            {children}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
