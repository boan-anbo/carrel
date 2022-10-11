import {pickDirectory} from "./pick-directory";
import {open} from "@tauri-apps/api/dialog";

export class CarrelDialogs {

    private sampleProjectDirectory = 'C:\\Script\\carrel\\packages\\carrel\\carrel_desktop\\test\\fixtures\\simple_project'

    openProjectDirectory = async (): Promise<string> => {
        return await open({
            title: "Open Project Directory",
            defaultPath: this.sampleProjectDirectory,
            directory: true,
            multiple: false,
        }) as string;
    }

    async selectPdfsToAddToArchive() {
        return await open({
            title: "Select PDFs to add to archive",
            defaultPath: this.sampleProjectDirectory,
            directory: false,
            multiple: true,
            filters: [
                {name: 'PDF', extensions: ['pdf']}
            ]
        }) as string[];

    }

    async selectPdfsFromFolderToAddToArchive(): Promise<string> {

        return await open({
            title: "Select folder with PDFs to add to archive",
            defaultPath: this.sampleProjectDirectory,
            directory: true,
            multiple: false,
        }) as string;
    }
}

export const carrelDialogs = new CarrelDialogs();
