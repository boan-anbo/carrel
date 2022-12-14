// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/document/v1/document.proto (package carrel.common.document.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

/// The source is an abstract reference that could contain document info and other metadata that can have multiple.
///Can be used as source.
/// Can be used as a reference
/// Can be used a digital object.

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Person} from "../../person/v1/person_v1_pb.js";
import {File} from "../../file/v1/file_v1_pb.js";
import {Importance} from "../../importance/v1/importance_v1_pb.js";
import {Task} from "../../task/v1/task_v1_pb.js";

/**
 * / An abstract document.
 *
 * @generated from message carrel.common.document.v1.Document
 */
export class Document extends Message<Document> {
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
   * / citation information
   *
   * @generated from field: string citation = 4;
   */
  citation = "";

  /**
   * / publication date
   *
   * @generated from field: string publication_date = 5;
   */
  publicationDate = "";

  /**
   * / creators
   *
   * @generated from field: repeated carrel.common.person.v1.Person creators = 6;
   */
  creators: Person[] = [];

  /**
   * / In the case of a Zotero Item, this is the Zotero URI.
   *
   * @generated from field: string source_id = 7;
   */
  sourceId = "";

  /**
   * / Describes what the unique Id refers to.
   *
   * @generated from field: string source_id_type = 8;
   */
  sourceIdType = "";

  /**
   * / source url, e.g. a direct link to the source, e.g. the DOI of a book or journal
   *
   * @generated from field: string source_url = 9;
   */
  sourceUrl = "";

  /**
   * / archive location
   *
   * @generated from field: string archive_location = 10;
   */
  archiveLocation = "";

  /**
   * / file
   *
   * @generated from field: repeated carrel.common.file.v1.File files = 11;
   */
  files: File[] = [];

  /**
   * pages protobuf number type
   *
   * @generated from field: string pages = 12;
   */
  pages = "";

  /**
   * / modified date in UTC
   *
   * @generated from field: string modified = 13;
   */
  modified = "";

  /**
   * / created date in UTC
   *
   * @generated from field: string created = 14;
   */
  created = "";

  /**
   * / content type
   *
   * @generated from field: string content = 15;
   */
  content = "";

  /**
   * @generated from field: carrel.common.importance.v1.Importance importance = 16;
   */
  importance = Importance.NONE_UNSPECIFIED;

  /**
   * @generated from field: repeated carrel.common.task.v1.Task tasks = 17;
   */
  tasks: Task[] = [];

  constructor(data?: PartialMessage<Document>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.document.v1.Document";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "citation", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "publication_date", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "creators", kind: "message", T: Person, repeated: true },
    { no: 7, name: "source_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "source_id_type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "source_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "archive_location", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "files", kind: "message", T: File, repeated: true },
    { no: 12, name: "pages", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 13, name: "modified", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 14, name: "created", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 15, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 16, name: "importance", kind: "enum", T: proto3.getEnumType(Importance) },
    { no: 17, name: "tasks", kind: "message", T: Task, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Document {
    return new Document().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Document {
    return new Document().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Document {
    return new Document().fromJsonString(jsonString, options);
  }

  static equals(a: Document | PlainMessage<Document> | undefined, b: Document | PlainMessage<Document> | undefined): boolean {
    return proto3.util.equals(Document, a, b);
  }
}

