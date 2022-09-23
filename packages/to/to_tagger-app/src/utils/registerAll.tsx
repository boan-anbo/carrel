import {registerAll, unregisterAll} from "@tauri-apps/api/globalShortcut";
import {useAppStateStore} from "../appStateStore";

export const shortCuts = [
    'CommandOrControl+Shift+Alt+Q',
    'CommandOrControl+Shift+Alt+W',
    'CommandOrControl+Shift+Alt+E',
    'CommandOrControl+Shift+Alt+R',
    'CommandOrControl+Shift+Alt+T',
    'CommandOrControl+Shift+Alt+A',
    'CommandOrControl+Shift+Alt+S',
    'CommandOrControl+Shift+Alt+D',
    'CommandOrControl+Shift+Alt+F',
    'CommandOrControl+Shift+Alt+G',
    'CommandOrControl+Shift+Alt+Z',
    'CommandOrControl+Shift+Alt+X',
    'CommandOrControl+Shift+Alt+C',
    'CommandOrControl+Shift+Alt+V',
    'CommandOrControl+Shift+Alt+B',
]

export const registerAllTaggerHotkeys = async () => {
    const printTagStrings = useAppStateStore.getState().printTagStrings;
    await unregisterAll();
    await registerAll(shortCuts, (shortcut) => {
        const index = shortCuts.indexOf(shortcut)
        printTagStrings(index)

        console.log(`Shortcut ${shortcut} triggered`);

    });



}
