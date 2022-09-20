import {FolderSelector} from "./folderSelector";
import {FileList} from "./fileList";
import {SelectedFile} from "./selectedFile";
import {Toaster} from "react-hot-toast";

export function _indexGrids() {
    return <>
        <div
            style={{
                height: '90%',
            }
            }
            className={'flex bg-gray-300' }>
            <div className={'w-3/12'}>
                <FolderSelector/>
                <FileList/>
            </div>
            <div className={'w-8/12'}>
                <SelectedFile/>
            </div>

            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: 'green',
                        },
                    },
                    error: {
                        style: {
                            background: 'red',
                        },
                    },
                }}
            />
        </div>
    </>
}
