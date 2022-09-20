import {List, ThemeIcon} from "@mantine/core";
import {useAppStateStore} from "../appStateStore";
import {FileIcon} from "@radix-ui/react-icons";


export function FileList() {

    const files = useAppStateStore(state => state.files);

    const selectFile = useAppStateStore(state => state.setSelectedFile);

    const selectedFile = useAppStateStore(state => state.selectedFile);


    const fileItems = files.map((file, index) => {
        return <div

            style={{
                background: file === selectedFile ? 'teal' : 'gray',
                color: file === selectedFile ? 'white' : 'black',
        }
            }
            className='
            cursor-pointer
            truncate px-2 text-xs'
                         onClick={() => selectFile(file)}
                         key={index}

        >
            <ThemeIcon><FileIcon/></ThemeIcon>
            <span >
                {file.split('\\').pop()}
                </span>
        </div>
    })
    return (
        <List
            className={'dropshadow bg-yellow-100 rounded h-full'}
            py={2} px={1} spacing={3}>
            {fileItems}
        </List>
    );
}
