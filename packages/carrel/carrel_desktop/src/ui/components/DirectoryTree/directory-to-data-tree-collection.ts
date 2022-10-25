import { ReactNode } from "react";
import { Directory } from "../../../backend/carrel_server_client/carrel/common/directory/v1/directory_v1_pb";
import { File } from "../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb";
import { DataTreeCollection, EDataTreeNodeType, IDataTreeItem, IDataTreeNode } from "../DataTree/i-data-tree-node";


export interface GetDataTreeFromDirectoryOption {
    getItemIcon: (node: IDataTreeNode<File> | IDataTreeNode<Directory>, itemType: EDataTreeNodeType, iconType: DirectoryItemIconType) => ReactNode
    fileMasks?: RegExp[]
}

export enum DirectoryItemIconType {
    OPEN,
    CLOSED
}

/**
 * @param directory
 * @param conversionOpt: optional, if provided, the icon can be used for particular nodes
 */
export const getDataTreeFromDirectory = (directory: Directory, conversionOpt: GetDataTreeFromDirectoryOption): DataTreeCollection<File> => {
    const collection = new DataTreeCollection<File>();

    collection.label = directory.name;
    collection.type = EDataTreeNodeType.COLLECTION;

    // iterate over the files
    directory.files.forEach((file) => {
        const fileItem = fileToDataTreeItem(file, conversionOpt);
        // filter makss
        if (conversionOpt?.fileMasks && conversionOpt.fileMasks.length > 0) {
            // check if the file matches the mask
            const matches = conversionOpt.fileMasks.some((mask) => mask.test(file.fileName));
            if (matches) {
                collection.subItems.push(fileItem);
            }
        } else {
            collection.subItems.push(fileItem);
        }
        return collection;
    });

    // iterate over the directories
    directory.subDirs.forEach((directory) => {
        const directoryItem = getDataTreeFromDirectory(directory, conversionOpt);
        // filter with file masks
        if (conversionOpt?.fileMasks && conversionOpt.fileMasks.length > 0) {
            if (directoryItem.subItems.length > 0) {
                collection.subItems.push(directoryItem);
            }
        } else {
            collection.subItems.push(directoryItem);
        }
    });

    collection.collectionIconOpen = conversionOpt?.getItemIcon(collection, collection.type, DirectoryItemIconType.OPEN);
    collection.collectionIconClosed = conversionOpt?.getItemIcon(collection, collection.type, DirectoryItemIconType.CLOSED);

    return collection;
}

const fileToDataTreeItem = (file: File, itemIconMap?: GetDataTreeFromDirectoryOption): IDataTreeItem<File> => {

    const result = {
        key: file.uuid,
        label: file.fileName,
        data: file,
        type: EDataTreeNodeType.ITEM
    } as IDataTreeItem<File>;

    result.iconActive = itemIconMap?.getItemIcon(result, result.type, DirectoryItemIconType.OPEN);
    result.iconInactive = itemIconMap?.getItemIcon(result, result.type, DirectoryItemIconType.CLOSED);

    return result;

}
