// @generated by protoc-gen-connect-web v0.2.1 with parameter "target=ts"
// @generated from file carrel/stacks/services/v1/stacks_services_v1.proto (package carrel.stacks.services.v1, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {ScaffoldNewProjectRequest, ScaffoldNewProjectResponse} from "./stacks_services_v1_pb.js";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * @generated from service carrel.stacks.services.v1.ScaffoldNewProjectService
 */
export const ScaffoldNewProjectService = {
  typeName: "carrel.stacks.services.v1.ScaffoldNewProjectService",
  methods: {
    /**
     * @generated from rpc carrel.stacks.services.v1.ScaffoldNewProjectService.ScaffoldNewProject
     */
    scaffoldNewProject: {
      name: "ScaffoldNewProject",
      I: ScaffoldNewProjectRequest,
      O: ScaffoldNewProjectResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

