// extract the name of a directory from a path
export function getDirectoryName(path: string): string {
    return path.split('\\').pop()?.split('/').pop() ?? "";
}
