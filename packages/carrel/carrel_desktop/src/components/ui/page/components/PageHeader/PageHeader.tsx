import { Container, Text, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { PAGE_HEADER_HEIGHT } from "../../../../../styles/constants";

import styles from "./PageHeader.module.scss";

export interface PageHeaderProps {
  title?: string;
  /**
   * The subtitle of the page header
   */
  description?: string;
  leftIcon?: React.ReactNode;
}

export function PageHeader({ title, description, leftIcon }: PageHeaderProps) {
  return (
    <Container margin={0}  h={PAGE_HEADER_HEIGHT} bg="white" maxW="full" className={styles.PageHeader}>
      <HStack  h='full'>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        <Heading fontWeight='normal' size='xs' color="primaryText">{title}</Heading>
        <Text fontSize='sm' color="primaryTextMute">{description}</Text>
      </HStack>
    </Container>
  );
}
