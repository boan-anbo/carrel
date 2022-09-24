// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/distant/api/v1/distant_api_v1.proto (package distant.api.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3, protoInt64} from "@bufbuild/protobuf";
import {Passage} from "../../../common/passage/v1/passage_pb.js";

/**
 * @generated from message distant.api.v1.DistantApiSearchRequest
 */
export class DistantApiSearchRequest extends Message<DistantApiSearchRequest> {
  /**
   * @generated from field: string query = 1;
   */
  query = "";

  /**
   * @generated from field: repeated string indices = 2;
   */
  indices: string[] = [];

  constructor(data?: PartialMessage<DistantApiSearchRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "distant.api.v1.DistantApiSearchRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "query", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "indices", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DistantApiSearchRequest {
    return new DistantApiSearchRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DistantApiSearchRequest {
    return new DistantApiSearchRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DistantApiSearchRequest {
    return new DistantApiSearchRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DistantApiSearchRequest | PlainMessage<DistantApiSearchRequest> | undefined, b: DistantApiSearchRequest | PlainMessage<DistantApiSearchRequest> | undefined): boolean {
    return proto3.util.equals(DistantApiSearchRequest, a, b);
  }
}

/**
 * @generated from message distant.api.v1.DistantApiSearchResponse
 */
export class DistantApiSearchResponse extends Message<DistantApiSearchResponse> {
  /**
   * @generated from field: repeated carrel.common.passage.v1.Passage passages = 1;
   */
  passages: Passage[] = [];

  /**
   * / count
   *
   * @generated from field: sint64 count = 2;
   */
  count = protoInt64.zero;

  /**
   * / optional scroll_id
   *
   * @generated from field: optional string scroll_id = 3;
   */
  scrollId?: string;

  /**
   * @generated from field: bool has_more = 4;
   */
  hasMore = false;

  constructor(data?: PartialMessage<DistantApiSearchResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "distant.api.v1.DistantApiSearchResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "passages", kind: "message", T: Passage, repeated: true },
    { no: 2, name: "count", kind: "scalar", T: 18 /* ScalarType.SINT64 */ },
    { no: 3, name: "scroll_id", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "has_more", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DistantApiSearchResponse {
    return new DistantApiSearchResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DistantApiSearchResponse {
    return new DistantApiSearchResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DistantApiSearchResponse {
    return new DistantApiSearchResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DistantApiSearchResponse | PlainMessage<DistantApiSearchResponse> | undefined, b: DistantApiSearchResponse | PlainMessage<DistantApiSearchResponse> | undefined): boolean {
    return proto3.util.equals(DistantApiSearchResponse, a, b);
  }
}

/**
 * @generated from message distant.api.v1.DistantApiScrollRequest
 */
export class DistantApiScrollRequest extends Message<DistantApiScrollRequest> {
  /**
   * @generated from field: string scroll_id = 1;
   */
  scrollId = "";

  constructor(data?: PartialMessage<DistantApiScrollRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "distant.api.v1.DistantApiScrollRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "scroll_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DistantApiScrollRequest {
    return new DistantApiScrollRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DistantApiScrollRequest {
    return new DistantApiScrollRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DistantApiScrollRequest {
    return new DistantApiScrollRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DistantApiScrollRequest | PlainMessage<DistantApiScrollRequest> | undefined, b: DistantApiScrollRequest | PlainMessage<DistantApiScrollRequest> | undefined): boolean {
    return proto3.util.equals(DistantApiScrollRequest, a, b);
  }
}

/**
 * @generated from message distant.api.v1.IndexInfo
 */
export class IndexInfo extends Message<IndexInfo> {
  /**
   * @generated from field: string health = 1;
   */
  health = "";

  /**
   * @generated from field: string status = 2;
   */
  status = "";

  /**
   * @generated from field: string index = 3;
   */
  index = "";

  /**
   * @generated from field: string uuid = 4;
   */
  uuid = "";

  /**
   * @generated from field: string pri = 5;
   */
  pri = "";

  /**
   * @generated from field: string rep = 6;
   */
  rep = "";

  /**
   * @generated from field: string docs_count = 7;
   */
  docsCount = "";

  /**
   * @generated from field: string docs_deleted = 8;
   */
  docsDeleted = "";

  /**
   * @generated from field: string store_size = 9;
   */
  storeSize = "";

  /**
   * @generated from field: string pri_store_size = 10;
   */
  priStoreSize = "";

  constructor(data?: PartialMessage<IndexInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "distant.api.v1.IndexInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "health", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "index", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "pri", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "rep", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "docs_count", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "docs_deleted", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "store_size", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "pri_store_size", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IndexInfo {
    return new IndexInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IndexInfo {
    return new IndexInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IndexInfo {
    return new IndexInfo().fromJsonString(jsonString, options);
  }

  static equals(a: IndexInfo | PlainMessage<IndexInfo> | undefined, b: IndexInfo | PlainMessage<IndexInfo> | undefined): boolean {
    return proto3.util.equals(IndexInfo, a, b);
  }
}

/**
 * @generated from message distant.api.v1.DistantListIndexResponse
 */
export class DistantListIndexResponse extends Message<DistantListIndexResponse> {
  /**
   * @generated from field: repeated distant.api.v1.IndexInfo indices = 1;
   */
  indices: IndexInfo[] = [];

  /**
   * count sint32
   *
   * @generated from field: int32 count = 2;
   */
  count = 0;

  constructor(data?: PartialMessage<DistantListIndexResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "distant.api.v1.DistantListIndexResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "indices", kind: "message", T: IndexInfo, repeated: true },
    { no: 2, name: "count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DistantListIndexResponse {
    return new DistantListIndexResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DistantListIndexResponse {
    return new DistantListIndexResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DistantListIndexResponse {
    return new DistantListIndexResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DistantListIndexResponse | PlainMessage<DistantListIndexResponse> | undefined, b: DistantListIndexResponse | PlainMessage<DistantListIndexResponse> | undefined): boolean {
    return proto3.util.equals(DistantListIndexResponse, a, b);
  }
}

