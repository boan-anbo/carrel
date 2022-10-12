// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file generic/api/query/v1/query_v1.proto (package generic.api.query.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum generic.api.query.v1.OPERATOR
 */
export enum OPERATOR {
  /**
   * @generated from enum value: OPERATOR_UNSPECIFIED = 0;
   */
  OPERATOR_UNSPECIFIED = 0,

  /**
   * @generated from enum value: OPERATOR_EQUALS = 1;
   */
  OPERATOR_EQUALS = 1,

  /**
   * @generated from enum value: OPERATOR_NOT_EQUALS = 2;
   */
  OPERATOR_NOT_EQUALS = 2,

  /**
   * @generated from enum value: OPERATOR_GREATER_THAN = 3;
   */
  OPERATOR_GREATER_THAN = 3,

  /**
   * @generated from enum value: OPERATOR_GREATER_THAN_OR_EQUALS = 4;
   */
  OPERATOR_GREATER_THAN_OR_EQUALS = 4,

  /**
   * @generated from enum value: OPERATOR_LESS_THAN = 5;
   */
  OPERATOR_LESS_THAN = 5,

  /**
   * @generated from enum value: OPERATOR_LESS_THAN_OR_EQUALS = 6;
   */
  OPERATOR_LESS_THAN_OR_EQUALS = 6,

  /**
   * @generated from enum value: OPERATOR_IN = 7;
   */
  OPERATOR_IN = 7,

  /**
   * @generated from enum value: OPERATOR_NOT_IN = 8;
   */
  OPERATOR_NOT_IN = 8,

  /**
   * @generated from enum value: OPERATOR_CONTAINS = 9;
   */
  OPERATOR_CONTAINS = 9,

  /**
   * @generated from enum value: OPERATOR_NOT_CONTAINS = 10;
   */
  OPERATOR_NOT_CONTAINS = 10,

  /**
   * @generated from enum value: OPERATOR_STARTS_WITH = 11;
   */
  OPERATOR_STARTS_WITH = 11,

  /**
   * @generated from enum value: OPERATOR_NOT_STARTS_WITH = 12;
   */
  OPERATOR_NOT_STARTS_WITH = 12,

  /**
   * @generated from enum value: OPERATOR_ENDS_WITH = 13;
   */
  OPERATOR_ENDS_WITH = 13,

  /**
   * @generated from enum value: OPERATOR_NOT_ENDS_WITH = 14;
   */
  OPERATOR_NOT_ENDS_WITH = 14,

  /**
   * @generated from enum value: OPERATOR_EXISTS = 15;
   */
  OPERATOR_EXISTS = 15,

  /**
   * @generated from enum value: OPERATOR_NOT_EXISTS = 16;
   */
  OPERATOR_NOT_EXISTS = 16,

  /**
   * @generated from enum value: OPERATOR_IS_NULL = 17;
   */
  OPERATOR_IS_NULL = 17,

  /**
   * @generated from enum value: OPERATOR_IS_NOT_NULL = 18;
   */
  OPERATOR_IS_NOT_NULL = 18,

  /**
   * @generated from enum value: OPERATOR_IS_TRUE = 19;
   */
  OPERATOR_IS_TRUE = 19,

  /**
   * @generated from enum value: OPERATOR_IS_FALSE = 20;
   */
  OPERATOR_IS_FALSE = 20,

  /**
   * @generated from enum value: OPERATOR_LIKE = 21;
   */
  OPERATOR_LIKE = 21,

  /**
   * @generated from enum value: OPERATOR_NOT_LIKE = 22;
   */
  OPERATOR_NOT_LIKE = 22,

  /**
   * @generated from enum value: OPERATOR_ILIKE = 23;
   */
  OPERATOR_ILIKE = 23,

  /**
   * @generated from enum value: OPERATOR_NOT_ILIKE = 24;
   */
  OPERATOR_NOT_ILIKE = 24,

  /**
   * @generated from enum value: OPERATOR_BETWEEN = 25;
   */
  OPERATOR_BETWEEN = 25,

