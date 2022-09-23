// package: carrel_scaffold.v1
// file: scaffold.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ScaffoldNewProjectRequest extends jspb.Message { 
    getProjectName(): string;
    setProjectName(value: string): ScaffoldNewProjectRequest;
    getProjectParentDir(): string;
    setProjectParentDir(value: string): ScaffoldNewProjectRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScaffoldNewProjectRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ScaffoldNewProjectRequest): ScaffoldNewProjectRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScaffoldNewProjectRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScaffoldNewProjectRequest;
    static deserializeBinaryFromReader(message: ScaffoldNewProjectRequest, reader: jspb.BinaryReader): ScaffoldNewProjectRequest;
}

export namespace ScaffoldNewProjectRequest {
    export type AsObject = {
        projectName: string,
        projectParentDir: string,
    }
}

export class ScaffoldNewProjectResponse extends jspb.Message { 
    getProjectDir(): string;
    setProjectDir(value: string): ScaffoldNewProjectResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScaffoldNewProjectResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ScaffoldNewProjectResponse): ScaffoldNewProjectResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScaffoldNewProjectResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScaffoldNewProjectResponse;
    static deserializeBinaryFromReader(message: ScaffoldNewProjectResponse, reader: jspb.BinaryReader): ScaffoldNewProjectResponse;
}

export namespace ScaffoldNewProjectResponse {
    export type AsObject = {
        projectDir: string,
    }
}
