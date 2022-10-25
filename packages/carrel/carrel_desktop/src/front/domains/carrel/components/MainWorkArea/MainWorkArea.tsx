import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { SplitView } from "../../../../../ui/components";
import Page from "../../../../../ui/components/page/Page";
import { RootState } from "../../../../store/store";
import { CarrelWriter } from "../../../core/components/CarrelWriter/CarrelWriter";

export enum EMainWorkAreaPage {
  DEFAULT,
  CARREL_WRITER,
}

export interface MainWorkAreaProps {
  firstViewPage: EMainWorkAreaPage;
  secondViewPage: EMainWorkAreaPage;
}

export function MainWorkArea({
  firstViewPage = EMainWorkAreaPage.DEFAULT,
  secondViewPage = EMainWorkAreaPage.DEFAULT,
}: MainWorkAreaProps) {
  const appState = useSelector((state: RootState) => state.appstate);

  const getView = (page: EMainWorkAreaPage): ReactNode => {
    switch (page) {
      case EMainWorkAreaPage.CARREL_WRITER:
        return <CarrelWriter />;
      case EMainWorkAreaPage.DEFAULT:
      default:
        return <div>Default</div>;
    }
  };
  const firstViewComponent = useMemo(() => {
    return getView(firstViewPage ?? appState.workAreaFirstView);
  }, [appState.workAreaFirstView, firstViewPage]);

  const secondViewComponent = useMemo(() => {
    return getView(secondViewPage ?? appState.workAreaSecondView);
  }, [appState.workAreaSecondView, secondViewPage]);

  return (
    <Page title="Page title">
      <SplitView first={firstViewComponent} second={secondViewComponent} />
    </Page>
  );
}
