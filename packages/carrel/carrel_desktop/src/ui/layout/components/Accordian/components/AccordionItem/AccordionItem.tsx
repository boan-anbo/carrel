import React, { ReactNode } from "react";

import styles from "./AccordionItem.module.scss";
import { Box, keyframes } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
export interface AccordionItemProps {
  id: string;
  header: ReactNode;
  content: ReactNode;
}

export function CarrelAccordionItem({
  id,
  header,
  content,
  ...props
}: AccordionItemProps) {
  const open = keyframes({
    from: { height: 0 },
    to: { height: "var(--radix-accordion-content-height)" },
  });

  const close = keyframes({
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: 0 },
  });

  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          {header}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        as={Box}
        overflow="hidden"
        transition="height 0.3s"
        // css={{
        //   '&[data-state="open"]': {
        //     animation: `${open} 0.3s ease-in-out`,
        //   },
        //   '&[data-state="closed"]': {
        //     animation: `${close} 0.3s ease-in-out`,
        //   },
        // }}
      >
        {content}
      </AccordionPanel>
    </AccordionItem>
  );
}
