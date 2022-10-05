// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/project/v1/project_v1.proto (package carrel.common.project.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Archive} from "../../archive/v1/archive_v1_pb.js";

/**
 * @generated from message carrel.common.project.v1.Project
 */
export class Project extends Message<Project> {
  /**
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * the name of the project
   *
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * description of the project
   *
   * @generated from field: optional string description = 3;
   */
  description?: string;

  /**
   * the working folder of the project
   *
   * @generated from field: optional string working_folder = 4;
   */
  workingFolder?: string;

  /**
   * last time the project was modified in ISO 8601 format
   *
   * @generated from field: string updated_at = 5;
   */
  updatedAt = "";

  /**
   * last time the project was opened in ISO 8601 format
   *
   * @generated from field: string opened_at = 6;
   */
  openedAt = "";

  /**
   * created
   *
   * @generated from field: string created_at = 7;
   */
  createdAt = "";

  /**
   * finished at
   *
   * @generated from field: optional string finished_at = 8;
   */
  finishedAt?: string;

  /**
   * the id of the archive associated with the project;
   * the archive
   *
   * @generated from field: repeated carrel.common.archive.v1.Archive archives = 9;
   */
  archives: Archive[] = [];

  constructor(data?: PartialMessage<Project>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.project.v1.Project";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "working_folder", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "updated_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "opened_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "created_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "finished_at", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 9, name: "archives", kind: "message", T: Archive, repeated: true },
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
