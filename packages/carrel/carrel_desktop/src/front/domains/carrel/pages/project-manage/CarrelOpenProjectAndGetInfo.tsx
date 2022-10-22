import {PlainMessage} from "@bufbuild/protobuf/dist/types/message";
import {
    OpenProjectRequest,
    OpenProjectResponse,
} from "../../../../../backend/carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import {carrelApi} from "../../../../../backend/server-api/carrel-api";

export async function carrelOpenProjectAndGetInfo(workingFolder: string, app_directory: string): Promise<PlainMessage<OpenProjectResponse>> {
    console.log(workingFolder);

    const request: PlainMessage<OpenProjectRequest> = {} as PlainMessage<OpenProjectRequest>;
    request.projectDirectory = workingFolder;
    request.appDirectory = app_directory;

    return await carrelApi.openProject(
        request
    )
}
