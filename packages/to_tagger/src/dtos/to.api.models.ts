/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "to_api_models";

export interface ToApiScanRequest {
  text: string;
}

export interface ToApiTagScanResult {
  text_original: string;
  text_cleaned: string;
  tags: ToApiTag[];
}

export interface ToApiTag {
  key: string;
  value: string;
  note: string;
  tag_string: string;
}

function createBaseToApiScanRequest(): ToApiScanRequest {
  return { text: "" };
}

export const ToApiScanRequest = {
  encode(message: ToApiScanRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ToApiScanRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToApiScanRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToApiScanRequest {
    return { text: isSet(object.text) ? String(object.text) : "" };
  },

  toJSON(message: ToApiScanRequest): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToApiScanRequest>, I>>(object: I): ToApiScanRequest {
    const message = createBaseToApiScanRequest();
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseToApiTagScanResult(): ToApiTagScanResult {
  return { text_original: "", text_cleaned: "", tags: [] };
}

export const ToApiTagScanResult = {
  encode(message: ToApiTagScanResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text_original !== "") {
      writer.uint32(10).string(message.text_original);
    }
    if (message.text_cleaned !== "") {
      writer.uint32(18).string(message.text_cleaned);
    }
    for (const v of message.tags) {
      ToApiTag.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ToApiTagScanResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToApiTagScanResult();
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
          message.tags.push(ToApiTag.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToApiTagScanResult {
    return {
      text_original: isSet(object.text_original) ? String(object.text_original) : "",
      text_cleaned: isSet(object.text_cleaned) ? String(object.text_cleaned) : "",
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => ToApiTag.fromJSON(e)) : [],
    };
  },

  toJSON(message: ToApiTagScanResult): unknown {
    const obj: any = {};
    message.text_original !== undefined && (obj.text_original = message.text_original);
    message.text_cleaned !== undefined && (obj.text_cleaned = message.text_cleaned);
    if (message.tags) {
      obj.tags = message.tags.map((e) => e ? ToApiTag.toJSON(e) : undefined);
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToApiTagScanResult>, I>>(object: I): ToApiTagScanResult {
    const message = createBaseToApiTagScanResult();
    message.text_original = object.text_original ?? "";
    message.text_cleaned = object.text_cleaned ?? "";
    message.tags = object.tags?.map((e) => ToApiTag.fromPartial(e)) || [];
    return message;
  },
};

function createBaseToApiTag(): ToApiTag {
  return { key: "", value: "", note: "", tag_string: "" };
}

export const ToApiTag = {
  encode(message: ToApiTag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message.note !== "") {
      writer.uint32(26).string(message.note);
    }
    if (message.tag_string !== "") {
      writer.uint32(34).string(message.tag_string);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ToApiTag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToApiTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        case 3:
          message.note = reader.string();
          break;
        case 4:
          message.tag_string = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ToApiTag {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
      note: isSet(object.note) ? String(object.note) : "",
      tag_string: isSet(object.tag_string) ? String(object.tag_string) : "",
    };
  },

  toJSON(message: ToApiTag): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    message.note !== undefined && (obj.note = message.note);
    message.tag_string !== undefined && (obj.tag_string = message.tag_string);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ToApiTag>, I>>(object: I): ToApiTag {
    const message = createBaseToApiTag();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    message.note = object.note ?? "";
    message.tag_string = object.tag_string ?? "";
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
