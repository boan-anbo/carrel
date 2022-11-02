import { ViewId } from "./view-id";

export const getViewDefaultName = (view: ViewId, language?: any): string => {
    switch (view) {
        case ViewId.EMPTY:
            return 'Empty page'
        case ViewId.CORE_TAG_TREE:
            return 'Tags'
        case ViewId.ARCHIVE_LIST:
            return 'Archives'
        case ViewId.CARD_BLOCK:
            return 'Cards'
        case ViewId.INSPECTOR_BLOCK:
            return 'Inspector'
        case ViewId.CARREL_WRITER:
            return 'Writer'
        case ViewId.ARCHIVE_FILES:
            return 'Documents'
        case ViewId.PROJECT_FILE:
            return 'Files'
    }
}
