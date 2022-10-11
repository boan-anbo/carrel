import {open} from '@tauri-apps/api/dialog';

// use tauri api to open directory

// open directory
export const pickPdfs = async (title?: string): Promise<string[]> => {
    return await open({
        title: title,
        directory: false,
        multiple: true,
        filters: [
            {
                name: 'PDF',
                extensions: ['pdf']
            }
        ]
    }) as string[];
};
