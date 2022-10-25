import { PlainMessage } from "@bufbuild/protobuf"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GetDirectoryTreeResponse, ReadFileResponse, WriteFileResponse } from "../carrel_server_client/carrel/server/fs_manager/v1/server_fs_manager_v1_pb"
import { fsManagerApi } from "./carrel-api"

export class ApiQuery {
    log = (message: string, query: string, payload: any) => {
        console.log(`[${query}] ${message}`, payload)
    }

    GetDirectoryTree = (directoryPath: string | undefined) => useQuery(
        ["get_directory_tree", directoryPath],
        async (): Promise<PlainMessage<GetDirectoryTreeResponse> | null> => {
            if (directoryPath) {
                this.log("GetDirectoryTree", "get_directory_tree", { directoryPath })
                let result = await fsManagerApi.getDirectoryTree(
                    {
                        directory: directoryPath
                    })
                this.log("GetDirectoryTree", "get_directory_tree", result)
                return result
            }
            return null;
        }
    )

    GetFileContent = (filePath: string | undefined) => useQuery(
        ["get_file_content", filePath],
        async (): Promise<PlainMessage<ReadFileResponse> | null> => {
            if (filePath) {
                this.log("GetFileContent", "get_file_content", { filePath })
                let result = await fsManagerApi.readFile(
                    {
                        filePath
                    })
                this.log("GetFileContent", "get_file_content", result)
                return result
            }
            return null;
        }
    )

    WriteFileContent = (filePath: string | undefined, fileContent: string | undefined) => useMutation(
        ["write_file_content", filePath, fileContent],
        async (): Promise<PlainMessage<WriteFileResponse> | null> => {
            if (filePath && fileContent) {
                this.log("WriteFileContent", "write_file_content", { filePath, fileContent })
                let result = await fsManagerApi.writeFile(
                    {
                        filePath,
                        fileContent
                    })
                this.log("WriteFileContent", "write_file_content", result)
                return result
            }
            return null;
        }
    )



}

export const fsManagerQueries = new ApiQuery()

