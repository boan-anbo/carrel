// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file generic/api/error/v1/error.proto (package generic.api.response.error.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * The greeting service definition.
 * The request message containing the user's name.
 *
 * @generated from message generic.api.response.error.v1.ErrorResponse
 */
export class ErrorResponse extends Message<ErrorResponse> {
  /**
   * / code
   *
   * @generated from field: string code = 1;
   */
  code = "";

  /**
   * / message
   *
   * / suggestion
   *
   * @generated from field: string message = 2;
   */
  message = "";

  /**
   * @generated from field: string suggestion = 3;
   */
  suggestion = "";

  /**
   * / user payload
   *
   * @generated from field: string user_payload = 4;
   */
  userPayload = "";

  /**
   * / payload for user
   *
   * @generated from field: string payload_for_user = 5;
   */
  payloadForUser = "";

  constructor(data?: PartialMessage<ErrorResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "generic.api.response.error.v1.ErrorResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "suggestion", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "user_payload", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "payload_for_user", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ErrorResponse {
    return new ErrorResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ErrorResponse {
    return new ErrorResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ErrorResponse {
    return new ErrorResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ErrorResponse | PlainMessage<ErrorResponse> | undefined, b: ErrorResponse | PlainMessage<ErrorResponse> | undefined): boolean {
    return proto3.util.equals(ErrorResponse, a, b);
  }
}

