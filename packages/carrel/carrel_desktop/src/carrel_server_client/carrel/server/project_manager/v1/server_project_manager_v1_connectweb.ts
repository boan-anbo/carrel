// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=ts"
// @generated from file carrel/server/project_manager/v1/server_project_manager_v1.proto (package carrel.server.project_manager.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {AddArchiveRequest, AddArchiveResponse, AddDirectoryToArchiveRequest, AddDirectoryToArchiveResponse, AddFilesToArchiveRequest, AddFilesToArchiveResponse, GetArchiveFilesRequest, GetArchiveFilesResponse, ListAllProjectArchivesRequest, ListAllProjectArchivesResponse, ListAllProjectFilesRequest, ListAllProjectFilesResponse, ListAllProjectFirefliesRequest, ListAllProjectFirefliesResponse, ListAllTagGroupsRequest, ListAllTagGroupsResponse, ListFilesInArchiveRequest, ListFilesInArchiveResponse, ListFirefliesByTagRequest, ListFirefliesByTagResponse, ListRecentProjectsRequest, ListRecentProjectsResponse, OpenProjectRequest, OpenProjectResponse, QueryFilesRequest, QueryFilesResponse, QueryFirefliesRequest, QueryFirefliesResponse, RemoveFilesFromArchiveRequest, RemoveFilesFromArchiveResponse, SyncProjectArchivesRequest, SyncProjectArchivesResponse} from "./server_project_manager_v1_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * services
 *
 * @generated from service carrel.server.project_manager.v1.ProjectManagerService
 */
export const ProjectManagerService = {
  typeName: "carrel.server.project_manager.v1.ProjectManagerService",
  methods: {
    /**
     * open project, return empty response if success
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.OpenProject
     */
    openProject: {
      name: "OpenProject",
      I: OpenProjectRequest,
      O: OpenProjectResponse,
      kind: MethodKind.Unary,
    },
    /**
     * get project information
     * add archive
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.AddArchive
     */
    addArchive: {
      name: "AddArchive",
      I: AddArchiveRequest,
      O: AddArchiveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * list all files
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.GetArchiveFiles
     */
    getArchiveFiles: {
      name: "GetArchiveFiles",
      I: GetArchiveFilesRequest,
      O: GetArchiveFilesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * add file paths to project archive
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.AddFilesToArchive
     */
    addFilesToArchive: {
      name: "AddFilesToArchive",
      I: AddFilesToArchiveRequest,
      O: AddFilesToArchiveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * add all files under directory to project archive
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.AddDirectoryToArchive
     */
    addDirectoryToArchive: {
      name: "AddDirectoryToArchive",
      I: AddDirectoryToArchiveRequest,
      O: AddDirectoryToArchiveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * remove file paths from project archive
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.RemoveFilesFromArchive
     */
    removeFilesFromArchive: {
      name: "RemoveFilesFromArchive",
      I: RemoveFilesFromArchiveRequest,
      O: RemoveFilesFromArchiveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.ListAllProjectArchives
     */
    listAllProjectArchives: {
      name: "ListAllProjectArchives",
      I: ListAllProjectArchivesRequest,
      O: ListAllProjectArchivesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * List all files stored in the archive with the given ID.
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.ListFilesInArchive
     */
    listFilesInArchive: {
      name: "ListFilesInArchive",
      I: ListFilesInArchiveRequest,
      O: ListFilesInArchiveResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.SyncProjectArchives
     */
    syncProjectArchives: {
      name: "SyncProjectArchives",
      I: SyncProjectArchivesRequest,
      O: SyncProjectArchivesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.ListAllProjectFiles
     */
    listAllProjectFiles: {
      name: "ListAllProjectFiles",
      I: ListAllProjectFilesRequest,
      O: ListAllProjectFilesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * fireflies
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.ListAllProjectFireflies
     */
    listAllProjectFireflies: {
      name: "ListAllProjectFireflies",
      I: ListAllProjectFirefliesRequest,
      O: ListAllProjectFirefliesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * generic queries
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.QueryFiles
     */
    queryFiles: {
      name: "QueryFiles",
      I: QueryFilesRequest,
      O: QueryFilesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * query fireflies
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.QueryFireflies
     */
    queryFireflies: {
      name: "QueryFireflies",
      I: QueryFirefliesRequest,
      O: QueryFirefliesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * list most recent projects
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.ListRecentProjects
     */
    listRecentProjects: {
      name: "ListRecentProjects",
      I: ListRecentProjectsRequest,
      O: ListRecentProjectsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * list all tag groups
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.ListAllTagGroups
     */
    listAllTagGroups: {
      name: "ListAllTagGroups",
      I: ListAllTagGroupsRequest,
      O: ListAllTagGroupsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * list all fireflies by tag key and value
     *
     * @generated from rpc carrel.server.project_manager.v1.ProjectManagerService.ListFirefliesByTag
     */
    listFirefliesByTag: {
      name: "ListFirefliesByTag",
      I: ListFirefliesByTagRequest,
      O: ListFirefliesByTagResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

