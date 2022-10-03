import {createPromiseClient} from "@bufbuild/connect-web";
import {grpcWebTransport} from "./get-grpc-transport";
import {
    FirefliesService
} from "../carrel_server_client/carrel/server/firefly_keeper/v1/server_firefly_keeper_v1_connectweb";

export const fireflyKeeperApi = createPromiseClient(
    FirefliesService,
    grpcWebTransport
)
