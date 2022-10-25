import {createPromiseClient} from "@bufbuild/connect-web";
import {grpcWebTransport} from "./get-grpc-transport";
import {
    FirefliesService
} from "../carrel_server_client/carrel/server/firefly_keeper/v1/server_firefly_keeper_v1_connectweb";
import {
    ProjectManagerService
} from "../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_connectweb";
import { FSManagerService } from "../carrel_server_client/carrel/server/fs_manager/v1/server_fs_manager_v1_connectweb";

export const fireflyKeeperApi = createPromiseClient(
    FirefliesService,
    grpcWebTransport
)

export const carrelApi = createPromiseClient(
    ProjectManagerService,
    grpcWebTransport
)

export const fsManagerApi = createPromiseClient(
    FSManagerService,
    grpcWebTransport
)