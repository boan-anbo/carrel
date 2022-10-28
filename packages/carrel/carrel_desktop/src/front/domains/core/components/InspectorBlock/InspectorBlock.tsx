import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Block } from "../../../../../ui/components";
import { RootState } from "../../../../store/store";

export interface InspectorBlockProps {
  prop?: string;
}

export function InspectorBlock({
  prop = "default value",
}: InspectorBlockProps) {
  const appState = useSelector((rootState: RootState) => rootState.appstate);

  const tagDetailList = appState.coreTagsSelected.map((tag) => {
    return (
      <Box>
        <Text>{tag.key}</Text>
      </Box>
    );
  });

  return <Block title="Inspector">{tagDetailList}</Block>;
}
