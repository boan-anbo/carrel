import {ViewId} from "./view-id";

export const getViewDefaultName = (view: ViewId, language?: any): string => {
    switch (view) {
        case ViewId.EMPTY:
            return 'Empty page'
        case ViewId.CORE_TAG_TREE:
            return 'Core tag tree'
        case ViewId.ARCHIVE_LIST:
            return 'Archive list'
        case ViewId.CARD_BLOCK:
            return 'Card block'
        case ViewId.INSPECTOR_BLOCK:
            return 'Inspector block'

        case ViewId.CORE_TAG_FIREFLIES:
            return 'Core tag fireflies'
        case ViewId.CARREL_WRITER:
            return 'Carrel writer'
        case ViewId.ARCHIVE_FILES:
            return 'Archive files'
    }
}
