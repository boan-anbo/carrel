// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=ts"
// @generated from file carrel/stacks/services/v1/stacks_services_v1.proto (package carrel.stacks.services.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {SearchRequest, SearchResponse} from "./stacks_services_v1_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * @generated from service carrel.stacks.services.v1.StrackService
 */
export const StrackService = {
  typeName: "carrel.stacks.services.v1.StrackService",
  methods: {
    /**
     * @generated from rpc carrel.stacks.services.v1.StrackService.Search
     */
    search: {
      name: "Search",
      I: SearchRequest,
      O: SearchResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

