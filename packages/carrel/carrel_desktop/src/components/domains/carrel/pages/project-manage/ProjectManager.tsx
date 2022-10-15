import { PlainMessage } from "@bufbuild/protobuf/dist/types/message";
import { Box, Container, Flex, HStack, StackDivider } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaRProject } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Project } from "../../../../../carrel_server_client/carrel/common/project/v2/project_v2_pb";
import { ProjectInfo } from "../../../../../carrel_server_client/carrel/core/project_manager/v1/project_manager_v1_pb";
import { carrelDialogs } from "../../../../../fs/carrel_dialogs";
import { appDir } from "../../../../../fs/get_app_data_dir";
import { carrelQueries } from "../../../../../server-api/carrel-queries";
import { InspectorItemType, setInspectorItem } from "../../../../../store/slices/inspector/inspector";
import { setWorkingProject } from "../../../../../store/slices/working-project-state/working-project-state";
import { Logger, LogSource } from "../../../../../utils/logger";
import { ActionBar, Block, SelectList } from "../../../../ui/components";
import { IActionBarItem } from "../../../../ui/components/ActionBarItem/IActionBarItem";
import { SelectItem } from "../../../../ui/components/SelectList/components/SelectListItem/ISelectItem";
import Page from "../../../../ui/page/Page";
import { ProjectInfoDisplay } from "../../components/ProjectInfo";
import { carrelOpenProjectAndGetInfo } from "./CarrelOpenProjectAndGetInfo";

const LOG = new Logger(LogSource.ProjectManager);

export interface ProjectManagerProps {
    isMock?: boolean;
}
export function ProjectManager({ isMock, ...props }: ProjectManagerProps) {
  const { data, isLoading, isSuccess } =
    carrelQueries.QueryListRecentProjects(10, isMock);

  const recentProjectSelectItems = useMemo(() => {
    return data?.map((project) => ({
        key: project.id.toString(),
        option: project.name,
        command: (key, project) => openSelectedProject(project),
        data: project,
    } as SelectItem<Project>)) ?? [];

  }, [data]);


  const manageProjectActions = useMemo(
    () =>
      [
        {
          label: "Open Project",
          icon: <FaRProject />,
          command: () => onOpenProjectFolder(),
        },
      ] as IActionBarItem[],
    []
  );

  const projectManagerActionBar = useMemo(() => {
    return <Box py='2'><ActionBar items={manageProjectActions} /></Box>;
  }, []);
  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  async function onOpenProjectFolder() {
    console.log("onOpenProjectFolder");
    const workingfolder = await carrelDialogs.openProjectDirectory();
    const app_directory = await appDir();
    const response = await carrelOpenProjectAndGetInfo(
      workingfolder,
      app_directory
    );

    dispatch(
      setWorkingProject(response.projectInfo as PlainMessage<ProjectInfo>)
    );
  }

  if (!isSuccess) {
    return <div>Loading...</div>;
  }


  async function openSelectedProject(project: Project) {

    setSelectedProject(project as Project);

    const workingProject = project.projectDirectory;
    const app_directory = await appDir();

    if (workingProject && app_directory) {
      LOG.info(
        "Opening project: " + workingProject,
        workingProject,
        workingProject
      );
      LOG.info("App directory: " + app_directory, app_directory, app_directory);
      LOG.info("Project", "project", project);

      const response = await carrelOpenProjectAndGetInfo(
        workingProject,
        app_directory
      );

      dispatch(
        setWorkingProject(response.projectInfo as PlainMessage<ProjectInfo>)
      );
    }
    console.log(project);
    // show the project on inspector
    dispatch(
      setInspectorItem({
        item: Project,
        itemType: InspectorItemType.Project,
      })
    );
  }


  return (
    <Page>
      <Block
        topActionBar={projectManagerActionBar}
        topActionBarJustify="start"
        topActionBarPX={10}
        title="Projects"
      >
        <HStack alignContent="start" divider={<StackDivider />}>
          <Container>
            <SelectList
              showCheckbox={false}
              size="xs"
              listTitle="Recent Projects"
              items={recentProjectSelectItems}
              selectionMode="single"
              onSelectionChanged={(e) => {
                console.log(e);
                openSelectedProject(e[0]?.data as Project);
              }}
            />
          </Container>

          <ProjectInfoDisplay project={selectedProject} title="Project" />
        </HStack>
      </Block>
    </Page>
  );
}
