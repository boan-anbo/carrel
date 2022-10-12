import {Archive} from "../carrel_server_client/carrel/common/archive/v1/archive_v1_pb";
import {File} from "../carrel_server_client/carrel/common/file/v1/file_v1_pb";
import {
    AddDirectoryToArchiveResponse,
    ListAllProjectArchivesResponse, QueryFirefliesResponse
} from "../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import {carrelApi} from "./carrel-api";
import {Query, QueryFunction, useMutation, useQuery} from "@tanstack/react-query";
import {Firefly} from "../carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb";
import workingProjectState from "../store/slices/working-project-state/working-project-state";
import {BaseDirectory} from "@tauri-apps/api/fs";
import {Project} from "../carrel_server_client/carrel/common/project/v2/project_v2_pb";
import {appDir, dataDir} from "@tauri-apps/api/path";
import {StandardQuery} from "../carrel_server_client/generic/api/query/v1/query_v1_pb";


// Main entry point for all pages to retrieve data.
// A application-level ReactQuery abstraction that uses carrel api (generated from protobuf) to fetch data
// This is a custom hook that uses useQuery to fetch data from the carrel api
export class ApiQuery {

    log = (message: string, query: string, payload: any) => {

        console.log(`[${query}] ${message}`, payload)
    }


    QueryFilesByArchiveId = (workingProjectDirectory: string | null, archiveId: number | null) => useQuery(
        ["QueryFilesByArchiveId", workingProjectDirectory, archiveId],
        async (): Promise<File[]> => {

            if (workingProjectDirectory && archiveId) {

                let result = await carrelApi.listFilesInArchive(
                    {
                        projectDirectory: workingProjectDirectory,
                        archiveId: archiveId
                    }
                )
                this.log("QueryFilesByArchiveId", "QueryFilesByArchiveId", result.files)
                return result.files
            }
            return [];
        }
    )


    QueryListAllProjectFiles = (workingProjectDirectory: string, hello: number) => useQuery(
        ["list_all_project_files", workingProjectDirectory, hello],
        async (): Promise<File[]> => {


            if (workingProjectDirectory) {

                let result = await carrelApi.listAllProjectFiles(
                    {
                        projectDirectory: workingProjectDirectory
                    })

                return result.files
            }
            return [];
        })

    /**
     * @see listFilesInArchive
     * @param workingProjectDirectory
     * @constructor
     */
    QueryListAllProjectArchives = (workingProjectDirectory: string | null) => useQuery(
        ["list_all_project_archives", workingProjectDirectory],
        async (): Promise<Archive[]> => {

            if (workingProjectDirectory) {

                let result = await carrelApi.listAllProjectArchives(
                    {
                        projectDirectory: workingProjectDirectory
                    })

                this.log("QueryListAllProjectArchives", "list_all_project_archives", result)
                return result.archives
            }
            return [];
        })

    QueryListFireliesInProject = (workingProjectDirectory: string | null) => useQuery(
        ["list_all_project_fireflies", workingProjectDirectory],
        async (): Promise<Firefly[]> => {

            if (workingProjectDirectory) {

                let result = await carrelApi.listAllProjectFireflies(
                    {
                        projectDirectory: workingProjectDirectory
                    })

                this.log("QueryListFireliesInProject", "list_all_project_fireflies", result)
                return result.fireflies
            }
            return [];
        })

    /**
     * @see syncProjectArchives
     * @param workingProjectDirectory
     * @constructor
     */
    MutateSyncAllProjectArchives = (workingProjectDirectory: string | null) => useMutation(
        ['sync_all_project_archives']
        , async () => {
            if (workingProjectDirectory) {
                let result = await carrelApi.syncProjectArchives(
                    {
                        projectDirectory: workingProjectDirectory
                    }
                )

                this.log("QuerySyncAllProjectArchives", "sync_all_project_archives", result)

                return result.projectDirectory
            }
        }
    )

    MutateAddDirectoryToArchive = (workingProjectDirectory: string, archiveId: number, sourceDirectory: string) => useMutation(
        ['add_directory_to_archive']
        , async () => {
            if (workingProjectDirectory) {
                let result = await carrelApi.addDirectoryToArchive(
                    {
                        projectDirectory: workingProjectDirectory,
                        archiveId: archiveId,
                        sourceDirectory
                    }
                )
                this.log("MutateAddDirectoryToArchive", "add_directory_to_archive", result)

                return result
            }
        }
    )

    QueryListRecentProjects = (numberOfProjects: number) => useQuery(
        ["list_recent_projects", numberOfProjects],
        async (): Promise<Project[]> => {

            let appDirectory = await dataDir()
            let result = await carrelApi.listRecentProjects(
                {
                    numberOfProjects: numberOfProjects,
                    appDirectory
                })

            this.log("QueryListRecentProjects", "list_recent_projects", result)
            return result.projects
        }
    )

    QueryFireflies = (query: StandardQuery, projectDirectory?: string) => useQuery(
        ["fireflies", query],
        async (): Promise<QueryFirefliesResponse | null> => {

            if (!projectDirectory) {
                return null
            }

            let result = await carrelApi.queryFireflies(
                {
                    query,
                    projectDirectory
                })

            this.log("QueryFireflies", "fireflies", result)
            return result
        }
    )


}

export const carrelQueries = new ApiQuery()



