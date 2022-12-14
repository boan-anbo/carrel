// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file generic/api/files_request/v1/files_request_v1.proto (package generic.api.files_request.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * A generic request contains an array of file paths.
 *
 * @generated from message generic.api.files_request.v1.FilesRequest
 */
export class FilesRequest extends Message<FilesRequest> {
  /**
   * @generated from field: repeated string file_paths = 1;
   */
  filePaths: string[] = [];

  /**
   * description of the request.
   *
   * @generated from field: string note = 2;
   */
  note = "";

  constructor(data?: PartialMessage<FilesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "generic.api.files_request.v1.FilesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file_paths", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FilesRequest {
    return new FilesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FilesRequest {
    return new FilesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FilesRequest {
    return new FilesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: FilesRequest | PlainMessage<FilesRequest> | undefined, b: FilesRequest | PlainMessage<FilesRequest> | undefined): boolean {
    return proto3.util.equals(FilesRequest, a, b);
  }
}

