import {appWindow} from '@tauri-apps/api/window';

export const setTauriWindow = async (title: string): Promise<void> => {
    await appWindow.setTitle(title);
}
