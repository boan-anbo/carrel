import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { SplitView } from "../../../../../ui/components";
import Page from "../../../../../ui/components/page/Page";
import { getViewById } from "../../../../store/slices/view-state/get-views-by-id";
import { RootState } from "../../../../store/store";
import { CarrelWriter } from "../../../core/components/CarrelWriter/CarrelWriter";

export enum EMainWorkAreaPage {
  DEFAULT,
  CARREL_WRITER,
}

export interface MainWorkAreaProps {
  firstViewPage?: EMainWorkAreaPage;
  secondViewPage?: EMainWorkAreaPage;
}

export function MainWorkArea({
  firstViewPage = EMainWorkAreaPage.DEFAULT,
  secondViewPage = EMainWorkAreaPage.DEFAULT,
}: MainWorkAreaProps) {
  const appState = useSelector((state: RootState) => state.appstate);

  const mainViewContainer = useSelector(
    (state: RootState) => state.viewStates.WORK_AREA_CONTAINER
  );

  const firstViewComponent = useMemo(() => {
    const firstRow = mainViewContainer[0];
    if (firstRow) {
      const firstView = firstRow[0];
      if (firstView) {
        return getViewById(firstView.id);
      }
    }
  }, [mainViewContainer, firstViewPage]);

  const secondViewComponent = useMemo(() => {
    const firstRow = mainViewContainer[0];
    if (firstRow) {
      const secondView = firstRow[1];
      if (secondView) {
        return getViewById(secondView.id);
      }
    }
    return null;
  }, [appState.workAreaSecondView, secondViewPage]);

  return (
    <Page title="Page title">
      <SplitView first={firstViewComponent} second={secondViewComponent} />
    </Page>
  );
}
