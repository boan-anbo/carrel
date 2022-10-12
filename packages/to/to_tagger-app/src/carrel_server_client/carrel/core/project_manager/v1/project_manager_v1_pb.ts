// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/core/project_manager/v1/project_manager_v1.proto (package carrel.core.project_manager.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Project} from "../../../common/project/v2/project_v2_pb.js";

/**
 * @generated from enum carrel.core.project_manager.v1.CarrelDbType
 */
export enum CarrelDbType {
  /**
   * sqlite default
   *
   * @generated from enum value: CARREL_DB_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * sqlite
   *
   * @generated from enum value: CARREL_DB_TYPE_SQLITE = 1;
   */
  SQLITE = 1,

  /**
   * postgresql
   *
   * @generated from enum value: CARREL_DB_TYPE_POSTGRESQL = 2;
   */
  POSTGRESQL = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(CarrelDbType)
proto3.util.setEnumType(CarrelDbType, "carrel.core.project_manager.v1.CarrelDbType", [
  { no: 0, name: "CARREL_DB_TYPE_UNSPECIFIED" },
  { no: 1, name: "CARREL_DB_TYPE_SQLITE" },
  { no: 2, name: "CARREL_DB_TYPE_POSTGRESQL" },
]);

/**
 * enum ArchiveSourceType
 *
 * @generated from enum carrel.core.project_manager.v1.ArchiveSourceType
 */
export enum ArchiveSourceType {
  /**
   * @generated from enum value: ARCHIVE_SOURCE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ARCHIVE_SOURCE_TYPE_DIRECTORY = 1;
   */
  DIRECTORY = 1,

  /**
   * @generated from enum value: ARCHIVE_SOURCE_TYPE_ZOTERO = 2;
   */
  ZOTERO = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(ArchiveSourceType)
proto3.util.setEnumType(ArchiveSourceType, "carrel.core.project_manager.v1.ArchiveSourceType", [
  { no: 0, name: "ARCHIVE_SOURCE_TYPE_UNSPECIFIED" },
  { no: 1, name: "ARCHIVE_SOURCE_TYPE_DIRECTORY" },
  { no: 2, name: "ARCHIVE_SOURCE_TYPE_ZOTERO" },
]);

/**
 * message to add new archive to a project
 *
 * @generated from message carrel.core.project_manager.v1.AddArchiveDto
 */
export class AddArchiveDto extends Message<AddArchiveDto> {
  /**
   * the name of the archive
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * describe the purpose of the archive
   *
   * @generated from field: string description = 2;
   */
  description = "";

  /**
   * the source of the archive, could be empty, if used, it's usually a synced folder or a Zotero collection etc.
   *
   * @generated from field: string source_url = 3;
   */
  sourceUrl = "";

  /**
   * the type of the source url, could be Directory, Zotero, etc.
   *
   * @generated from field: carrel.core.project_manager.v1.ArchiveSourceType archive_source_type = 4;
   */
  archiveSourceType = ArchiveSourceType.UNSPECIFIED;

  /**
   * the id of the project that the new archive will be associated with
   *
   * @generated from field: int32 project_id = 5;
   */
  projectId = 0;

  constructor(data?: PartialMessage<AddArchiveDto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.core.project_manager.v1.AddArchiveDto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "source_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "archive_source_type", kind: "enum", T: proto3.getEnumType(ArchiveSourceType) },
    { no: 5, name: "project_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddArchiveDto {
    return new AddArchiveDto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddArchiveDto {
    return new AddArchiveDto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddArchiveDto {
    return new AddArchiveDto().fromJsonString(jsonString, options);
  }

  static equals(a: AddArchiveDto | PlainMessage<AddArchiveDto> | undefined, b: AddArchiveDto | PlainMessage<AddArchiveDto> | undefined): boolean {
    return proto3.util.equals(AddArchiveDto, a, b);
  }
}

/**
 *  the message to create a new project
 *
 * @generated from message carrel.core.project_manager.v1.CreateProjectRequest
 */
export class CreateProjectRequest extends Message<CreateProjectRequest> {
  /**
   * the name of the project
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * the description of the project
   *
   * @generated from field: string description = 2;
   */
  description = "";

  /**
   * project folder
   *
   * @generated from field: string directory = 3;
   */
  directory = "";

  /**
   * Carrel db name
   *
   * @generated from field: string db_name = 4;
   */
  dbName = "";

  /**
   * To db name
   *
   * @generated from field: string to_name = 5;
   */
  toName = "";

  constructor(data?: PartialMessage<CreateProjectRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.core.project_manager.v1.CreateProjectRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "directory", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "db_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "to_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateProjectRequest {
    return new CreateProjectRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateProjectRequest {
    return new CreateProjectRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateProjectRequest {
    return new CreateProjectRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateProjectRequest | PlainMessage<CreateProjectRequest> | undefined, b: CreateProjectRequest | PlainMessage<CreateProjectRequest> | undefined): boolean {
    return proto3.util.equals(CreateProjectRequest, a, b);
  }
}

/**
 * Metadata of a project for the app.
 *
 * @generated from message carrel.core.project_manager.v1.ProjectInfo
 */
export class ProjectInfo extends Message<ProjectInfo> {
  /**
   * the id of the project in the CarrelApp database
   * This is NOT the id of the project in individual folders, where the project id is always 1.
   *
   * @generated from field: int32 app_project_id = 1;
   */
  appProjectId = 0;

  /**
   * uuid
   *
   * @generated from field: string uuid = 2;
   */
  uuid = "";

  /**
   * the name of the project
   *
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * the description of the project
   *
   * @generated from field: string description = 4;
   */
  description = "";

  /**
   * project folder
   *
   * @generated from field: string directory = 5;
   */
  directory = "";

  /**
   * Carrel db name
   *
   * @generated from field: string db_name = 6;
   */
  dbName = "";

  /**
   * To db name
   *
   * @generated from field: string to_name = 7;
   */
  toName = "";

  /**
   * Carrel db type
   *
   * @generated from field: carrel.core.project_manager.v1.CarrelDbType db_type = 8;
   */
  dbType = CarrelDbType.UNSPECIFIED;

  /**
   * @generated from field: repeated carrel.common.project.v2.Project project = 12;
   */
  project: Project[] = [];

  constructor(data?: PartialMessage<ProjectInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.core.project_manager.v1.ProjectInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "app_project_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "directory", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "db_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "to_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "db_type", kind: "enum", T: proto3.getEnumType(CarrelDbType) },
    { no: 12, name: "project", kind: "message", T: Project, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ProjectInfo {
    return new ProjectInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ProjectInfo {
    return new ProjectInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ProjectInfo {
    return new ProjectInfo().fromJsonString(jsonString, options);
  }

  static equals(a: ProjectInfo | PlainMessage<ProjectInfo> | undefined, b: ProjectInfo | PlainMessage<ProjectInfo> | undefined): boolean {
    return proto3.util.equals(ProjectInfo, a, b);
  }
}

