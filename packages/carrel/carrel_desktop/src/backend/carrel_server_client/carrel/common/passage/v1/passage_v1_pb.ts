// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/passage/v1/passage_v1.proto (package carrel.common.passage.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Document} from "../../document/v1/document_pb";

/**
 * @generated from message carrel.common.passage.v1.Passage
 */
export class Passage extends Message<Passage> {
  /**
   * id
   *
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * passage text
   *
   * @generated from field: string text = 2;
   */
  text = "";

  /**
   * passage description
   *
   * @generated from field: string description = 3;
   */
  description = "";

  /**
   * e.g. "book1/chapter1" or page number
   *
   * @generated from field: string location = 4;
   */
  location = "";

  /**
   * passage document
   *
   * @generated from field: carrel.common.document.v1.Document document = 5;
   */
  document?: Document;

  /**
   * localtion type, describes what the location is, e.g. page number
   *
   * @generated from field: string location_type = 6;
   */
  locationType = "";

  constructor(data?: PartialMessage<Passage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.passage.v1.Passage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "location", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "document", kind: "message", T: Document },
    { no: 6, name: "location_type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Passage {
    return new Passage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Passage {
    return new Passage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Passage {
    return new Passage().fromJsonString(jsonString, options);
  }

  static equals(a: Passage | PlainMessage<Passage> | undefined, b: Passage | PlainMessage<Passage> | undefined): boolean {
    return proto3.util.equals(Passage, a, b);
  }
}

/**
 * @generated from message carrel.common.passage.v1.DocumentPassages
 */
export class DocumentPassages extends Message<DocumentPassages> {
  /**
   * @generated from field: carrel.common.document.v1.Document document = 2;
   */
  document?: Document;

  /**
   * @generated from field: repeated carrel.common.passage.v1.Passage passages = 3;
   */
  passages: Passage[] = [];

  constructor(data?: PartialMessage<DocumentPassages>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.passage.v1.DocumentPassages";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "document", kind: "message", T: Document },
    { no: 3, name: "passages", kind: "message", T: Passage, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DocumentPassages {
    return new DocumentPassages().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DocumentPassages {
    return new DocumentPassages().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DocumentPassages {
    return new DocumentPassages().fromJsonString(jsonString, options);
  }

  static equals(a: DocumentPassages | PlainMessage<DocumentPassages> | undefined, b: DocumentPassages | PlainMessage<DocumentPassages> | undefined): boolean {
    return proto3.util.equals(DocumentPassages, a, b);
  }
}
