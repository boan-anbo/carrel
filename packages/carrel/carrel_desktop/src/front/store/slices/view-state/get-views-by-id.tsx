import { CarrelWriter } from "../../../domains/core/components/CarrelWriter/CarrelWriter";
import { ViewId } from "./view-id";

export const getViewById = (viewId: ViewId) => {
  switch (viewId) {
    case ViewId.CARREL_WRITER:
      return <CarrelWriter />;
    case ViewId.EMPTY:
        return <>Empty page</>;
    default:
      return <div>View not found</div>;
  }
};