  /**
   * @generated from enum value: OPERATOR_NOT_BETWEEN = 26;
   */
  OPERATOR_NOT_BETWEEN = 26,
}
// Retrieve enum metadata with: proto3.getEnumType(OPERATOR)
proto3.util.setEnumType(OPERATOR, "generic.api.query.v1.OPERATOR", [
  { no: 0, name: "OPERATOR_UNSPECIFIED" },
  { no: 1, name: "OPERATOR_EQUALS" },
  { no: 2, name: "OPERATOR_NOT_EQUALS" },
  { no: 3, name: "OPERATOR_GREATER_THAN" },
  { no: 4, name: "OPERATOR_GREATER_THAN_OR_EQUALS" },
  { no: 5, name: "OPERATOR_LESS_THAN" },
  { no: 6, name: "OPERATOR_LESS_THAN_OR_EQUALS" },
  { no: 7, name: "OPERATOR_IN" },
  { no: 8, name: "OPERATOR_NOT_IN" },
  { no: 9, name: "OPERATOR_CONTAINS" },
  { no: 10, name: "OPERATOR_NOT_CONTAINS" },
  { no: 11, name: "OPERATOR_STARTS_WITH" },
  { no: 12, name: "OPERATOR_NOT_STARTS_WITH" },
  { no: 13, name: "OPERATOR_ENDS_WITH" },
  { no: 14, name: "OPERATOR_NOT_ENDS_WITH" },
  { no: 15, name: "OPERATOR_EXISTS" },
  { no: 16, name: "OPERATOR_NOT_EXISTS" },
  { no: 17, name: "OPERATOR_IS_NULL" },
  { no: 18, name: "OPERATOR_IS_NOT_NULL" },
  { no: 19, name: "OPERATOR_IS_TRUE" },
  { no: 20, name: "OPERATOR_IS_FALSE" },
  { no: 21, name: "OPERATOR_LIKE" },
  { no: 22, name: "OPERATOR_NOT_LIKE" },
  { no: 23, name: "OPERATOR_ILIKE" },
  { no: 24, name: "OPERATOR_NOT_ILIKE" },
  { no: 25, name: "OPERATOR_BETWEEN" },
  { no: 26, name: "OPERATOR_NOT_BETWEEN" },
]);

/**
 * @generated from enum generic.api.query.v1.SortDirection
 */
export enum SortDirection {
  /**
   * @generated from enum value: SORT_DIRECTION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: SORT_DIRECTION_ASC = 1;
   */
  ASC = 1,

  /**
   * @generated from enum value: SORT_DIRECTION_DESC = 2;
   */
  DESC = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(SortDirection)
proto3.util.setEnumType(SortDirection, "generic.api.query.v1.SortDirection", [
  { no: 0, name: "SORT_DIRECTION_UNSPECIFIED" },
  { no: 1, name: "SORT_DIRECTION_ASC" },
  { no: 2, name: "SORT_DIRECTION_DESC" },
]);

/**
 * @generated from message generic.api.query.v1.FilterSet
 */
export class FilterSet extends Message<FilterSet> {
  /**
   * @generated from field: repeated generic.api.query.v1.Condition must = 1;
   */
  must: Condition[] = [];

  /**
   * a set of filters
   *
   * @generated from field: repeated generic.api.query.v1.Condition any = 2;
   */
  any: Condition[] = [];

