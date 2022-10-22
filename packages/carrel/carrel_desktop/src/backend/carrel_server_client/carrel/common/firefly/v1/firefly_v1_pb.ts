// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/firefly/v1/firefly_v1.proto (package carrel.common.firefly.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

// context
// A key unit of extracted useful information from a document.
// Compared to Passage, a card is annotated with a selection of key text, and even comments and importance.

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Snippet} from "../../snippet/v1/snippet_v1_pb";
import {Passage} from "../../passage/v1/passage_v1_pb";
import {Comment} from "../../comment/v1/comment_v1_pb";
import {Person} from "../../person/v1/person_v1_pb";
import {Document} from "../../document/v1/document_pb";
import {StorageInfo} from "../../storage_info/v1/storage_info_v1_pb";
import {Tag} from "../../tag/v1/tag_v1_pb";
import {Importance} from "../../importance/v1/importance_v1_pb";

/**
 * @generated from message carrel.common.firefly.v1.Firefly
 */
export class Firefly extends Message<Firefly> {
  /**
   * / Uuid of the source.
   *
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * @generated from field: string title = 2;
   */
  title = "";

  /**
   * / description
   *
   * @generated from field: string description = 3;
   */
  description = "";

  /**
   * / main content of the card, usually the key information the card contains, e.g. highlighted text.
   *
   * @generated from field: carrel.common.snippet.v1.Snippet snippet = 4;
   */
  snippet?: Snippet;

  /**
   * / the full text context of the firefly, usually needed to make sense of the context, e.g. full text.
   *
   * @generated from field: carrel.common.passage.v1.Passage passage = 6;
   */
  passage?: Passage;

  /**
   * comments
   *
   * @generated from field: repeated carrel.common.comment.v1.Comment comments = 7;
   */
  comments: Comment[] = [];

  /**
   * creators of the card
   *
   * @generated from field: repeated carrel.common.person.v1.Person creators = 8;
   */
  creators: Person[] = [];

  /**
   * / the document this card is extracted from, only used when there is no full-text, i.e. Passage because passage already have document. Duplication is also welcomed.
   *
   * @generated from field: optional carrel.common.document.v1.Document document = 9;
   */
  document?: Document;

  /**
   * / the location of the card in Textual Object storage
   *
   * @generated from field: carrel.common.storage_info.v1.StorageInfo storage_info = 10;
   */
  storageInfo?: StorageInfo;

  /**
   * the tag used to select this fly
   *
   * @generated from field: carrel.common.tag.v1.Tag select_tag = 11;
   */
  selectTag?: Tag;

  /**
   * / tags
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag tags = 12;
   */
  tags: Tag[] = [];

  /**
   * / importance
   *
   * @generated from field: carrel.common.importance.v1.Importance importance = 13;
   */
  importance = Importance.NONE_UNSPECIFIED;

  /**
   * / extra field for any information that is not covered by the above fields
   *
   * @generated from field: repeated string extra = 14;
   */
  extra: string[] = [];

  /**
   * created time
   *
   * @generated from field: string created_at = 15;
   */
  createdAt = "";

  /**
   * updated time
   *
   * @generated from field: string modified_at = 16;
   */
  modifiedAt = "";

  constructor(data?: PartialMessage<Firefly>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.firefly.v1.Firefly";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "snippet", kind: "message", T: Snippet },
    { no: 6, name: "passage", kind: "message", T: Passage },
    { no: 7, name: "comments", kind: "message", T: Comment, repeated: true },
    { no: 8, name: "creators", kind: "message", T: Person, repeated: true },
    { no: 9, name: "document", kind: "message", T: Document, opt: true },
    { no: 10, name: "storage_info", kind: "message", T: StorageInfo },
    { no: 11, name: "select_tag", kind: "message", T: Tag },
    { no: 12, name: "tags", kind: "message", T: Tag, repeated: true },
    { no: 13, name: "importance", kind: "enum", T: proto3.getEnumType(Importance) },
    { no: 14, name: "extra", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 15, name: "created_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 16, name: "modified_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Firefly {
    return new Firefly().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Firefly {
    return new Firefly().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Firefly {
    return new Firefly().fromJsonString(jsonString, options);
  }

  static equals(a: Firefly | PlainMessage<Firefly> | undefined, b: Firefly | PlainMessage<Firefly> | undefined): boolean {
    return proto3.util.equals(Firefly, a, b);
  }
}
