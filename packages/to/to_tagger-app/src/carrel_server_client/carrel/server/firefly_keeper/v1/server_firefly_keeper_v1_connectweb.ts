// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=ts"
// @generated from file carrel/server/firefly_keeper/v1/server_firefly_keeper_v1.proto (package carrel.server.firefly_keeper.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {ScanFilesForFirefliesRequest, ScanFilesForFirefliesResponse, ScanFolderForFirefliesRequest, ScanFolderForFirefliesResponse} from "./server_firefly_keeper_v1_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * @generated from service carrel.server.firefly_keeper.v1.FirefliesService
 */
export const FirefliesService = {
  typeName: "carrel.server.firefly_keeper.v1.FirefliesService",
  methods: {
    /**
     * @generated from rpc carrel.server.firefly_keeper.v1.FirefliesService.ScanFolderForFireflies
     */
    scanFolderForFireflies: {
      name: "ScanFolderForFireflies",
      I: ScanFolderForFirefliesRequest,
      O: ScanFolderForFirefliesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc carrel.server.firefly_keeper.v1.FirefliesService.ScanFilesForFireflies
     */
    scanFilesForFireflies: {
      name: "ScanFilesForFireflies",
      I: ScanFilesForFirefliesRequest,
      O: ScanFilesForFirefliesResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
