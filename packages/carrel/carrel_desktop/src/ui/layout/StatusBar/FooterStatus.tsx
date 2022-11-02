import { RootState } from "../../../front/store/store";
import { useSelector } from "react-redux";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
function FooterStatus() {
  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );

  const items = [
    {
      label: "Directory",
    },
    {
      label: workingProject?.directory,
      command: () => {
        open(workingProject?.directory ?? "");
      },
    },
  ].map((item, index) => {
    return (
      <BreadcrumbItem key={index}>
        {item.label}
        <BreadcrumbLink onClick={item.command} />
      </BreadcrumbItem>
    );
  });

  return (
    <Box bg="bgDark" w="full" h="full">
      <Breadcrumb>{items}</Breadcrumb>
    </Box>
  );
}

export default FooterStatus;
