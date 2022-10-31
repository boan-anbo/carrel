import { ViewId } from "./view-id";

export const getViewDefaultName = (view: ViewId, language: any) => {
    switch (view) {
        case ViewId.CARREL_WRITER:
            return language.Writer;

}