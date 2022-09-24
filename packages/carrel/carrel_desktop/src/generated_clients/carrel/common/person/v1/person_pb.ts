// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file carrel/common/person/v1/person.proto (package carrel.common.person.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * / a unique id in the original place
 * / In the case of a web page, this is the url.
 * / In the case of a book, this is the isbn.
 * / In the case of a journal, this is the issn.
 *
 * @generated from message carrel.common.person.v1.Person
 */
export class Person extends Message<Person> {
  /**
   * @generated from field: string uuid = 1;
   */
  uuid = "";

  /**
   * / first name
   *
   * @generated from field: string first_name = 2;
   */
  firstName = "";

  /**
   * / last name
   *
   * @generated from field: string last_name = 3;
   */
  lastName = "";

  /**
   * / description
   *
   * @generated from field: string description = 4;
   */
  description = "";

  constructor(data?: PartialMessage<Person>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "carrel.common.person.v1.Person";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "first_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "last_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Person {
    return new Person().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Person {
    return new Person().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Person {
    return new Person().fromJsonString(jsonString, options);
  }

  static equals(a: Person | PlainMessage<Person> | undefined, b: Person | PlainMessage<Person> | undefined): boolean {
    return proto3.util.equals(Person, a, b);
  }
}

