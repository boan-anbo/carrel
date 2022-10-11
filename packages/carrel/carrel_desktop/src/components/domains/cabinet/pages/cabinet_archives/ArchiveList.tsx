import "./ArchiveList.css"
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {
    carrelQueries,
} from "../../../../../server-api/carrel-queries";
import {Tree, TreeEventNodeParams, TreeSelectionKeys} from "primereact/tree";
import {useEffect, useState} from "react";
import TreeNode from "primereact/treenode";
import {Archive} from "../../../../../carrel_server_client/carrel/common/archive/v1/archive_v1_pb";
import {PlainMessage} from "@bufbuild/protobuf/dist/types/message";

export const ArchivesToTreenode = (archives: PlainMessage<Archive>[]): TreeNode [] => {
    return archives.map((archive) => {
        return {
            key: archive.id.toString(),
            label: archive.id.toString(),
            data: archive.name,
            icon: "pi pi-fw pi-file",
            children: []
        }
    }) ?? [];
}


export function ArchiveList(props: { onArchiveIdSelected: (archiveId: number | null) => void }) {

    const workingProject = useSelector((state: RootState) => state.workingProject.workingProject);

    const [selectedKeys, setSelectedKeys] = useState<TreeSelectionKeys>(null);

    useEffect(() => {

        refetch();
    }, [selectedKeys])


    async function onTreeSelect(e: TreeEventNodeParams) {
        await refetch();
        if (e.node.key) {
            setSelectedKeys(e.node.key.toString());

            let archiveId = parseInt(e.node.key.toString());

            // check if the archiveId is a number
            if (isNaN(archiveId)) {
                props.onArchiveIdSelected(null);
            } else {
                props.onArchiveIdSelected(archiveId);
            }
        }

    }


    const { data, isLoading, status, error, refetch} = carrelQueries.QueryListAllProjectArchives(workingProject?.directory ?? null);

    const treeNodes = ArchivesToTreenode(data ?? []);



    return <div>
        <Tree
            style={{width: '100%', height: '100%'}}
            contentStyle={
            // fontsize
            {fontSize: '1em'}
            }
            selectionKeys={selectedKeys}
            selectionMode={'single'}
            value={treeNodes}

            onSelect={onTreeSelect}
        />
    </div>;
}
