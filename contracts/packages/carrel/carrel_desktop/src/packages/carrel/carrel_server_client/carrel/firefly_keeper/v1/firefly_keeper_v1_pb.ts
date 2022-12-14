// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/firefly_keeper/v1/firefly_keeper_v1.proto (package carrel.firefly_keeper.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {Tag} from "../../common/tag/v1/tag_v1_pb.js";

/**
 * @generated from enum carrel.firefly_keeper.v1.CATEGORY
 */
export enum CATEGORY {
  /**
   * @generated from enum value: CATEGORY_TYPE_UNSPECIFIED = 0;
   */
  CATEGORY_TYPE_UNSPECIFIED = 0,

  /**
   * notes
   *
   * @generated from enum value: CATEGORY_NOTE = 1;
   */
  CATEGORY_NOTE = 1,

  /**
   * todos
   *
   * @generated from enum value: CATEGORY_TODO = 2;
   */
  CATEGORY_TODO = 2,

  /**
   * ideas
   *
   * @generated from enum value: CATEGORY_IDEA = 3;
   */
  CATEGORY_IDEA = 3,

  /**
   * summaries
   *
   * @generated from enum value: CATEGORY_SUMMARY = 4;
   */
  CATEGORY_SUMMARY = 4,

  /**
   * points
   *
   * @generated from enum value: CATEGORY_POINT = 5;
   */
  CATEGORY_POINT = 5,

  /**
   * facts
   *
   * @generated from enum value: CATEGORY_FACT = 6;
   */
  CATEGORY_FACT = 6,

  /**
   * quotes
   *
   * @generated from enum value: CATEGORY_QUOTE = 7;
   */
  CATEGORY_QUOTE = 7,

  /**
   * questions
   *
   * @generated from enum value: CATEGORY_QUESTION = 8;
   */
  CATEGORY_QUESTION = 8,

  /**
   * keywords
   *
   * @generated from enum value: CATEGORY_KEYWORD = 9;
   */
  CATEGORY_KEYWORD = 9,

  /**
   * references
   *
   * @generated from enum value: CATEGORY_REFERENCE = 10;
   */
  CATEGORY_REFERENCE = 10,

  /**
   * others' points
   *
   * @generated from enum value: CATEGORY_OPOINT = 11;
   */
  CATEGORY_OPOINT = 11,

  /**
   * others' evidences
   *
   * @generated from enum value: CATEGORY_OEVIDENCE = 12;
   */
  CATEGORY_OEVIDENCE = 12,

  /**
   * data
   *
   * @generated from enum value: CATEGORY_DATA = 13;
   */
  CATEGORY_DATA = 13,
}
// Retrieve enum metadata with: proto3.getEnumType(CATEGORY)
proto3.util.setEnumType(CATEGORY, "carrel.firefly_keeper.v1.CATEGORY", [
  { no: 0, name: "CATEGORY_TYPE_UNSPECIFIED" },
  { no: 1, name: "CATEGORY_NOTE" },
  { no: 2, name: "CATEGORY_TODO" },
  { no: 3, name: "CATEGORY_IDEA" },
  { no: 4, name: "CATEGORY_SUMMARY" },
  { no: 5, name: "CATEGORY_POINT" },
  { no: 6, name: "CATEGORY_FACT" },
  { no: 7, name: "CATEGORY_QUOTE" },
  { no: 8, name: "CATEGORY_QUESTION" },
  { no: 9, name: "CATEGORY_KEYWORD" },
  { no: 10, name: "CATEGORY_REFERENCE" },
  { no: 11, name: "CATEGORY_OPOINT" },
  { no: 12, name: "CATEGORY_OEVIDENCE" },
  { no: 13, name: "CATEGORY_DATA" },
]);

/**
 * / Fireflies capture project-wide (i.e. within the project folder) tags and category them by important types.
 * / Those tags in these types are presumed to be important, even though they are not unlike any other tags.
 *
 * @generated from message carrel.firefly_keeper.v1.Fireflies
 */
export class Fireflies extends Message<Fireflies> {
  /**
   * all tags
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag all_tags = 1;
   */
  allTags: Tag[] = [];

  /**
   * all tags count
   *
   * @generated from field: int32 all_tags_count = 2;
   */
  allTagsCount = 0;

  /**
   * this is a special sense of note as in `annotation`, which is the essence of knowledge-making such as in commenting, summarizing, paraphrasing, expanding etc on a passage.
   * Marker: [[Note]] or [[N]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag notes = 3;
   */
  notes: Tag[] = [];

  /**
   * notes count
   *
   * @generated from field: int32 notes_count = 4;
   */
  notesCount = 0;

  /**
   * this is for tasks. E.g. "revise this part", "search for another keyword"
   * Marker: [[Todo]] or [[T]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag todos = 5;
   */
  todos: Tag[] = [];

  /**
   * todos count
   *
   * @generated from field: int32 todos_count = 6;
   */
  todosCount = 0;

  /**
   * this is for original ideas from the researcher
   * Marker: [[Idea]] or [[I]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag ideas = 7;
   */
  ideas: Tag[] = [];

  /**
   * ideas count
   *
   * @generated from field: int32 ideas_count = 8;
   */
  ideasCount = 0;

  /**
   * summary of key points or ideas from materials. [[Summary]]
   * Marker: [[Summary]] or [[S]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag summaries = 9;
   */
  summaries: Tag[] = [];

  /**
   * summaries count
   *
   * @generated from field: int32 summaries_count = 10;
   */
  summariesCount = 0;

