import { Accordion } from "@chakra-ui/react";
import React, { useMemo } from "react";

import styles from "./Accordian.module.scss";
import {
  CarrelAccordionItem,
  AccordionItemProps,
} from "./components/AccordionItem/AccordionItem";

export interface AccordianProps {
  items: AccordionItemProps[];
}

export function CarrelAccordion({ items }: AccordianProps) {
  const panelItems = useMemo(
    () => items.map((item, index) => <CarrelAccordionItem {...item} key={index} />),
    [items]
  );

  return <Accordion allowMultiple>{panelItems}</Accordion>;
}
