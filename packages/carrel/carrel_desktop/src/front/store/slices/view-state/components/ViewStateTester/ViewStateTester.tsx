import {
  Box,
  Button,
  Container,
  HStack,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Workarea } from "../../../../../../ui/layout/layouts/workarea/Workarea";
import { MainWorkArea } from "../../../../../domains/carrel/components/MainWorkArea";
import { LeftPanel } from "../../../../../domains/core/components/LeftPanel";
import { RightPanel } from "../../../../../domains/core/components/RightPanel";
import { RootState } from "../../../../store";
import viewState, {
  updateViewState,
  UpdateViewStatePayload,
  ViewState,
} from "../../view-state";
import { ViewStateAction } from "../../view-actions";
import { ContainerId } from "../../container-id";
import { ViewId } from "../../view-id";

import styles from "./ViewStateTester.module.scss";

export interface ViewStateTesterProps {
  prop?: string;
}

const allContainers: ContainerId[] = [
  ContainerId.LEFT_PANEL_CONTAINER,
  ContainerId.WORK_AREA_CONTAINER,
  ContainerId.RIGHT_PANEL_CONTAINER,
];

const allViews: ViewId[] = [ViewId.CARREL_WRITER];
export function ViewStateTester({
  prop = "default value",
}: ViewStateTesterProps) {
  const viewStates = useSelector((state: RootState) => state.viewStates);

  const [currentTargetContainer, setCurrentTargetContainer] = useState(
    ContainerId.WORK_AREA_CONTAINER
  );
  const [currentView, setCurrentView] = useState(ViewId.CARREL_WRITER);

  const dispatch = useDispatch();

  const onViewChange = () => {
    const update = {
      action: ViewStateAction.ADD,
      removeExisting: true,
      viewState: {
        id: currentView,
        order: 1,
      } as ViewState<any>,
      container: currentTargetContainer,
    } as UpdateViewStatePayload<any>;
    dispatch(updateViewState(update));
  };
  return (
    <>
      <Container maxH="full" maxW="full" h="1200px" bg="pink.100">
        <HStack h="full">
          <LeftPanel />
          <MainWorkArea />
          <RightPanel />
        </HStack>
      </Container>
      <Box>{}</Box>
      <Box>
        Target container: {currentTargetContainer}| View: {currentView}
        <Select onChange={onViewChange} placeholder="Select container">
          {allContainers.map((containerId) => {
            return <option value={containerId}>{containerId}</option>;
          })}
        </Select>
        <Select onChange={onViewChange} placeholder="Select view">
          {allViews.map((viewId) => {
            return <option value={viewId}>{viewId}</option>;
          })}
        </Select>
      </Box>
      <Button onClick={onViewChange}>Update</Button>
      <VStack>
        <Box>
          Container view states:{" "}
          {viewStates.WORK_AREA_CONTAINER.map((viewState, index) => {
            return (
              <Box>
                View States {index}: {viewState.id}
              </Box>
            );
          })}
        </Box>
        <Box>Current view: {currentView}</Box>
      </VStack>
    </>
  );
}
