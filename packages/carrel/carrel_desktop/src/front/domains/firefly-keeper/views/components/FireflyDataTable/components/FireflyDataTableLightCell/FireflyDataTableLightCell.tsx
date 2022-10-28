import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { CellContext } from "@tanstack/react-table";
import { Firefly } from "../../../../../../../../backend/carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb";
import { ContextText } from "../../../../../../../../ui/components/ContextText";
import { TCarrelSize } from "../../../../../../../../ui/props/i-size";

import styles from "./FireflyDataTableLightCell.module.scss";

export interface FireflyDataTableLightCellProps {
  cell: CellContext<Firefly, unknown>;
  fontSize: TCarrelSize;
}

export function FireflyDataTableLightCell({
  cell,
  fontSize = "xs",
}: FireflyDataTableLightCellProps) {
  let lightText = cell.getValue() as string;
  let context = cell.row.original.context;
  return (
    <Container p="0" fontSize={fontSize} h="full" w="full">
      <VStack h="full">
        <Box p="1">
          <Text
            bg="yellow.200"
            color="black"
            fontWeight="normal"
            fontStyle="italic"
            className={styles.light}
          >
            "{lightText}"
          </Text>
        </Box>
        <ContextText
          fontSize={fontSize}
          context={context}
          highlight={lightText}
        />
      </VStack>
    </Container>
  );
}
