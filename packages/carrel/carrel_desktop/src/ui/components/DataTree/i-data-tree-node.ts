import { KeyboardEvent } from "@react-types/shared";
import { MouseEvent, ReactNode } from "react";
import { v4 } from "uuid";

export enum EDataTreeNodeType {
    COLLECTION,
    ITEM,
}

export interface IDataTreeNode<T> {
    /**
     * The unique identifier of the tree node.
     */
    key: string;
    /**
     * Parent key: the key of its parent node. A root node has no parent key.
     */
    parentKey?: string | null;
    /**
     * The label to be displayed.
     */
    label: ReactNode;
    /**
     * Aria label.
     */
    ariaLabel?: string;
    /**
     * The data to be displayed.
     */
    data?: T;
    // whether this data should be loaded lazily.
    isLazy?: boolean;
    /**
     * method to retrieve the data lazily if it's not included.
     */
    loadData?: (key: string) => Promise<T>;
    /**
     * The type of the data tree node, whether it's a collection or an item.
     */
    type: EDataTreeNodeType;
    /**
     * The order by which the node should be displayed.
     * Defaults to 0, no particular order.
     * The bigger number comes first.
     */
    order?: number;
    /**
     * Whether the node should be pinned among its peers.
     * E.g. pinned items before other items under the same collection.
     * Or, pinned collection before other collections under the same level.
     */
    isPinned?: boolean;
    /**
     * On key event;
     */
    onPress?: (event: KeyboardEvent, key: string, data?: T) => void;
    /**
     * On single click;
     */
    onSingleClick?: (event: MouseEvent, key: string, data?: T) => void;
    /**
     * On double click
     */
    onDoubleClick?: (event: MouseEvent, key: string, data?: T) => void;


}
export interface IDataTreeCollection<T> extends IDataTreeNode<T> {
    /**
     * The source of truth of subcollections. 
     * When the data is loaded lazily, only ids exists here.
     */
    subCollectionIds: string[];
    subItemIds: string[];

    subCollections: IDataTreeCollection<T>[];
    subItems: IDataTreeItem<T>[];
    // wehtehr this node is root.
    isRoot?: boolean;
    /**
     * Whether the collection should expand
     */
    isOpen?: boolean;
    /**
     * Count of the items under this collection or items; will be displayed after the item label if provided
     */
    count?: number;
}

export class DataTreeCollection<T> implements IDataTreeCollection<T> {
    subCollectionIds: string[] = [];
    subItemIds: string[] = [];
    subCollections: IDataTreeCollection<T>[] = [];
    subItems: IDataTreeItem<T>[] = [];
    isRoot: boolean = false;
    isOpen: boolean = false;
    key: string = v4();
    parentKey?: string | null | undefined = undefined;
    label: ReactNode = "";
    ariaLabel?: string | undefined = undefined;
    data?: T | undefined = undefined;
    isLazy?: boolean | undefined = undefined;
    loadData?: ((key: string) => Promise<T>) | undefined = undefined;
    type: EDataTreeNodeType = EDataTreeNodeType.COLLECTION;
    order?: number | undefined = 0;
    isPinned?: boolean | undefined = undefined;
    onPress?: ((event: KeyboardEvent, key: string, data?: T | undefined) => void) | undefined = undefined;
    onSingleClick?: ((event: MouseEvent<Element, globalThis.MouseEvent>, key: string, data?: T | undefined) => void) | undefined = undefined;
    onDoubleClick?: ((event: MouseEvent<Element, globalThis.MouseEvent>, key: string, data?: T | undefined) => void) | undefined = undefined;

    // constructor for partial data.
    public static fromPartial<T>(data: Partial<IDataTreeCollection<T>>): DataTreeCollection<T> {
        const result = new DataTreeCollection<T>();
        Object.assign(result, data);
        return result;
    }
}

export interface IDataTreeItem<T> extends IDataTreeNode<T> {

}


export class DataTreeConfigState<T> {
    collectionIconCollapsed?: ReactNode | undefined = undefined;
    collectionIconExpanded?: ReactNode | undefined = undefined;
    itemIcon?: ReactNode | undefined = undefined;
    collectionIndent?: number | undefined = 5;
    itemIndent?: number | undefined = 16;

    selectionMode?: "single" | "multiple" | undefined = "single";
    selectedItems: IDataTreeNode<T>[] = [];
    select = (item: IDataTreeNode<T>) => {
        if (this.selectionMode === "single") {
            this.selectedItems = [item];
        } else {
            this.selectedItems = [...this.selectedItems, item];
        }
    }

    deselect = (item: IDataTreeNode<T>) => {
        if (this.selectionMode === "single") {
            this.selectedItems = [];
        } else {
            this.selectedItems = this.selectedItems.filter((i) => i.key !== item.key);
        }
    }

    isSelected = (item: IDataTreeNode<T>) => {
        return this.selectedItems.some((i) => i.key === item.key);
    }

    clearSelection = () => {
        this.selectedItems = [];
    }
    toggleSelection = (item: IDataTreeNode<T>) => {
        if (this.isSelected(item)) {
            this.deselect(item);
        } else {
            this.select(item);
        }
    }

    // partial constructor
    constructor(data?: Partial<DataTreeConfigState<T>>) {
        Object.assign(this, data);
    }


}

