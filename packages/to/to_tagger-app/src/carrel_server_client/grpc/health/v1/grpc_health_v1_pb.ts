// @generated by protoc-gen-es v0.1.1 with parameter "target=ts"
// @generated from file grpc/health/v1/grpc_health_v1.proto (package grpc.health.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message grpc.health.v1.HealthCheckRequest
 */
export class HealthCheckRequest extends Message<HealthCheckRequest> {
  /**
   * @generated from field: string service = 1;
   */
  service = "";

  constructor(data?: PartialMessage<HealthCheckRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "grpc.health.v1.HealthCheckRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "service", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HealthCheckRequest {
    return new HealthCheckRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HealthCheckRequest {
    return new HealthCheckRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HealthCheckRequest {
    return new HealthCheckRequest().fromJsonString(jsonString, options);
  }

  static equals(a: HealthCheckRequest | PlainMessage<HealthCheckRequest> | undefined, b: HealthCheckRequest | PlainMessage<HealthCheckRequest> | undefined): boolean {
    return proto3.util.equals(HealthCheckRequest, a, b);
  }
}

/**
 * @generated from message grpc.health.v1.HealthCheckResponse
 */
export class HealthCheckResponse extends Message<HealthCheckResponse> {
  /**
   * @generated from field: grpc.health.v1.HealthCheckResponse.ServingStatus status = 1;
   */
  status = HealthCheckResponse_ServingStatus.UNKNOWN_UNSPECIFIED;

  constructor(data?: PartialMessage<HealthCheckResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "grpc.health.v1.HealthCheckResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "status", kind: "enum", T: proto3.getEnumType(HealthCheckResponse_ServingStatus) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HealthCheckResponse {
    return new HealthCheckResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HealthCheckResponse {
    return new HealthCheckResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HealthCheckResponse {
    return new HealthCheckResponse().fromJsonString(jsonString, options);
  }

  static equals(a: HealthCheckResponse | PlainMessage<HealthCheckResponse> | undefined, b: HealthCheckResponse | PlainMessage<HealthCheckResponse> | undefined): boolean {
    return proto3.util.equals(HealthCheckResponse, a, b);
  }
}

/**
 * @generated from enum grpc.health.v1.HealthCheckResponse.ServingStatus
 */
export enum HealthCheckResponse_ServingStatus {
  /**
   * @generated from enum value: SERVING_STATUS_UNKNOWN_UNSPECIFIED = 0;
   */
  UNKNOWN_UNSPECIFIED = 0,

  /**
   * @generated from enum value: SERVING_STATUS_SERVING = 1;
   */
  SERVING = 1,

  /**
   * @generated from enum value: SERVING_STATUS_NOT_SERVING = 2;
   */
  NOT_SERVING = 2,

  /**
   * Used only by the Watch method.
   *
   * @generated from enum value: SERVING_STATUS_SERVICE_UNKNOWN = 3;
   */
  SERVICE_UNKNOWN = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(HealthCheckResponse_ServingStatus)
proto3.util.setEnumType(HealthCheckResponse_ServingStatus, "grpc.health.v1.HealthCheckResponse.ServingStatus", [
  { no: 0, name: "SERVING_STATUS_UNKNOWN_UNSPECIFIED" },
  { no: 1, name: "SERVING_STATUS_SERVING" },
  { no: 2, name: "SERVING_STATUS_NOT_SERVING" },
  { no: 3, name: "SERVING_STATUS_SERVICE_UNKNOWN" },
]);
