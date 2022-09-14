import {Child, Command} from "@tauri-apps/api/shell";
import assert from "assert";
import {Logger, LogSource} from "../../Services/logger";
import {ServerProcesses} from "../localstorage/serverProcess";

export interface SideCarProcess {
    port?: string;
    process: Child;
}

const log = new Logger(LogSource.DistantServer);

export enum SideCarServer {
    Distant_Server = "Distant_Server",
    Interact_Server = "Interact_Server",
}


export const launchSideCard = async (server: SideCarServer): Promise<SideCarProcess | null> => {

    // checking if there are previous processes running, if so kill them
    switch (server) {
        case SideCarServer.Distant_Server:
            if (ServerProcesses.distantServerPid) {

            }
    }
    log.info(`Launching ${server.toString()}`);

    let port: number = 0;

    let cmdName = '';

    let cmd = undefined;

    switch (server) {
        case SideCarServer.Distant_Server:
            port = 13013;
            cmdName = 'distant-server';
            cmd = Command.sidecar('bin/distant/distant', port.toString())
            break;
        case SideCarServer.Interact_Server:
            port = 13014;
            cmdName = 'interact-server';
            cmd = Command.sidecar('bin/db/interact-db', port.toString())
            break;
    }

    if (!cmd) {
        throw new Error(`Unknown sidecar server: ${server.toString()}`);
    }

    cmd.on('error', (error) => {
        log.error(error, `Error while launching ${server}`, error);
    });
    cmd.on('close', (code) => {
        log.info(`${server} server closed}`, `${server} close code`, code)
    });

    cmd.stdout.on('data', (data) => {
        log.info('DistantServerOutput', 'Output data', data)
    });

    cmd.stderr.on('data', (data) => {
        log.error('DistantServerErrorOutput', 'Error data', data)
    });
    const child = await cmd.spawn();

    // store child pid in local storage
    switch (server) {
        case SideCarServer.Distant_Server:
            ServerProcesses.distantServerPid = child.pid;
            break;
        case SideCarServer.Interact_Server:
            ServerProcesses.dbPid = child.pid;
            break;
    }

    // notify("DistantServerCardIndex started", "success");
    log.success("DistantServerCardIndex started", "port", port);
    return {port: port.toString(), process: child};
}
