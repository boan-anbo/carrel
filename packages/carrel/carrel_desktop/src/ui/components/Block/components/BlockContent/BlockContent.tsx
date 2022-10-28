import { Container } from "@chakra-ui/react";
import React from "react";

import styles from "./BlockContent.module.scss";

export interface BlockContentProps {
  content?: React.ReactNode;
  // contentHeight need to be set in order to make the content scrollable
  contentHeight?: string;
}

export function BlockContent({
  content = "Block content",
  contentHeight = "full",
}: BlockContentProps) {
  return (
    <Container

      h={contentHeight}
      rounded="xs"
      paddingTop={4}
      paddingBottom={4}
      maxW="full"
      className={styles.BlockContent}
      overflowY="auto"
    >
      {content}
    </Container>
  );
}
