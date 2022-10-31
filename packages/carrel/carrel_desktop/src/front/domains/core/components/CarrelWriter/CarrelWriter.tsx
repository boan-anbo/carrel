import { Container, Flex, Text } from "@chakra-ui/react";
import { EditorState } from "@codemirror/state";
import { ViewUpdate } from "@codemirror/view";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { File } from "../../../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb";
import { fsManagerQueries } from "../../../../../backend/server-api/fs-manager-queries";
import { CarrelEditor } from "../../../../../ui/components";
import { ECarrelWriterKeyMap } from "../../../../../ui/components/CarrelEditor/carrel-editor-keymap";
import { TCarrelSize } from "../../../../../ui/props/i-size";
import { BLOCK_HEADER_HEIGHT_NUMBER } from "../../../../../ui/styles/constants";
import { setActiveEditorId } from "../../../../store/slices/writer-state/writer-state";
import { RootState } from "../../../../store/store";
import { isFileSupportedByWriter } from "./carrel-writer-utils";

export interface CarrelWriterProps {
  filePath?: string;
  size?: TCarrelSize;
}

export function CarrelWriter({
  filePath,
  size = "xs",
  ...props
}: CarrelWriterProps) {
  const writerState = useSelector((state: RootState) => state.writerState);

  const selectedProjectFiles = useSelector(
    (state: RootState) => state.appstate.coreProjectFilesSelected
  );

  const [writerId, setWriterId] = React.useState<string>(v4());

  const [initialDoc, setInitialDoc] = React.useState("");

  const [currentFile, setCurrentFile] =
    React.useState<File | undefined>(undefined);

  const { data } = fsManagerQueries.GetFileContent(currentFile?.fullPath);

  const dispatch = useDispatch();

  const setActiveId = () => {
    console.log("setting active id", writerId);
    dispatch(setActiveEditorId(writerId));
  };

  /**
   * Watch projectFile Selections, open the file with the editor if the current editor is active
   */
  useEffect(() => {
    if (!isCurrentEditorActive()) {
      return;
    }
    // only works when one and only one file is selected
    if (selectedProjectFiles.length !== 1) {
      return;
    }

    const selectedFile = selectedProjectFiles[0];
    if (!isFileSupportedByWriter(selectedFile.extension)) {
      return;
    }
    setCurrentFile(selectedProjectFiles[0]);
  }, [selectedProjectFiles]);

  const [currentState, setCurrentState] = useState<EditorState | null>(null);

  const isCurrentEditorActive = () => writerState.activeEditorId === writerId;

  useEffect(() => {
    if (data) {
      setInitialDoc(data.fileContent);
    }
  }, [data]);

  const displayFileName = useMemo(() => {
    if (!currentFile) {
      return "No File Selected";
    }
    return currentFile.fileName;
  }, [currentFile]);

  // load content from file path
  const onKeyPressed = (key: ECarrelWriterKeyMap) => {
    switch (key) {
      case ECarrelWriterKeyMap.CTRL_S:
        alert(currentState?.doc.toString());
        break;
      default:
        break;
    }
  };

  return (
    <Container
      onClick={(_) => setActiveId()}
      w="full"
      h="full"
      maxH="full"
      maxW="full"
      px="0"
      py="0"
      overflow={"auto"}
    >
      <Flex px="2" align="center" h={BLOCK_HEADER_HEIGHT_NUMBER} bg="primaryBg">
        <Text noOfLines={1} fontSize={size}>
          {displayFileName}
        </Text>
      </Flex>
      <CarrelEditor
        initialDoc={initialDoc}
        extensions={[]}
        onViewUpdate={(view: ViewUpdate) => {
          setCurrentState(view.state);
        }}
        onKeyPressed={(key: ECarrelWriterKeyMap) => onKeyPressed(key)}
      />
    </Container>
  );
}
