import { Flex, Heading } from "@chakra-ui/react";
import { BLOCK_HEADER_HEIGHT_NUMBER } from "../../../../styles/constants";

import styles from "./BlockHeader.module.scss";

export interface BlockHeaderProps {
  title?: string;
}

export function BlockHeader({
  title: title = "Block Header",
}: BlockHeaderProps) {
  return (
    <Flex h={BLOCK_HEADER_HEIGHT_NUMBER}>
      <Heading
        bg="primaryBg"
        paddingX={4}
        borderTopRadius="lg"
        paddingTop="1.5"
        paddingBottom="0"
        fontSize="xs"
        color="primaryTextMute"
        fontWeight="normal"
        className={styles.BlockHeader}
      >
        {title}
      </Heading>
    </Flex>
  );
}
