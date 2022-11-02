import { PlainMessage } from "@bufbuild/protobuf/dist/types/message";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dataDir } from "@tauri-apps/api/path";
import { Archive } from "../carrel_server_client/carrel/common/archive/v1/archive_v1_pb";
import { File } from "../carrel_server_client/carrel/common/file/v1/file_v1_pb";
import { Firefly } from "../carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb";
import { Project } from "../carrel_server_client/carrel/common/project/v2/project_v2_pb";
import { TagKeyValueNote } from "../carrel_server_client/carrel/common/tag/v2/tag_v2_pb";
import { ListAllTagGroupsResponse, ListFirefliesByTagResponse, QueryFilesResponse, QueryFirefliesResponse } from "../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import { StandardQuery } from "../carrel_server_client/generic/api/query/v1/query_v1_pb";
import { carrelApi } from "./carrel-api";


// Main entry point for all pages to retrieve data.
// A application-level ReactQuery abstraction that uses carrel api (generated from protobuf) to fetch data
// This is a custom hook that uses useQuery to fetch data from the carrel api
export class ApiQuery {

    log = (message: string, query: string, payload: any) => {

        console.log(`[${query}] ${message}`, payload)
    }


    QueryFilesByArchiveId = (query: StandardQuery | undefined, workingProjectDirectory: string | null, archiveId: number | null, isMock?: boolean) => useQuery(
        ["QueryFilesByArchiveId", workingProjectDirectory, archiveId, query],
        async (): Promise<QueryFilesResponse | null> => {


            if (workingProjectDirectory && archiveId && query) {

                // sending request
                this.log("Sending request", "QueryFilesByArchiveId", { workingProjectDirectory, archiveId, query, isMock })
                let result = await carrelApi.queryFiles(
                    {
                        projectDirectory: workingProjectDirectory,
                        query,
                        isMock
                    }
                )
                this.log("QueryFilesByArchiveId", "QueryFilesByArchiveId", result)
                return result
            } else {
                this.log("QueryFilesByArchiveId Missing condition", "three conditions", {
                    workingProjectDirectory,
                    archiveId,
                    query
                })
            }
            return null;
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

    QueryListRecentProjects = (numberOfProjects: number, isMock?: boolean) => useQuery(
        ["list_recent_projects", numberOfProjects],
        async (): Promise<Project[]> => {
            let appDirectory = isMock ? "C:\\Script\\carrel\\packages\\carrel\\carrel_desktop\\test\\fixtures\\simple_project" : await dataDir()
            let result = await carrelApi.listRecentProjects(
                {
                    numberOfProjects: numberOfProjects,
                    appDirectory
                })

            this.log("QueryListRecentProjects", "list_recent_projects", result)
            return result.projects
        }
    )

    QueryFireflies = (query: StandardQuery | undefined, projectDirectory?: string, isMock?: boolean) => useQuery(
        ["fireflies", query],
        async (): Promise<QueryFirefliesResponse | null> => {

            if (!projectDirectory || !query) {
                return null
            }

            let result = await carrelApi.queryFireflies(
                {
                    query,
                    projectDirectory,
                    isMock
                })

            this.log("QueryFireflies", "fireflies", result)
            return result
        }
    )

    ListAllTagGroups = (projectDirectory: string | undefined) => useQuery(
        ["list_all_tag_groups", projectDirectory],
        async (): Promise<PlainMessage<ListAllTagGroupsResponse> | null> => {

            if (projectDirectory) {

                this.log("ListAllTagGroups", "list_all_tag_groups", { projectDirectory })
                let result = await carrelApi.listAllTagGroups(
                    {
                        projectDirectory
                    })

                this.log("ListAllTagGroups", "list_all_tag_groups", result)
                return result
            }
            return null;
        }
    )

    QueryFirefliesByTags = (projectDirectory?: string, query?: StandardQuery, selectedTags?: TagKeyValueNote[]) => useQuery(
        ["fireflies_by_tags", query, selectedTags],

        async (): Promise<ListFirefliesByTagResponse | null> => {

            this.log("QueryFirefliesByTags", "fireflies_by_tags", { projectDirectory, query, selectedTags })

            if (!projectDirectory || !query || !selectedTags) {
                return null
            }

            let result = await carrelApi.listFirefliesByTags(
                {
                    query,
                    projectDirectory,
                    selectedTags
                })

            return result
        }
    )



}

export const carrelQueries = new ApiQuery()



