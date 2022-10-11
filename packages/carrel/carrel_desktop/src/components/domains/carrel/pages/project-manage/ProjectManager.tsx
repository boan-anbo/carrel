import {PageSection} from "../../../../ui/page-section/PageSection";
import {ActionItem} from "../../../../ui/action-item/ActionItem";
import {Button} from "@blueprintjs/core";
import {useDispatch} from "react-redux";
import Page from "../../../../ui/page/Page";
import {setWorkingProject} from "../../../../../store/slices/working-project-state/working-project-state";
import {CurrentWorkingProjectInfo} from "./CurrentWorkingProjectInfo";
import {carrelOpenProjectAndGetInfo} from "./CarrelOpenProjectAndGetInfo";
import {carrelDialogs} from "../../../../../fs/carrel_dialogs";
import {ListBox} from "primereact";
import {useState} from "react";
import {Project} from "../../../../../carrel_server_client/carrel/common/project/v2/project_v2_pb";
import {carrelQueries} from "../../../../../server-api/carrel-queries";
import {appDir} from "../../../../../fs/get_app_data_dir";
import {PlainMessage} from "@bufbuild/protobuf/dist/types/message";
import {Logger, LogSource} from "../../../../../utils/logger";
import {InspectorItemType, setInspectorItem} from "../../../../../store/slices/inspector/inspector";
import {ProjectManageListItem} from "./ProjectManagerItemList";
import {ProjectInfo} from "../../../../../carrel_server_client/carrel/core/project_manager/v1/project_manager_v1_pb";

const LOG = new Logger(LogSource.ProjectManager);

export function ProjectManager() {
    const {data, loading, isSuccess} = carrelQueries.QueryListRecentProjects(10);

    const dispatch = useDispatch();

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    async function onOpenProjectFolder() {
        const workingfolder = await carrelDialogs.openProjectDirectory()
        const app_directory = await appDir();
        const response = await carrelOpenProjectAndGetInfo(workingfolder, app_directory);

        dispatch(setWorkingProject(response.projectInfo as PlainMessage<ProjectInfo>));
    }

    if (!isSuccess) {
        return <div>Loading...</div>
    }


    const optionTemplate = (item: Project) => {
        return <ProjectManageListItem item={item}/>
    }


    async function openSelectedProject(value: Project) {
        const workingProject = value.projectDirectory;
        const app_directory = await appDir();

        if (workingProject && app_directory) {

            LOG.info("Opening project: " + workingProject, workingProject, workingProject);
            LOG.info("App directory: " + app_directory, app_directory, app_directory);
            LOG.info("Project", 'project', value);

            const response = await carrelOpenProjectAndGetInfo(workingProject, app_directory);

            dispatch(setWorkingProject(response.projectInfo as PlainMessage<ProjectInfo>));
        }
        console.log(value);
        setSelectedProject(value as Project);
        // show the project on inspector
        dispatch(setInspectorItem({
            item: Project,
            itemType: InspectorItemType.Project
        }));

    }

    return <Page>
        <PageSection sectionTitle={'Open or create new project'}>

            <ActionItem description={'Open project'} actions={
                <Button onClick={onOpenProjectFolder}>Open working folder</Button>
            }/>
        </PageSection>

        <ListBox
            disabled={loading}
            value={selectedProject}
            options={data}
            itemTemplate={optionTemplate}
            onChange={(e) => openSelectedProject(e.value)}
        />


        <CurrentWorkingProjectInfo/>

    </Page>;
}
