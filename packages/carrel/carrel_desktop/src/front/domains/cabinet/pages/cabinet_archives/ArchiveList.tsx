import {PlainMessage} from "@bufbuild/protobuf/dist/types/message";
import {Archive} from "../../../../../backend/carrel_server_client/carrel/common/archive/v1/archive_v1_pb";
import "./ArchiveList.css";
import {useSelector} from "react-redux";
import {SelectItem} from "../../../../../ui/components/SelectList/components/SelectListItem/ISelectItem";
import {RootState} from "../../../../store/store";
import {Container} from "@chakra-ui/react";
import {ActionBar, Block, SelectList} from "../../../../../ui/components";
import {useMemo} from "react";
import {carrelQueries} from "../../../../../backend/server-api/carrel-queries";
import {FaFileImport, FaFolderOpen, FaPlus, FaSync} from "react-icons/fa";
import {carrelApi} from "../../../../../backend/server-api/carrel-api";
import {Logger, LogSource} from "../../../../../utils/logger";
import {pickPdfs} from "../../../../../backend/tauri/fs/pick-pdfs";
import {
    AddArchiveRequest
} from "../../../../../backend/carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";
import {pickDirectory} from "../../../../../backend/tauri/fs/pick-directory";
import {readDir} from "@tauri-apps/api/fs";

const LOG = new Logger(LogSource.ArchiveList);
export const ArchivesToTreenode = (archives: PlainMessage<Archive>[]): SelectItem<PlainMessage<Archive>> [] => {
    return archives.map((archive) => {
        return {
            key: archive.id.toString(),
            tooltip: archive.files?.length?.toString(),
            data: archive,
            option: archive.name,
            command: (key: string, data: PlainMessage<Archive>) => {
                console.log(key, data);
            }
        }
    }) ?? [];
}

export interface ArchiveListProps {
    onArchiveIdSelected: (archiveId: number | null) => void,
    projectDirectory?: string,
    selectedArchiveId: number | null,
}

export function ArchiveList(props: ArchiveListProps) {
    const workingProject = useSelector(
        (state: RootState) => state.workingProject.workingProject
    );

    const {data, isLoading, status, error, refetch} =
        carrelQueries.QueryListAllProjectArchives(
            (workingProject?.directory ?? props.projectDirectory) ?? null
        );

    const selectArchiveOptions = useMemo(() => ArchivesToTreenode(data ?? []), [data]);


    const archiveListActionBar = (
        <ActionBar
            items={[
                {
                    icon: <FaPlus/>,
                    tooltip: "Create archive",
                    command: async () => {
                        const result = await carrelApi.addArchive({
                                projectDirectory: workingProject?.directory ?? props.projectDirectory ?? "",
                                addArchiveDto: {
                                    name: "New archive",
                                    projectId: 1,
                                },
                                projectId: 1
                            } as AddArchiveRequest
                        )
                        console.log('result', result);


                    },
                },
                {
                    icon: <FaSync/>,
                    tooltip: "Sync all archives",
                    command: async () => {
                        if (workingProject?.directory) {
                            LOG.info(
                                "Syncing all archives",
                                "project directory",
                                workingProject.directory
                            );
                            const result = await carrelApi.syncProjectArchives({
                                projectDirectory: workingProject?.directory,
                            });
                            LOG.info("Syncing all archives result", "result", result);
                        } else {
                            LOG.error("Syncing all archives", "project directory is null");
                        }
                    },
                },

                {
                    icon: <FaFileImport/>,
                    tooltip: "Import files into the archive",
                    command: async () => {
                        const pickedFiles = await pickPdfs();
                        if (pickedFiles) {
                            LOG.info("Importing files", "files", pickedFiles);
                        }
                        const selectedArchive = selectArchiveOptions[0];

                        if (selectedArchive) {
                            console.log('adding to archive', selectedArchive);
                        }
                        addFilesToArchive(pickedFiles);
                    }
                },
                {
                    icon: <FaFolderOpen/>,
                    tooltip: "Import folder into the archive",
                    command: async () => {
                        const pickedFolder = await pickDirectory();
                        if (pickedFolder) {
                            LOG.info("Importing folder", "folder", pickedFolder);
                            const files = await readDir(pickedFolder);
                            console.log('files', files);
                            await addFilesToArchive(files.map(f => f.path).filter(f => f.endsWith('.pdf')));
                        }
                    }
                }
            ]}
        />
    );

    const addFilesToArchive = async (pickedFiles: string[]) => {
        const result = await carrelApi.addFilesToArchive({
            projectDirectory: workingProject?.directory ?? props.projectDirectory ?? "",
            archiveId: props.selectedArchiveId ?? 0,
            filePaths: pickedFiles
        })
        LOG.info("Importing files result", "result", result);
    }

    return (
        <Block
            topActionBar={archiveListActionBar}
            topActionBarJustify="center"
            headerPosition="start"
            title="Archives"
        >
            <Container maxW="full" maxH="full" w="full" h="full">
                <SelectList
                    showIndex
                    onSelectionChanged={(selectedItems) =>
                        props.onArchiveIdSelected(
                            selectedItems.length > 0
                                ? parseInt(selectedItems[0].data.id)
                                : null
                        )


                    }
                    size={"xs"}
                    listTitle={"Select archives"}
                    selectionMode="single"
                    showCheckbox={false}
                    items={selectArchiveOptions}
                />
            </Container>
        </Block>
    );

}
