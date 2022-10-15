import { PartialMessage } from "@bufbuild/protobuf";
import { Button, Flex, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import {
    AddFilesToArchiveRequest
} from "../../../../../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import { carrelDialogs } from "../../../../../fs/carrel_dialogs";
import { notify } from "../../../../../notify/notify";
import { carrelApi } from "../../../../../server-api/carrel-api";
import { carrelQueries } from "../../../../../server-api/carrel-queries";
import { RootState } from "../../../../../store/store";
import { ActionBar } from "../../../../ui/components/ActionBar/ActionBar";

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
      <Flex>
        <Button className="mr-2">New</Button>
        <Menu>
          <MenuButton
            disabled={!props.selectedArchiveId}
            onClick={onAddFilesToArchive}
            className="b-black"
          >
            Add files
          </MenuButton>

          <MenuList>
            {addFileSubmenu.map((item, index) => {
              return (
                <li key={index}>
                  <Button onClick={item.command}>{item.label}</Button>
                </li>
              );
            })}
          </MenuList>
        </Menu>
        <i className="pi pi-bars p-toolbar-separator mr-2" />
       
        <Button
          className="p-button-success ml-2"
        >Refresh</Button>
      </Flex>
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
      <Flex>
        <Button
          className="p-button-success ml-2"
          onClick={async () => {
            await syncAllProjects.mutate();
          }}
        >
          Sync
        </Button>
      </Flex>
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
        // confirmDialog(
        //     {
        //         message: `Do you want to the following to archive "${archiveTitle}\n\n${first_file}${totalText}"?`,
        //         header: 'Confirm',
        //         icon: 'pi pi-exclamation-triangle',
        //         accept: async () => {
        //             const request: PartialMessage<AddFilesToArchiveRequest> = {
        //                 projectDirectory: workingProjectDirectory,
        //                 archiveId: selectedArchiveId,
        //                 filePaths: fileOrDirs,
        //             };
        //             await carrelApi.addFilesToArchive(
        //                 request
        //             );
        //         },
        //         reject: () => {
        //             return
        //         }
        //     }
        //     ,
        // )
    }

    return (
        <div>
            <ActionBar left={leftContents} right={rightContents}/>
        </div>
    )
}
