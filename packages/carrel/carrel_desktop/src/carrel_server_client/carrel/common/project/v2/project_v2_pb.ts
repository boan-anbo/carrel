// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/project/v2/project_v2.proto (package carrel.common.project.v2, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message carrel.common.project.v2.Project
 */
export class Project extends Message<Project> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: string uuid = 2;
   */
  uuid = "";

  /**
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * @generated from field: string description = 4;
   */
  description = "";

  /**
   * @generated from field: string project_directory = 5;
   */
  projectDirectory = "";

  /**
   * @generated from field: string project_db_directory = 6;
   */
  projectDbDirectory = "";

  /**
   * @generated from field: optional string last_used_at = 7;
   */
  lastUsedAt?: string;

  /**
   * @generated from field: optional string deadline_at = 8;
   */
  deadlineAt?: string;

  /**
   * @generated from field: optional string next_meeting_at = 9;
   */
  nextMeetingAt?: string;

  /**
   * @generated from field: string created_at = 10;
   */
  createdAt = "";

  /**
   * @generated from field: optional string completed_at = 11;
   */
  completedAt?: string;

  /**
   * @generated from field: int32 total_files = 12;
   */
  totalFiles = 0;

  /**
   * @generated from field: int32 total_notes = 13;
   */
  totalNotes = 0;

  /**
   * @generated from field: int32 total_tags = 14;
   */
  totalTags = 0;

  /**
   * @generated from field: int32 total_text_documents = 15;
   */
  totalTextDocuments = 0;

  /**
   * @generated from field: int32 total_archives = 16;
   */
  totalArchives = 0;

  /**
   * @generated from field: int32 importance = 17;
   */
  importance = 0;

  /**
   * @generated from field: int32 task_state = 18;
   */
  taskState = 0;

  /**
   * @generated from field: bool is_favorite = 19;
   */
  isFavorite = false;

  /**
   * @generated from field: bool is_missing = 20;
   */
  isMissing = false;

  /**
   * @generated from field: bool is_hidden = 21;
   */
  isHidden = false;

  /**
   * @generated from field: bool is_archived = 22;
   */
  isArchived = false;

  /**
   * @generated from field: bool is_completed = 23;
   */
  isCompleted = false;

  /**
   * @generated from field: map<string, string> metadata = 24;
   */
  metadata: { [key: string]: string } = {};

  constructor(data?: PartialMessage<Project>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.project.v2.Project";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "project_directory", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "project_db_directory", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "last_used_at", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 8, name: "deadline_at", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 9, name: "next_meeting_at", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 10, name: "created_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "completed_at", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 12, name: "total_files", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 13, name: "total_notes", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 14, name: "total_tags", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 15, name: "total_text_documents", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 16, name: "total_archives", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 17, name: "importance", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 18, name: "task_state", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 19, name: "is_favorite", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 20, name: "is_missing", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 21, name: "is_hidden", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 22, name: "is_archived", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 23, name: "is_completed", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 24, name: "metadata", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Project {
    return new Project().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Project {
    return new Project().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Project {
    return new Project().fromJsonString(jsonString, options);
  }

  static equals(a: Project | PlainMessage<Project> | undefined, b: Project | PlainMessage<Project> | undefined): boolean {
    return proto3.util.equals(Project, a, b);
  }
}

