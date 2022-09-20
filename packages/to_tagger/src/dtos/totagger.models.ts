/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {ToApiTag} from "./to.api.models";

export const protobufPackage = "totagger_models";

export interface ScanResult {
  file_path: string;
  file_name: string;
  /** To have package name `to_api_models` is crucial for imports, otherwise Protoc will complain */
  results: ToParserResult | undefined;
}

export interface ToParserResult {
  text_original: string;
  text_cleaned: string;
  tos: ToApiTag[];
}

function createBaseScanResult(): ScanResult {
  return { file_path: "", file_name: "", results: undefined };
}

export const ScanResult = {
  encode(message: ScanResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.file_path !== "") {
      writer.uint32(10).string(message.file_path);
    }
    if (message.file_name !== "") {
      writer.uint32(18).string(message.file_name);
    }
    if (message.results !== undefined) {
      ToParserResult.encode(message.results, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScanResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScanResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.file_path = reader.string();
          break;
        case 2:
          message.file_name = reader.string();
          break;
        case 3:
          message.results = ToParserResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ScanResult {
    return {
      file_path: isSet(object.file_path) ? String(object.file_path) : "",
      file_name: isSet(object.file_name) ? String(object.file_name) : "",
      results: isSet(object.results) ? ToParserResult.fromJSON(object.results) : undefined,
    };
  },

  toJSON(message: ScanResult): unknown {
    const obj: any = {};
    message.file_path !== undefined && (obj.file_path = message.file_path);
    message.file_name !== undefined && (obj.file_name = message.file_name);
    message.results !== undefined &&
      (obj.results = message.results ? ToParserResult.toJSON(message.results) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ScanResult>, I>>(object: I): ScanResult {
    const message = createBaseScanResult();
    message.file_path = object.file_path ?? "";
    message.file_name = object.file_name ?? "";
    message.results = (object.results !== undefined && object.results !== null)
      ? ToParserResult.fromPartial(object.results)
      : undefined;
    return message;
  },
};

function createBaseToParserResult(): ToParserResult {
  return { text_original: "", text_cleaned: "", tos: [] };
}

export const ToParserResult = {
  encode(message: ToParserResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text_original !== "") {
      writer.uint32(10).string(message.text_original);
    }
    if (message.text_cleaned !== "") {
      writer.uint32(18).string(message.text_cleaned);
    }
    for (const v of message.tos) {
      ToApiTag.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ToParserResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToParserResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text_original = reader.string();
          break;
        case 2:
          message.text_cleaned = reader.string();
          break;
        case 3:
          message.tos.push(ToApiTag.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToParserResult {
    return {
      text_original: isSet(object.text_original) ? String(object.text_original) : "",
      text_cleaned: isSet(object.text_cleaned) ? String(object.text_cleaned) : "",
      tos: Array.isArray(object?.tos) ? object.tos.map((e: any) => ToApiTag.fromJSON(e)) : [],
    };
  },

  toJSON(message: ToParserResult): unknown {
    const obj: any = {};
    message.text_original !== undefined && (obj.text_original = message.text_original);
    message.text_cleaned !== undefined && (obj.text_cleaned = message.text_cleaned);
    if (message.tos) {
      obj.tos = message.tos.map((e) => e ? ToApiTag.toJSON(e) : undefined);
    } else {
      obj.tos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToParserResult>, I>>(object: I): ToParserResult {
    const message = createBaseToParserResult();
    message.text_original = object.text_original ?? "";
    message.text_cleaned = object.text_cleaned ?? "";
    message.tos = object.tos?.map((e) => ToApiTag.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
