const supportedExtensions = ['txt', 'md']
export const isFileSupportedByWriter = (extension: string): boolean => {
    return supportedExtensions.some((supportedExt) => extension.endsWith(supportedExt))

}