// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/file/v1/file_v1.proto (package carrel.common.file.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message carrel.common.file.v1.File
 */
export class File extends Message<File> {
  /**
   * id
   *
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * / filename, with extension
   *
   * @generated from field: string file_name = 10;
   */
  fileName = "";

  /**
   * / file extension
   *
   * @generated from field: string file_extension = 11;
   */
  fileExtension = "";

  /**
   * / file directory
   *
   * @generated from field: string file_dir = 12;
   */
  fileDir = "";

  /**
   * @generated from field: string file_full_path = 13;
   */
  fileFullPath = "";

  constructor(data?: PartialMessage<File>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.file.v1.File";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "file_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "file_extension", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 12, name: "file_dir", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 13, name: "file_full_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): File {
    return new File().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): File {
    return new File().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): File {
    return new File().fromJsonString(jsonString, options);
  }

  static equals(a: File | PlainMessage<File> | undefined, b: File | PlainMessage<File> | undefined): boolean {
    return proto3.util.equals(File, a, b);
  }
}

