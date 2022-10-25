// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/server/fs_manager/v1/server_fs_manager_v1.proto (package carrel.server.fs_manager.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Directory} from "../../../common/directory/v1/directory_v1_pb.js";

/**
 * @generated from message carrel.server.fs_manager.v1.GetDirectoryTreeRequest
 */
export class GetDirectoryTreeRequest extends Message<GetDirectoryTreeRequest> {
  /**
   * @generated from field: string directory = 1;
   */
  directory = "";

  constructor(data?: PartialMessage<GetDirectoryTreeRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.server.fs_manager.v1.GetDirectoryTreeRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "directory", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetDirectoryTreeRequest {
    return new GetDirectoryTreeRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetDirectoryTreeRequest {
    return new GetDirectoryTreeRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetDirectoryTreeRequest {
    return new GetDirectoryTreeRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetDirectoryTreeRequest | PlainMessage<GetDirectoryTreeRequest> | undefined, b: GetDirectoryTreeRequest | PlainMessage<GetDirectoryTreeRequest> | undefined): boolean {
    return proto3.util.equals(GetDirectoryTreeRequest, a, b);
  }
}

/**
 * @generated from message carrel.server.fs_manager.v1.GetDirectoryTreeResponse
 */
export class GetDirectoryTreeResponse extends Message<GetDirectoryTreeResponse> {
  /**
   * @generated from field: carrel.common.directory.v1.Directory directory_tree = 1;
   */
  directoryTree?: Directory;

  constructor(data?: PartialMessage<GetDirectoryTreeResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.server.fs_manager.v1.GetDirectoryTreeResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "directory_tree", kind: "message", T: Directory },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetDirectoryTreeResponse {
    return new GetDirectoryTreeResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetDirectoryTreeResponse {
    return new GetDirectoryTreeResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetDirectoryTreeResponse {
    return new GetDirectoryTreeResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetDirectoryTreeResponse | PlainMessage<GetDirectoryTreeResponse> | undefined, b: GetDirectoryTreeResponse | PlainMessage<GetDirectoryTreeResponse> | undefined): boolean {
    return proto3.util.equals(GetDirectoryTreeResponse, a, b);
  }
}

/**
 * @generated from message carrel.server.fs_manager.v1.ReadFileRequest
 */
export class ReadFileRequest extends Message<ReadFileRequest> {
  /**
   * @generated from field: string file_path = 1;
   */
  filePath = "";

  constructor(data?: PartialMessage<ReadFileRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.server.fs_manager.v1.ReadFileRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReadFileRequest {
    return new ReadFileRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReadFileRequest {
    return new ReadFileRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReadFileRequest {
    return new ReadFileRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ReadFileRequest | PlainMessage<ReadFileRequest> | undefined, b: ReadFileRequest | PlainMessage<ReadFileRequest> | undefined): boolean {
    return proto3.util.equals(ReadFileRequest, a, b);
  }
}

/**
 * @generated from message carrel.server.fs_manager.v1.ReadFileResponse
 */
export class ReadFileResponse extends Message<ReadFileResponse> {
  /**
   * @generated from field: string file_path = 1;
   */
  filePath = "";

  /**
   * @generated from field: string file_content = 2;
   */
  fileContent = "";

  constructor(data?: PartialMessage<ReadFileResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.server.fs_manager.v1.ReadFileResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file_content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReadFileResponse {
    return new ReadFileResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReadFileResponse {
    return new ReadFileResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReadFileResponse {
    return new ReadFileResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ReadFileResponse | PlainMessage<ReadFileResponse> | undefined, b: ReadFileResponse | PlainMessage<ReadFileResponse> | undefined): boolean {
    return proto3.util.equals(ReadFileResponse, a, b);
  }
}

/**
 * @generated from message carrel.server.fs_manager.v1.WriteFileRequest
 */
export class WriteFileRequest extends Message<WriteFileRequest> {
  /**
   * @generated from field: string file_path = 1;
   */
  filePath = "";

  /**
   * @generated from field: string file_content = 2;
   */
  fileContent = "";

  constructor(data?: PartialMessage<WriteFileRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.server.fs_manager.v1.WriteFileRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file_content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WriteFileRequest {
    return new WriteFileRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WriteFileRequest {
    return new WriteFileRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WriteFileRequest {
    return new WriteFileRequest().fromJsonString(jsonString, options);
  }

  static equals(a: WriteFileRequest | PlainMessage<WriteFileRequest> | undefined, b: WriteFileRequest | PlainMessage<WriteFileRequest> | undefined): boolean {
    return proto3.util.equals(WriteFileRequest, a, b);
  }
}

/**
 * @generated from message carrel.server.fs_manager.v1.WriteFileResponse
 */
export class WriteFileResponse extends Message<WriteFileResponse> {
  /**
   * @generated from field: string file_path = 1;
   */
  filePath = "";

  /**
   * @generated from field: string file_content = 2;
   */
  fileContent = "";

  constructor(data?: PartialMessage<WriteFileResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.server.fs_manager.v1.WriteFileResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file_content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WriteFileResponse {
    return new WriteFileResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WriteFileResponse {
    return new WriteFileResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WriteFileResponse {
    return new WriteFileResponse().fromJsonString(jsonString, options);
  }

  static equals(a: WriteFileResponse | PlainMessage<WriteFileResponse> | undefined, b: WriteFileResponse | PlainMessage<WriteFileResponse> | undefined): boolean {
    return proto3.util.equals(WriteFileResponse, a, b);
  }
}

