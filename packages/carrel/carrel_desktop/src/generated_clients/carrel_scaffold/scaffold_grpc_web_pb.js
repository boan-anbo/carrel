/**
 * @fileoverview gRPC-Web generated client stub for carrel_scaffold.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.carrel_scaffold = {};
proto.carrel_scaffold.v1 = require('./scaffold_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.carrel_scaffold.v1.ScaffoldNewProjectServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.carrel_scaffold.v1.ScaffoldNewProjectServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.carrel_scaffold.v1.ScaffoldNewProjectRequest,
 *   !proto.carrel_scaffold.v1.ScaffoldNewProjectResponse>}
 */
const methodDescriptor_ScaffoldNewProjectService_ScaffoldNewProject = new grpc.web.MethodDescriptor(
  '/carrel_scaffold.v1.ScaffoldNewProjectService/ScaffoldNewProject',
  grpc.web.MethodType.UNARY,
  proto.carrel_scaffold.v1.ScaffoldNewProjectRequest,
  proto.carrel_scaffold.v1.ScaffoldNewProjectResponse,
  /**
   * @param {!proto.carrel_scaffold.v1.ScaffoldNewProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.carrel_scaffold.v1.ScaffoldNewProjectResponse.deserializeBinary
);


/**
 * @param {!proto.carrel_scaffold.v1.ScaffoldNewProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.carrel_scaffold.v1.ScaffoldNewProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.carrel_scaffold.v1.ScaffoldNewProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.carrel_scaffold.v1.ScaffoldNewProjectServiceClient.prototype.scaffoldNewProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/carrel_scaffold.v1.ScaffoldNewProjectService/ScaffoldNewProject',
      request,
      metadata || {},
      methodDescriptor_ScaffoldNewProjectService_ScaffoldNewProject,
      callback);
};


/**
 * @param {!proto.carrel_scaffold.v1.ScaffoldNewProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.carrel_scaffold.v1.ScaffoldNewProjectResponse>}
 *     Promise that resolves to the response
 */
proto.carrel_scaffold.v1.ScaffoldNewProjectServicePromiseClient.prototype.scaffoldNewProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/carrel_scaffold.v1.ScaffoldNewProjectService/ScaffoldNewProject',
      request,
      metadata || {},
      methodDescriptor_ScaffoldNewProjectService_ScaffoldNewProject);
};


module.exports = proto.carrel_scaffold.v1;