  /**
   * points, similar to ideas, but usable for writing.
   * Marker: [[Point]] or [[P]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag points = 11;
   */
  points: Tag[] = [];

  /**
   * points count
   *
   * @generated from field: int32 points_count = 12;
   */
  pointsCount = 0;

  /**
   * facts, to mark important facts or data points.
   * Marker: [[Fact]] or [[F]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag facts = 13;
   */
  facts: Tag[] = [];

  /**
   * facts count
   *
   * @generated from field: int32 facts_count = 14;
   */
  factsCount = 0;

  /**
   * quotes, to mark important quotes to use.
   * Marker: [[Quote]] or [[Q]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag quotes = 15;
   */
  quotes: Tag[] = [];

  /**
   * quotes count
   *
   * @generated from field: int32 quotes_count = 16;
   */
  quotesCount = 0;

  /**
   * questions, to mark important questions to ask.
   * Marker: [[Question]] or [[?]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag questions = 17;
   */
  questions: Tag[] = [];

  /**
   * questions count
   *
   * @generated from field: int32 questions_count = 18;
   */
  questionsCount = 0;

  /**
   * keywords, to mark important keywords to use.
   * Marker: [[Keyword]] or [[K]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag keywords = 19;
   */
  keywords: Tag[] = [];

  /**
   * keywords count
   *
   * @generated from field: int32 keywords_count = 20;
   */
  keywordsCount = 0;

  /**
   * references, to mark important references to use.
   * Marker: [[Reference]] or [[R]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag references = 21;
   */
  references: Tag[] = [];

  /**
   * references count
   *
   * @generated from field: int32 references_count = 22;
   */
  referencesCount = 0;

  /**
   * others' points, point by another, usually from readings.
   * Marker: [[OPoint]] or [[OP]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag opoints = 23;
   */
  opoints: Tag[] = [];

  /**
   * opoints count
   *
   * @generated from field: int32 opoints_count = 24;
   */
  opointsCount = 0;

  /**
   * Others' evidences, examples by another, usually from readings.
   * Marker: [[OEvidence]] or [[OE]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag oevidences = 25;
   */
  oevidences: Tag[] = [];

  /**
   * oevidences count
   *
   * @generated from field: int32 oevidences_count = 26;
   */
  oevidencesCount = 0;

  /**
   * data, to mark important data to use.
   * Marker: [[Data]] or [[D]]
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag data = 27;
   */
  data: Tag[] = [];

  /**
   * data count
   *
   * @generated from field: int32 data_count = 28;
   */
  dataCount = 0;

  /**
   * the rest of the tags that are not categorized.
   *
   * @generated from field: repeated carrel.common.tag.v1.Tag unclassified = 29;
   */
  unclassified: Tag[] = [];

  /**
   * unclassified count
   *
   * @generated from field: int32 unclassified_count = 30;
   */
  unclassifiedCount = 0;

  /**
   * @generated from field: optional string directory = 31;
   */
  directory?: string;

  /**
   * @generated from field: uint32 files_count = 32;
   */
  filesCount = 0;

  /**
   * @generated from field: uint32 text_files_count = 33;
   */
  textFilesCount = 0;

  /**
   * @generated from field: repeated string files = 34;
   */
  files: string[] = [];

  constructor(data?: PartialMessage<Fireflies>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.firefly_keeper.v1.Fireflies";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "all_tags", kind: "message", T: Tag, repeated: true },
    { no: 2, name: "all_tags_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "notes", kind: "message", T: Tag, repeated: true },
    { no: 4, name: "notes_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "todos", kind: "message", T: Tag, repeated: true },
    { no: 6, name: "todos_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "ideas", kind: "message", T: Tag, repeated: true },
    { no: 8, name: "ideas_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 9, name: "summaries", kind: "message", T: Tag, repeated: true },
    { no: 10, name: "summaries_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 11, name: "points", kind: "message", T: Tag, repeated: true },
    { no: 12, name: "points_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 13, name: "facts", kind: "message", T: Tag, repeated: true },
    { no: 14, name: "facts_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 15, name: "quotes", kind: "message", T: Tag, repeated: true },
    { no: 16, name: "quotes_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 17, name: "questions", kind: "message", T: Tag, repeated: true },
    { no: 18, name: "questions_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 19, name: "keywords", kind: "message", T: Tag, repeated: true },
    { no: 20, name: "keywords_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 21, name: "references", kind: "message", T: Tag, repeated: true },
    { no: 22, name: "references_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 23, name: "opoints", kind: "message", T: Tag, repeated: true },
    { no: 24, name: "opoints_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 25, name: "oevidences", kind: "message", T: Tag, repeated: true },
    { no: 26, name: "oevidences_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 27, name: "data", kind: "message", T: Tag, repeated: true },
    { no: 28, name: "data_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 29, name: "unclassified", kind: "message", T: Tag, repeated: true },
    { no: 30, name: "unclassified_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 31, name: "directory", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 32, name: "files_count", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 33, name: "text_files_count", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 34, name: "files", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Fireflies {
    return new Fireflies().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Fireflies {
    return new Fireflies().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Fireflies {
    return new Fireflies().fromJsonString(jsonString, options);
  }

  static equals(a: Fireflies | PlainMessage<Fireflies> | undefined, b: Fireflies | PlainMessage<Fireflies> | undefined): boolean {
    return proto3.util.equals(Fireflies, a, b);
  }
}

