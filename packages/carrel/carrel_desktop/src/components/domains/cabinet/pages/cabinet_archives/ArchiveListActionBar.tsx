import {PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Button, confirmDialog, ConfirmDialog, SplitButton, Toolbar} from "primereact";
import {Fragment, MouseEvent} from "react";
import {pickPdfs} from "../../../../../fs/pick-pdfs";
import {carrelApi} from "../../../../../server-api/carrel-api";
import {
    AddFilesToArchiveRequest, AddFilesToArchiveResponse
} from "../../../../../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {carrelDialogs} from "../../../../../fs/carrel_dialogs";
import {useMutation} from "@tanstack/react-query";
import {carrelQueries} from "../../../../../server-api/carrel-queries";
import {notify} from "../../../../../notify/notify";

export const ArchiveListActionBar = (props: {
    selectedArchiveId: number | null,
}) => {

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    const addFileSubmenu = [

        {
            label: 'Add folder',
            icon: 'pi-fw pi-folder',
            command: async () => {

                const selected_directory = await carrelDialogs.selectPdfsFromFolderToAddToArchive();

                console.log('selected_directory', selected_directory);

                if (selected_directory && props.selectedArchiveId && workingProject?.directory) {

                    const result = await carrelApi.addDirectoryToArchive
                    ({
                        archiveId: props.selectedArchiveId,
                        sourceDirectory: selected_directory,
                        projectDirectory: workingProject?.directory
                    });

                    console.log('result', result);
                }
            }
        }
    ];

    const leftContents = (
        <Fragment>
            <Button label="New" icon="pi pi-plus" className="mr-2"/>
            <SplitButton
                model={addFileSubmenu}

                disabled={!props.selectedArchiveId}
                onClick={onAddFilesToArchive}
                label="Add files" icon="pi pi-upload" className="b-black"
            />
            <i className="pi pi-bars p-toolbar-separator mr-2"/>
            <Button label="Save" icon="pi pi-check" className="p-button-warning"></Button>
            <Button label="Refresh" icon="pi pi-refresh" className="p-button-success ml-2" onClick={props.onRefresh}/>
        </Fragment>
    );

    const syncAllProjects = carrelQueries.MutateSyncAllProjectArchives(
        workingProject?.directory ?? null
    );

    if (syncAllProjects.isLoading) {
        return <div>Syncing...</div>;
    }

    if (syncAllProjects.isSuccess) {
        {
            return notify.success("Synced");
        }
    }

    // with a button to sync
    const rightContents = (
        <Fragment>
            <Button label="Sync" icon="pi pi-sync" className="p-button-success ml-2" onClick={
                async () => {
                    await syncAllProjects.mutate();

                }
            }/>
        </Fragment>
    );

    async function onAddFilesToArchive() {
        const workingProjectDirectory = workingProject?.directory;
        const selectedArchiveId = props.selectedArchiveId;

        if (workingProjectDirectory && selectedArchiveId) {

            const selectedPdfs = await carrelDialogs.selectPdfsToAddToArchive();

            confirmAddingFiles(selectedArchiveId.toString(), selectedPdfs, workingProjectDirectory, selectedArchiveId);

        }
    }


    const confirmAddingFiles = (archiveTitle: string, fileOrDirs: string[], workingProjectDirectory: string, selectedArchiveId: number) => {
        if (fileOrDirs.length === 0) {
            return;
        }

        const total = fileOrDirs.length;

        const totalText = total > 1 ? `\n\nand ${total} other files.` : '';

        const first_file = fileOrDirs[0];
        confirmDialog(
            {
                message: `Do you want to the following to archive "${archiveTitle}\n\n${first_file}${totalText}"?`,
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    const request: PartialMessage<AddFilesToArchiveRequest> = {
                        projectDirectory: workingProjectDirectory,
                        archiveId: selectedArchiveId,
                        filePaths: fileOrDirs,
                    };
                    await carrelApi.addFilesToArchive(
                        request
                    );
                },
                reject: () => {
                    return
                }
            }
            ,
        )
    }

    return (
        <div>
            <Toolbar left={leftContents} right={rightContents}/>
            <ConfirmDialog/>
        </div>
    )
}
