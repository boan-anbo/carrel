// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/tree/v1/tree_v1.proto (package carrel.common.tree.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Any, Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum carrel.common.tree.v1.TreeData
 */
export enum TreeData {
  /**
   * @generated from enum value: TREE_DATA_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: TREE_DATA_ARCHIVE_V1 = 1;
   */
  ARCHIVE_V1 = 1,

  /**
   * @generated from enum value: TREE_DATA_FILE_V1 = 2;
   */
  FILE_V1 = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(TreeData)
proto3.util.setEnumType(TreeData, "carrel.common.tree.v1.TreeData", [
  { no: 0, name: "TREE_DATA_UNSPECIFIED" },
  { no: 1, name: "TREE_DATA_ARCHIVE_V1" },
  { no: 2, name: "TREE_DATA_FILE_V1" },
]);

/**
 * A collection of materials for certain purposes and associated with certain projects.
 *
 * @generated from message carrel.common.tree.v1.TreeNodeItem
 */
export class TreeNodeItem extends Message<TreeNodeItem> {
  /**
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * @generated from field: string key = 2;
   */
  key = "";

  /**
   * @generated from field: string plain_label = 3;
   */
  plainLabel = "";

  /**
   * @generated from field: google.protobuf.Any data = 4;
   */
  data?: Any;

  /**
   * the order of item on the same level
   *
   * @generated from field: int32 order = 5;
   */
  order = 0;

  /**
   * @generated from field: carrel.common.tree.v1.TreeData data_type = 6;
   */
  dataType = TreeData.UNSPECIFIED;

  constructor(data?: PartialMessage<TreeNodeItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.tree.v1.TreeNodeItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "plain_label", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "data", kind: "message", T: Any },
    { no: 5, name: "order", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "data_type", kind: "enum", T: proto3.getEnumType(TreeData) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TreeNodeItem {
    return new TreeNodeItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TreeNodeItem {
    return new TreeNodeItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TreeNodeItem {
    return new TreeNodeItem().fromJsonString(jsonString, options);
  }

  static equals(a: TreeNodeItem | PlainMessage<TreeNodeItem> | undefined, b: TreeNodeItem | PlainMessage<TreeNodeItem> | undefined): boolean {
    return proto3.util.equals(TreeNodeItem, a, b);
  }
}

/**
 * @generated from message carrel.common.tree.v1.TreeNodeCollection
 */
export class TreeNodeCollection extends Message<TreeNodeCollection> {
  /**
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * @generated from field: string key = 2;
   */
  key = "";

  /**
   * @generated from field: string plain_label = 3;
   */
  plainLabel = "";

  /**
   * @generated from field: bool is_root = 4;
   */
  isRoot = false;

  /**
   * @generated from field: optional string parent_uuid = 5;
   */
  parentUuid?: string;

  /**
   * @generated from field: repeated carrel.common.tree.v1.TreeNodeItem sub_items = 6;
   */
  subItems: TreeNodeItem[] = [];

  /**
   * @generated from field: bool has_sub_items = 7;
   */
  hasSubItems = false;

  /**
   * @generated from field: int32 sub_items_count = 8;
   */
  subItemsCount = 0;

  /**
   * @generated from field: repeated carrel.common.tree.v1.TreeNodeCollection sub_collections = 9;
   */
  subCollections: TreeNodeCollection[] = [];

  /**
   * @generated from field: bool has_sub_collections = 10;
   */
  hasSubCollections = false;

  /**
   * @generated from field: int32 sub_collections_count = 11;
   */
  subCollectionsCount = 0;

  /**
   * @generated from field: int32 order = 12;
   */
  order = 0;

  /**
   * @generated from field: carrel.common.tree.v1.TreeData data_type = 13;
   */
  dataType = TreeData.UNSPECIFIED;

  constructor(data?: PartialMessage<TreeNodeCollection>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.tree.v1.TreeNodeCollection";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "plain_label", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "is_root", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "parent_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 6, name: "sub_items", kind: "message", T: TreeNodeItem, repeated: true },
    { no: 7, name: "has_sub_items", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 8, name: "sub_items_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 9, name: "sub_collections", kind: "message", T: TreeNodeCollection, repeated: true },
    { no: 10, name: "has_sub_collections", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 11, name: "sub_collections_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 12, name: "order", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 13, name: "data_type", kind: "enum", T: proto3.getEnumType(TreeData) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TreeNodeCollection {
    return new TreeNodeCollection().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TreeNodeCollection {
    return new TreeNodeCollection().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TreeNodeCollection {
    return new TreeNodeCollection().fromJsonString(jsonString, options);
  }

  static equals(a: TreeNodeCollection | PlainMessage<TreeNodeCollection> | undefined, b: TreeNodeCollection | PlainMessage<TreeNodeCollection> | undefined): boolean {
    return proto3.util.equals(TreeNodeCollection, a, b);
  }
}

/**
 * @generated from message carrel.common.tree.v1.Tree
 */
export class Tree extends Message<Tree> {
  /**
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * @generated from field: string key = 2;
   */
  key = "";

  /**
   * @generated from field: repeated carrel.common.tree.v1.TreeNodeCollection root_collections = 3;
   */
  rootCollections: TreeNodeCollection[] = [];

  constructor(data?: PartialMessage<Tree>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.tree.v1.Tree";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "root_collections", kind: "message", T: TreeNodeCollection, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Tree {
    return new Tree().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Tree {
    return new Tree().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Tree {
    return new Tree().fromJsonString(jsonString, options);
  }

  static equals(a: Tree | PlainMessage<Tree> | undefined, b: Tree | PlainMessage<Tree> | undefined): boolean {
    return proto3.util.equals(Tree, a, b);
  }
}
