// package: carrel_scaffold.v1
// file: scaffold.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as scaffold_pb from "./scaffold_pb";

interface IScaffoldNewProjectServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    scaffoldNewProject: IScaffoldNewProjectServiceService_IScaffoldNewProject;
}

interface IScaffoldNewProjectServiceService_IScaffoldNewProject extends grpc.MethodDefinition<scaffold_pb.ScaffoldNewProjectRequest, scaffold_pb.ScaffoldNewProjectResponse> {
    path: "/carrel_scaffold.v1.ScaffoldNewProjectService/ScaffoldNewProject";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scaffold_pb.ScaffoldNewProjectRequest>;
    requestDeserialize: grpc.deserialize<scaffold_pb.ScaffoldNewProjectRequest>;
    responseSerialize: grpc.serialize<scaffold_pb.ScaffoldNewProjectResponse>;
    responseDeserialize: grpc.deserialize<scaffold_pb.ScaffoldNewProjectResponse>;
}

export const ScaffoldNewProjectServiceService: IScaffoldNewProjectServiceService;

export interface IScaffoldNewProjectServiceServer {
    scaffoldNewProject: grpc.handleUnaryCall<scaffold_pb.ScaffoldNewProjectRequest, scaffold_pb.ScaffoldNewProjectResponse>;
}

export interface IScaffoldNewProjectServiceClient {
    scaffoldNewProject(request: scaffold_pb.ScaffoldNewProjectRequest, callback: (error: grpc.ServiceError | null, response: scaffold_pb.ScaffoldNewProjectResponse) => void): grpc.ClientUnaryCall;
    scaffoldNewProject(request: scaffold_pb.ScaffoldNewProjectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scaffold_pb.ScaffoldNewProjectResponse) => void): grpc.ClientUnaryCall;
    scaffoldNewProject(request: scaffold_pb.ScaffoldNewProjectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scaffold_pb.ScaffoldNewProjectResponse) => void): grpc.ClientUnaryCall;
}

export class ScaffoldNewProjectServiceClient extends grpc.Client implements IScaffoldNewProjectServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public scaffoldNewProject(request: scaffold_pb.ScaffoldNewProjectRequest, callback: (error: grpc.ServiceError | null, response: scaffold_pb.ScaffoldNewProjectResponse) => void): grpc.ClientUnaryCall;
    public scaffoldNewProject(request: scaffold_pb.ScaffoldNewProjectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scaffold_pb.ScaffoldNewProjectResponse) => void): grpc.ClientUnaryCall;
    public scaffoldNewProject(request: scaffold_pb.ScaffoldNewProjectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scaffold_pb.ScaffoldNewProjectResponse) => void): grpc.ClientUnaryCall;
}
