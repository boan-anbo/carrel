import {createGrpcWebTransport} from "@bufbuild/connect-web";

export const grpcWebTransport = createGrpcWebTransport({
    baseUrl: "http://127.0.0.1:8081",
});
