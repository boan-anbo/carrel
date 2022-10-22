import {open} from '@tauri-apps/api/dialog';

// use tauri api to open directory

// open directory
export const pickDirectory = async (): Promise<string> => {
  return await open({
    directory: true,
    multiple: false,
  }) as string;
};