  constructor(data?: PartialMessage<FilterSet>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "generic.api.query.v1.FilterSet";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "must", kind: "message", T: Condition, repeated: true },
    { no: 2, name: "any", kind: "message", T: Condition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FilterSet {
    return new FilterSet().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FilterSet {
    return new FilterSet().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FilterSet {
    return new FilterSet().fromJsonString(jsonString, options);
  }

  static equals(a: FilterSet | PlainMessage<FilterSet> | undefined, b: FilterSet | PlainMessage<FilterSet> | undefined): boolean {
    return proto3.util.equals(FilterSet, a, b);
  }
}

/**
 * @generated from message generic.api.query.v1.Condition
 */
export class Condition extends Message<Condition> {
  /**
   * @generated from field: string field = 1;
   */
  field = "";

  /**
   * @generated from field: generic.api.query.v1.OPERATOR operator = 2;
   */
  operator = OPERATOR.OPERATOR_UNSPECIFIED;

  /**
   * the only or first value.
   *
   * @generated from field: optional string value = 3;
   */
  value?: string;

  /**
   * a list of value, to be used with IN, NOT_IN
   *
   * @generated from field: repeated string value_list = 4;
   */
  valueList: string[] = [];

  /**
   * the to value in expressions such as between A and B
   *
   * @generated from field: optional string value_to = 5;
   */
  valueTo?: string;

  constructor(data?: PartialMessage<Condition>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "generic.api.query.v1.Condition";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "operator", kind: "enum", T: proto3.getEnumType(OPERATOR) },
    { no: 3, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "value_list", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 5, name: "value_to", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Condition {
    return new Condition().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Condition {
    return new Condition().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Condition {
    return new Condition().fromJsonString(jsonString, options);
  }

  static equals(a: Condition | PlainMessage<Condition> | undefined, b: Condition | PlainMessage<Condition> | undefined): boolean {
    return proto3.util.equals(Condition, a, b);
  }
}

/**
 * @generated from message generic.api.query.v1.StandardQuery
 */
export class StandardQuery extends Message<StandardQuery> {
  /**
   * @generated from field: generic.api.query.v1.SortCondition sort = 1;
   */
  sort?: SortCondition;

  /**
   * @generated from field: int32 offset = 3;
   */
  offset = 0;

  /**
   * @generated from field: int32 length = 4;
   */
  length = 0;

  /**
   * @generated from field: int32 page = 5;
   */
  page = 0;

  /**
   * @generated from field: generic.api.query.v1.FilterSet filter = 6;
   */
  filter?: FilterSet;

  /**
   * @generated from field: bool find_one = 7;
   */
  findOne = false;

  constructor(data?: PartialMessage<StandardQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "generic.api.query.v1.StandardQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "sort", kind: "message", T: SortCondition },
    { no: 3, name: "offset", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "length", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "page", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "filter", kind: "message", T: FilterSet },
    { no: 7, name: "find_one", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StandardQuery {
    return new StandardQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StandardQuery {
    return new StandardQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StandardQuery {
    return new StandardQuery().fromJsonString(jsonString, options);
  }

  static equals(a: StandardQuery | PlainMessage<StandardQuery> | undefined, b: StandardQuery | PlainMessage<StandardQuery> | undefined): boolean {
    return proto3.util.equals(StandardQuery, a, b);
  }
}

/**
 * this is the message that is the server returns to the query sender
 * It describes only the metadata of the query, not the data itself, which needs a dedicated message
 *
 * @generated from message generic.api.query.v1.StandardQueryResultMetadata
 */
export class StandardQueryResultMetadata extends Message<StandardQueryResultMetadata> {
  /**
   * the actual count of the result contained in the response
   *
   * @generated from field: int32 result_items = 1;
   */
  resultItems = 0;

  /**
   * @generated from field: int32 offset = 2;
   */
  offset = 0;

  /**
   * @generated from field: int32 length = 3;
   */
  length = 0;

  /**
   * @generated from field: int32 page = 4;
   */
  page = 0;

  /**
   * @generated from field: int32 result_total_pages = 5;
   */
  resultTotalPages = 0;

  /**
   * @generated from field: int32 result_total_items = 6;
   */
  resultTotalItems = 0;

  /**
   * @generated from field: generic.api.query.v1.StandardQuery query = 7;
   */
  query?: StandardQuery;

  /**
   * the count of results that are filtered out after the query in the post-processing process.
   * For example, I queried fireflies, but there are 1000 textual objects but only 600 fireflies, then the filtered out count is 400, and the result count is 600, and the total result count is 1000
   * Remember, this does not include the count of the results that are filtered out before the query, such as the ones that are not visible to the user.
   *
   * @generated from field: optional int32 filter_count = 9;
   */
  filterCount?: number;

  /**
   * describe the reason
   *
   * @generated from field: optional string filter_reason = 10;
   */
  filterReason?: string;

  constructor(data?: PartialMessage<StandardQueryResultMetadata>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "generic.api.query.v1.StandardQueryResultMetadata";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "result_items", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "offset", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "length", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "page", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "result_total_pages", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "result_total_items", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "query", kind: "message", T: StandardQuery },
    { no: 9, name: "filter_count", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 10, name: "filter_reason", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StandardQueryResultMetadata {
    return new StandardQueryResultMetadata().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StandardQueryResultMetadata {
    return new StandardQueryResultMetadata().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StandardQueryResultMetadata {
    return new StandardQueryResultMetadata().fromJsonString(jsonString, options);
  }

  static equals(a: StandardQueryResultMetadata | PlainMessage<StandardQueryResultMetadata> | undefined, b: StandardQueryResultMetadata | PlainMessage<StandardQueryResultMetadata> | undefined): boolean {
    return proto3.util.equals(StandardQueryResultMetadata, a, b);
  }
}

/**
 * @generated from message generic.api.query.v1.SortCondition
 */
export class SortCondition extends Message<SortCondition> {
  /**
   * @generated from field: string field = 1;
   */
  field = "";

  /**
   * @generated from field: generic.api.query.v1.SortDirection order = 2;
   */
  order = SortDirection.UNSPECIFIED;

  constructor(data?: PartialMessage<SortCondition>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "generic.api.query.v1.SortCondition";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "order", kind: "enum", T: proto3.getEnumType(SortDirection) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SortCondition {
    return new SortCondition().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SortCondition {
    return new SortCondition().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SortCondition {
    return new SortCondition().fromJsonString(jsonString, options);
  }

  static equals(a: SortCondition | PlainMessage<SortCondition> | undefined, b: SortCondition | PlainMessage<SortCondition> | undefined): boolean {
    return proto3.util.equals(SortCondition, a, b);
  }
}

