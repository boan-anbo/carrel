import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { KeyboardEvent } from "@react-types/shared";
import { MouseEvent, ReactNode } from "react";
import { v4 } from "uuid";

export enum EDataTreeNodeType {
  COLLECTION,
  ITEM,
}
export enum CollectionExpandMode {
  UNSPECIFIED,
  SINGLE_CLICK,
  DOUBLE_CLICK,
  NO_ACTION,
}

export interface IDataTreeNodeRef {
  /**
   * Increment index of the node in the flat tree
   */
  index: number;
  /**
   * Unique identifier
   */
  key: string;
  type: EDataTreeNodeType;
  subCollections: IDataTreeNodeRef[];
  subItems: IDataTreeNodeRef[];
}
export class DataTreeNodeRef implements IDataTreeNodeRef {
  index: number = 0;
  key: string = v4();
  /**
   * Order to override the default sorting, coming from the node.
   */
  order: number = 0;
  type: EDataTreeNodeType = EDataTreeNodeType.COLLECTION;
  subCollections: DataTreeNodeRef[] = [];
  subItems: DataTreeNodeRef[] = [];
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
   * Plaintext string label to be used for highlight etc.
   */
  plainLabel: string;
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
  subItemsCount: number;
  subCollectionsCount: number;

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
  /**
   * count label, ReactNode to display after the count.
   */
  countLabel?: ReactNode;
  /**
   * Icon for opened collection node
   */
  collectionIconOpen?: ReactNode;

  /**
   * Icon for closed collection node
   */
  collectionIconClosed?: ReactNode;
  /**
   * Option to override global expand mode in config
   */
  expandMode?: CollectionExpandMode;
}

export class DataTreeCollection<T> implements IDataTreeCollection<T> {
  plainLabel: string = "";
  subItemsCount: number = 0;
  subCollectionsCount: number = 0;
  count?: number | undefined;
  collectionIconOpen?: ReactNode;
  collectionIconClosed?: ReactNode;
  iconActive?: ReactNode;
  iconInactive?: ReactNode;
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
  expandMode?: CollectionExpandMode = CollectionExpandMode.UNSPECIFIED;
  onPress?:
    | ((event: KeyboardEvent, key: string, data?: T | undefined) => void)
    | undefined = undefined;
  onSingleClick?:
    | ((
        event: MouseEvent<Element, globalThis.MouseEvent>,
        key: string,
        data?: T | undefined
      ) => void)
    | undefined = undefined;
  onDoubleClick?:
    | ((
        event: MouseEvent<Element, globalThis.MouseEvent>,
        key: string,
        data?: T | undefined
      ) => void)
    | undefined = undefined;

  // constructor for partial data.
  public static fromPartial<T>(
    data: Partial<IDataTreeCollection<T>>
  ): DataTreeCollection<T> {
    const result = new DataTreeCollection<T>();
    Object.assign(result, data);
    if (
      result.label &&
      typeof result.label === "string" &&
      !result.plainLabel
    ) {
      result.plainLabel = result.label;
    }
    return result;
  }
}

export interface IDataTreeItem<T> extends IDataTreeNode<T> {
  /**
   * Node icon when activate
   */
  iconActive?: ReactNode;
  iconInactive?: ReactNode;
}

export class DataTreeConfig<T> {
  collectionDefaultIconCollapsed?: ReactNode | undefined = (
    <ChevronRightIcon />
  );
  collectionDefaultIconExpanded?: ReactNode | undefined = (<ChevronDownIcon />);

  collectionDefaultExpandMode: CollectionExpandMode =
    CollectionExpandMode.SINGLE_CLICK;
  collectionDefaultOnClick?: (key: string, item?: T) => void;
  /**
   * The icon for an item when there is no icon provided for that specific item.
   */
  itemDefaultIconOpen?: ReactNode | undefined;
  itemDefaultIconClosed?: ReactNode | undefined;
  itemDefaultOnClick?: (key: string, item?: T) => void;

  indentation?: number | undefined = 5;

  /**
   * Filter related configs
   */
  enableFilter?: boolean | undefined = true;
  // whether a builtin filter input is displayed when `enableFilter` is true.
  useBuiltInFilter?: boolean | undefined = true;
  /**
   * E.g. filter by label: [['label']]
   * Filter by data's `filename` property: [['data', 'fileName']]
   */
  filterFields: string[][] = [["plainLabel"]];

  selectionMode?: "single" | "multiple" | undefined = "single";

  spacing?: number | undefined = 1;

  size?: TCarrelSize = "xs";
  // partial constructor
  constructor(data?: Partial<DataTreeConfig<T>>) {
    Object.assign(this, data);
  }
}
