import {fireflyKeeperApi} from "../../backend/server-api/carrel-api";
import {Fireflies} from "../../backend/carrel_server_client/carrel/firefly_keeper/v1/firefly_keeper_v1_pb";

export const actionRefreshFireflies = async (workingProjectDirectory: string | undefined): Promise<Fireflies | null> => {
    if (!workingProjectDirectory) {
        return null;
    }

    const result = await fireflyKeeperApi.scanFolderForFireflies(
        {
            directory: workingProjectDirectory,
            classifiedOnly: false,
            ignoreDirectories: ['.git'],
        }
    )
    console.log(result);
    if (result.fireflies) {
        const {fireflies} = result;
        return fireflies;
    }
    return null
}
