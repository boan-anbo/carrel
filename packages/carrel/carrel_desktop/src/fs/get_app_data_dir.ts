import {dataDir} from "@tauri-apps/api/path";

export const appDir = async () => await dataDir();
