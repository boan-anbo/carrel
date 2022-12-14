import {Child, Command} from "@tauri-apps/api/shell";
import {Logger, LogSource} from "../../../Services/logger";
import assert from "assert";

export interface SideCarProcess {
    port?: string;
    process: Child;
}

const log = new Logger(LogSource.InteractServer);
export const launchInteractServer = async (): Promise<SideCarProcess | null> => {
    log.info('Launching server');

    const port = "3000";

    // Fixme: right now the port doesn't work. The Distant rust server accepts parameters in console alright, but not in here. It's now defaulting to 3000.
    const cmd = await Command.sidecar('bin/db/interact-db', port, {
        cwd: `C:\\Script\\carrel\\packages\\interact\\src-tauri\\target\\debug`
    })


    cmd.on('error', (error) => {
        log.error(error, 'Error while launching interact server', error)
    });
    cmd.on('close', (code) => {
        log.info(`Interact server closed}`, 'interact server close code', code)
    });

    cmd.stdout.on('data', (data) => {
        log.info('InteractServerOutput', 'Output data', data)
    });

    cmd.stderr.on('data', (data) => {
        log.error('InteractServerErrorOutput', 'Error data', data)
    });
    const child = await cmd.spawn();
    // notify("DistantServerCardIndex started", "success");
    log.success("InteractServerCardIndex started", "port", port);
    return child.pid ? {
        port: port
        ,
        process: child
    } : null;
}
