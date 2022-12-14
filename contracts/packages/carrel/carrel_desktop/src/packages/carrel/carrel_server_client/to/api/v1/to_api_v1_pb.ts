// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file to/api/v1/to_api_v1.proto (package to.api.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message to.api.v1.ToApiScanRequest
 */
export class ToApiScanRequest extends Message<ToApiScanRequest> {
  /**
   * @generated from field: string text = 1;
   */
  text = "";

  constructor(data?: PartialMessage<ToApiScanRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "to.api.v1.ToApiScanRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ToApiScanRequest {
    return new ToApiScanRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ToApiScanRequest {
    return new ToApiScanRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ToApiScanRequest {
    return new ToApiScanRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ToApiScanRequest | PlainMessage<ToApiScanRequest> | undefined, b: ToApiScanRequest | PlainMessage<ToApiScanRequest> | undefined): boolean {
    return proto3.util.equals(ToApiScanRequest, a, b);
  }
}

/**
 * @generated from message to.api.v1.ToApiTagScanResult
 */
export class ToApiTagScanResult extends Message<ToApiTagScanResult> {
  /**
   * @generated from field: string text_original = 1;
   */
  textOriginal = "";

  /**
   * @generated from field: string text_cleaned = 2;
   */
  textCleaned = "";

  /**
   * @generated from field: repeated to.api.v1.ToApiTag tags = 3;
   */
  tags: ToApiTag[] = [];

  constructor(data?: PartialMessage<ToApiTagScanResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "to.api.v1.ToApiTagScanResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "text_original", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "text_cleaned", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "tags", kind: "message", T: ToApiTag, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ToApiTagScanResult {
    return new ToApiTagScanResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ToApiTagScanResult {
    return new ToApiTagScanResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ToApiTagScanResult {
    return new ToApiTagScanResult().fromJsonString(jsonString, options);
  }

  static equals(a: ToApiTagScanResult | PlainMessage<ToApiTagScanResult> | undefined, b: ToApiTagScanResult | PlainMessage<ToApiTagScanResult> | undefined): boolean {
    return proto3.util.equals(ToApiTagScanResult, a, b);
  }
}

/**
 * @generated from message to.api.v1.ToApiTag
 */
export class ToApiTag extends Message<ToApiTag> {
  /**
   * @generated from field: string key = 1;
   */
  key = "";

  /**
   * @generated from field: string value = 2;
   */
  value = "";

  /**
   * @generated from field: string note = 3;
   */
  note = "";

  /**
   * @generated from field: string tag_string = 4;
   */
  tagString = "";

  constructor(data?: PartialMessage<ToApiTag>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "to.api.v1.ToApiTag";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "tag_string", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ToApiTag {
    return new ToApiTag().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ToApiTag {
    return new ToApiTag().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ToApiTag {
    return new ToApiTag().fromJsonString(jsonString, options);
  }

  static equals(a: ToApiTag | PlainMessage<ToApiTag> | undefined, b: ToApiTag | PlainMessage<ToApiTag> | undefined): boolean {
    return proto3.util.equals(ToApiTag, a, b);
  }
}

