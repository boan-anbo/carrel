import {LocalStorage} from "./localstore";

// static methods
export class ServerProcesses {

    public static get dbPid(): number | null {
        return LocalStorage.Instance.get("dbPid");
    }

    public static set dbPid(value: number | null) {
        LocalStorage.Instance.set("dbPid", value);
    }

    public static get distantServerPid(): number | null {
        return LocalStorage.Instance.get("distantServerPid");
    }

    public static set distantServerPid(value: number | null) {
        LocalStorage.Instance.set("distantServerPid", value);
    }

    public static hasDistantServerPid(): boolean {
        return ServerProcesses.distantServerPid != null;
    }

    public static hasDbPid(): boolean {
        return ServerProcesses.dbPid != null;
    }


}
