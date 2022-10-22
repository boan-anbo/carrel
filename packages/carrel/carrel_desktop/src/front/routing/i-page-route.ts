// each page route definition must implement
export interface IPageRoute {
    // the page to navigate router to
    absolutePath: string
    // the path used in nested routing-center under the domain
    relativePath: string
}
