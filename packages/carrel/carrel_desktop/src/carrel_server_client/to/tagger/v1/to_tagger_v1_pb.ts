// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file to/tagger/v1/to_tagger_v1.proto (package to.tagger.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {ToApiTag} from "../../api/v1/to_api_v1_pb.js";

/**
 * @generated from message to.tagger.v1.ScanResult
 */
export class ScanResult extends Message<ScanResult> {
  /**
   * @generated from field: string file_path = 1;
   */
  filePath = "";

  /**
   * @generated from field: string file_name = 2;
   */
  fileName = "";

  /**
   * To have package name `to_api_models` is crucial for imports, otherwise Protoc will complain
   *
   * @generated from field: to.tagger.v1.ToParserResult results = 3;
   */
  results?: ToParserResult;

  constructor(data?: PartialMessage<ScanResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "to.tagger.v1.ScanResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file_path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "file_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "results", kind: "message", T: ToParserResult },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScanResult {
    return new ScanResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScanResult {
    return new ScanResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScanResult {
    return new ScanResult().fromJsonString(jsonString, options);
  }

  static equals(a: ScanResult | PlainMessage<ScanResult> | undefined, b: ScanResult | PlainMessage<ScanResult> | undefined): boolean {
    return proto3.util.equals(ScanResult, a, b);
  }
}

/**
 * @generated from message to.tagger.v1.ToParserResult
 */
export class ToParserResult extends Message<ToParserResult> {
  /**
   * @generated from field: string text_original = 1;
   */
  textOriginal = "";

  /**
   * @generated from field: string text_cleaned = 2;
   */
  textCleaned = "";

  /**
   * @generated from field: repeated to.api.v1.ToApiTag tos = 3;
   */
  tos: ToApiTag[] = [];

  constructor(data?: PartialMessage<ToParserResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "to.tagger.v1.ToParserResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "text_original", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "text_cleaned", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "tos", kind: "message", T: ToApiTag, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ToParserResult {
    return new ToParserResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ToParserResult {
    return new ToParserResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ToParserResult {
    return new ToParserResult().fromJsonString(jsonString, options);
  }

  static equals(a: ToParserResult | PlainMessage<ToParserResult> | undefined, b: ToParserResult | PlainMessage<ToParserResult> | undefined): boolean {
    return proto3.util.equals(ToParserResult, a, b);
  }
}

