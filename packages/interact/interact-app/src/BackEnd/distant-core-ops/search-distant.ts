import {CratecontrollerscrollApi, CratecontrollersearchApi, DistantApiSearchResponse} from "../distant_api";

export const searchDistant: (searchTerm: string) => Promise<DistantApiSearchResponse> = async (searchTerm: string) => {
    const client = new CratecontrollersearchApi(
        undefined, 'http://localhost:3000'
    );
    const result = await client.search({
        query: searchTerm,
        indices: ["distant_rl_history"]
    });

    return result.data;
}

export const scrollDocuments: (scrollId: string) => Promise<DistantApiSearchResponse> = async (scrollId: string) => {
    const client = new CratecontrollerscrollApi();
    const result = await client.scroll({
        scroll_id: scrollId
    });

    return result.data;
}
