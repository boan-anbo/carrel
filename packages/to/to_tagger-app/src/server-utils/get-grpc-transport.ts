import {createGrpcWebTransport} from "@bufbuild/connect-web";
import {DevelopmentServerAddr} from "./development-server-addr";

export const grpcWebTransport = createGrpcWebTransport({
    baseUrl: DevelopmentServerAddr,
});
