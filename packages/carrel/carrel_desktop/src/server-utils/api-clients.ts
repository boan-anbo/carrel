import {createPromiseClient} from "@bufbuild/connect-web";
import {FirefliesService} from "../../../carrel_server_client/generated/carrel/server/firefly_keeper/v1/server_firefly_keeper_v1_connectweb";
import {grpcWebTransport} from "./get-grpc-transport";

export const fireflyKeeperApi = createPromiseClient(
    FirefliesService,
    grpcWebTransport
)
