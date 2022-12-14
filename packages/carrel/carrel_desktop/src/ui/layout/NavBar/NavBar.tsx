import { Container, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CarrelPageRoutes } from "../../../front/domains/carrel/routes/carrel-page-routes";

export interface NavBarProps {
  /**
   * The title of the NavBar, usually the name of the app.
   */
  title?: string;

  /**
   * MenuBarItems to be displayed in the NavBar.
   * ReactElement []
   */
  menuBarItems?: React.ReactNode[];
}

export function NavBar({ title = "Title", menuBarItems = [] }: NavBarProps) {
  const navigate = useNavigate();
  return (
    <Container
      alignContent={"baseline"}
      bg="appBg"
      h="100%"
      py="0"
      maxW="full"
      px={4}
    >
      <HStack h="full" px={8}>
        <Heading
          onClick={(_) => navigate(CarrelPageRoutes.mainWorkArea.absolutePath)}
          w={"30%"}
          color="primaryText"
        >
          {title}
        </Heading>
        <Flex px={8} w="full" justify={"space-around"}>
          {menuBarItems}
        </Flex>
        <Heading textAlign={"center"} w={"30%"}>
          Right
        </Heading>
      </HStack>
    </Container>
  );
}
