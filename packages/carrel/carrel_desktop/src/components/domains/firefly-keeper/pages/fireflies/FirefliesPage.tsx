import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { Logger, LogSource } from "../../../../../utils/logger";
import { Block } from "../../../../ui/components";
import Page from "../../../../ui/page/Page";
import { FireflyDataTable } from "../../views/components";
import './Fireflies.css';

export interface FirefliesPageProps {}

const LOG = new Logger(LogSource.FireflyTable)
export function FirefliesPage(props: FirefliesPageProps) {

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);



    return (
      <Page
        title="Firefly keeper"
        description="All the fireflies in the project"
      >
        <Block title="Firefly table">
          <FireflyDataTable></FireflyDataTable>
        </Block>
      </Page>
    );
}
