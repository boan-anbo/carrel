import { Container } from "@chakra-ui/react";
import React from "react";

import styles from "./BlockContent.module.scss";

export interface BlockContentProps {
  content?: React.ReactNode;
  // contentHeight need to be set in order to make the content scrollable
  contentHeight?: string;
  blockContentPaddingTop?: number;
  blockContentPaddingBottom?: number;
}

export function BlockContent({
  content = "Block content",
  contentHeight = "full",
  blockContentPaddingTop = 0,
  blockContentPaddingBottom = 0,
}: BlockContentProps) {
  return (
    <Container
      h={contentHeight}
      rounded="xs"
      paddingTop={blockContentPaddingTop}
      paddingBottom={blockContentPaddingBottom}
      maxW="full"
      className={styles.BlockContent}
      overflowY="auto"
    >
      {content}
    </Container>
  );
}
