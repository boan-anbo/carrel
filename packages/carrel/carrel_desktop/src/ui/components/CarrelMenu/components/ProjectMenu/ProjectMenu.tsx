import { PlainMessage } from "@bufbuild/protobuf";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../../../../backend/carrel_server_client/carrel/common/project/v2/project_v2_pb";
import { ProjectInfo } from "../../../../../backend/carrel_server_client/carrel/core/project_manager/v1/project_manager_v1_pb";
import { carrelApi } from "../../../../../backend/server-api/carrel-api";
import { carrelQueries } from "../../../../../backend/server-api/carrel-queries";
import { carrelDialogs } from "../../../../../backend/tauri/fs/carrel_dialogs";
import { appDir } from "../../../../../backend/tauri/fs/get_app_data_dir";
import { carrelOpenProjectAndGetInfo } from "../../../../../front/domains/carrel/pages/project-manage/CarrelOpenProjectAndGetInfo";
import { setWorkingProject } from "../../../../../front/store/slices/working-project-state/working-project-state";
import { RootState } from "../../../../../front/store/store";
import {
  CarrelMenu,
  CarrelMenuItem,
  CarrelMenuItemType,
} from "../../CarrelMenu";

export interface ProjectMenuProps {
  prop?: string;
}

export function ProjectMenu({ prop = "default value" }: ProjectMenuProps) {
  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );

  const dispatch = useDispatch();

  const { data: recentProjects } = carrelQueries.QueryListRecentProjects(
    10,
    true
  );

  const openProject = async (workingfolder: string) => {
    const app_directory = await appDir();
    const response = await carrelOpenProjectAndGetInfo(
      workingfolder,
      app_directory
    );

    dispatch(
      setWorkingProject(response.projectInfo as PlainMessage<ProjectInfo>)
    );
  };

  const projectMenu = useMemo(() => {
    return {
      label: "Project",
      type: CarrelMenuItemType.Item,
      subItems: [
        {
          type: CarrelMenuItemType.Item,
          label: "New directory",
          command: (e: Event, data: string) => {
            alert("Open directory: " + data);
          },
          data: "data",
          shortcut: "Ctrl+Shift+N",
        },
        {
          type: CarrelMenuItemType.Separator,
        },
        {
          type: CarrelMenuItemType.Item,
          label: "Open",
          command: async (e: Event, data: string) => {
            console.log("onOpenProjectFolder");
            const workingfolder = await carrelDialogs.openProjectDirectory();
            if (workingfolder) {
              await openProject(workingfolder);
            }
          },
        },
        {
          type: CarrelMenuItemType.ItemWithSubItems,
          label: "Open recent",
          subItems: recentProjects?.map((project) => {
            return {
              type: CarrelMenuItemType.Item,
              label: project.name,
              command: async (e: Event, data: Project) => {
                if (data.projectDirectory)
                  await openProject(data.projectDirectory);
              },
              data: project,
            } as CarrelMenuItem<Project>;
          }),
        },
      ] as CarrelMenuItem<any>[],
    };
  }, [recentProjects]);

  return <CarrelMenu rootItem={projectMenu} />;
}
