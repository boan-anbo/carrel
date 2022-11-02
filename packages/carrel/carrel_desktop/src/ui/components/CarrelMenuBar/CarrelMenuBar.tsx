import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { carrelApi } from "../../../backend/server-api/carrel-api";
import { RootState } from "../../../front/store/store";
import { DROPDOWN_MENU_ITEM_HEIGHT_NUMBER } from "../../styles/constants";
import {
  CarrelMenu,
  CarrelMenuItem,
  CarrelMenuItemType,
} from "../CarrelMenu/CarrelMenu";
import { ProjectMenu } from "../CarrelMenu/components/ProjectMenu";

import styles from "./CarrelMenuBar.module.scss";

export interface CarrelMenuBarProps {
  prop?: string;
}

export function CarrelMenuBar({ prop = "default value" }: CarrelMenuBarProps) {
  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );
  return (
    <Flex
      pt="0.5"
      align="baseline"
      px="10"
      zIndex={6}
      w="full"
      h="full"
      bg="bgDark"
    >
      <Box h="full">
        <Text
          color="white"
          h={DROPDOWN_MENU_ITEM_HEIGHT_NUMBER}
          fontWeight="bold"
        >
          C
        </Text>
      </Box>
      <ProjectMenu />
      <Spacer minW="20px" />
      <Box h="full">
        <Text color="gray.200">{workingProject?.name ?? "No project"}</Text>
      </Box>
      <Spacer minW="20px" />
      <Box></Box>
    </Flex>
  );
}
