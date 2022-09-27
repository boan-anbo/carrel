// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/snippet/v1/snippet_v1.proto (package carrel.common.snippet.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * describes the location of a snippet of string in a plaintext file.
 *
 * @generated from message carrel.common.snippet.v1.SnippetLocation
 */
export class SnippetLocation extends Message<SnippetLocation> {
  /**
   *
   *
   * @generated from field: string snippet = 1;
   */
  snippet = "";

  /**
   * the line number of the snippet in the file
   *
   * @generated from field: int32 line_number = 2;
   */
  lineNumber = 0;

  /**
   * the column number, starting index, of the snippet in the file
   *
   * @generated from field: int32 column_number = 3;
   */
  columnNumber = 0;

  /**
   * the length of the snippet
   *
   * @generated from field: int32 length = 4;
   */
  length = 0;

  /**
   * the file path of the snippet
   *
   * @generated from field: string file_path = 5;
   */
  filePath = "";

  /**
   * the file name of the snippet
   *
   * @generated from field: string file_name = 6;
   */
  fileName = "";

  /**
   * the file extension of the snippet
   *
   * @generated from field: string file_extension = 7;
   */
  fileExtension = "";

  constructor(data?: PartialMessage<SnippetLocation>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.snippet.v1.SnippetLocation";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "snippet", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "line_number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "column_number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "length", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "file_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "file_extension", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnippetLocation {
    return new SnippetLocation().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnippetLocation {
    return new SnippetLocation().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnippetLocation {
    return new SnippetLocation().fromJsonString(jsonString, options);
  }

  static equals(a: SnippetLocation | PlainMessage<SnippetLocation> | undefined, b: SnippetLocation | PlainMessage<SnippetLocation> | undefined): boolean {
    return proto3.util.equals(SnippetLocation, a, b);
  }
}

