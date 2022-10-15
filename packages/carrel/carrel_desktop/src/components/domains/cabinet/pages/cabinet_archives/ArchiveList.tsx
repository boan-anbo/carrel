import {PlainMessage} from "@bufbuild/protobuf/dist/types/message";
import {Archive} from "../../../../../carrel_server_client/carrel/common/archive/v1/archive_v1_pb";
import "./ArchiveList.css";
import {useSelector} from "react-redux";
import {SelectItem} from "../../../../ui/components/SelectList/components/SelectListItem/ISelectItem";
import {RootState} from "../../../../../store/store";
import {Container} from "@chakra-ui/react";
import {ActionBar, Block, SelectList} from "../../../../ui/components";
import {useMemo} from "react";
import {carrelQueries} from "../../../../../server-api/carrel-queries";
import { FaFileImport, FaPlus, FaSync } from "react-icons/fa";
import { carrelApi } from "../../../../../server-api/carrel-api";
import { Logger, LogSource } from "../../../../../utils/logger";
import { pickPdfs } from "../../../../../fs/pick-pdfs";
import { AddArchiveRequest } from "../../../../../carrel_server_client/carrel/server/project_manager/v1/server_project_manager_v1_pb";

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
    projectDirectory?: string
}

export function ArchiveList(props: ArchiveListProps) {
    const workingProject = useSelector(
        (state: RootState) => state.workingProject.workingProject
    );

    const {data, isLoading, status, error, refetch} =
        carrelQueries.QueryListAllProjectArchives(
            (workingProject?.directory ?? props.projectDirectory) ?? null
        );

    const selectItems = useMemo(() => ArchivesToTreenode(data ?? []), [data]);


    const archiveListActionBar = (
      <ActionBar
        items={[
          {
            icon: <FaPlus />,
            tooltip: "Create archive",
            command: () => {
              carrelApi.addArchive({
                projectDirectory: workingProject?.directory ?? props.projectDirectory ?? "",
                addArchiveDto: {
                  name: "New archive",
                }
              } as AddArchiveRequest
              )
            },
          },
          {
            icon: <FaSync />,
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
            icon: <FaFileImport />,
            tooltip: "Import files into the archive",
            command: async () => {
              const pickedFiles = await pickPdfs();
              if (pickedFiles) {
                LOG.info("Importing files", "files", pickedFiles);
              }
            },
          },
        ]}
      />
    );

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
            items={selectItems}
          />
        </Container>
      </Block>
    );

}
