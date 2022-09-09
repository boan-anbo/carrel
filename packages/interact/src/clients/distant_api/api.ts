/* tslint:disable */
/* eslint-disable */
/**
 * distant_core
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact:
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import {Configuration} from './configuration';
import globalAxios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
    assertParamExists,
    createRequestFunction,
    DUMMY_BASE_URL,
    serializeDataIfNeeded,
    setApiKeyToObject,
    setBasicAuthToObject,
    setBearerAuthToObject,
    setOAuthToObject,
    setSearchParams,
    toPathString
} from './common';
// @ts-ignore
import {BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError} from './base';

/**
 * The greeting service definition.
 * @export
 * @interface ApiError
 */
export interface ApiError {
    /**
     * / code
     * @type {string}
     * @memberof ApiError
     */
    'code': string;
    /**
     * / message
     * @type {string}
     * @memberof ApiError
     */
    'message': string;
    /**
     * / payload for user
     * @type {string}
     * @memberof ApiError
     */
    'payload_for_user': string;
    /**
     *
     * @type {string}
     * @memberof ApiError
     */
    'suggestion': string;
    /**
     * / user payload
     * @type {string}
     * @memberof ApiError
     */
    'user_payload': string;
}
/**
 *
 * @export
 * @interface DistantApiScrollRequest
 */
export interface DistantApiScrollRequest {
    /**
     *
     * @type {string}
     * @memberof DistantApiScrollRequest
     */
    'scroll_id': string;
}
/**
 *
 * @export
 * @interface DistantApiSearchRequest
 */
export interface DistantApiSearchRequest {
    /**
     *
     * @type {Array<string>}
     * @memberof DistantApiSearchRequest
     */
    'indices': Array<string>;
    /**
     *
     * @type {string}
     * @memberof DistantApiSearchRequest
     */
    'query': string;
}
/**
 *
 * @export
 * @interface DistantApiSearchResponse
 */
export interface DistantApiSearchResponse {
    /**
     * / count
     * @type {number}
     * @memberof DistantApiSearchResponse
     */
    'count': number;
    /**
     *
     * @type {boolean}
     * @memberof DistantApiSearchResponse
     */
    'has_more': boolean;
    /**
     *
     * @type {Array<Passage>}
     * @memberof DistantApiSearchResponse
     */
    'passages': Array<Passage>;
    /**
     * / optional scroll_id
     * @type {string}
     * @memberof DistantApiSearchResponse
     */
    'scroll_id'?: string;
}
/**
 * / An abstract document.
 * @export
 * @interface Document
 */
export interface Document {
    /**
     * / archive location
     * @type {string}
     * @memberof Document
     */
    'archive_location': string;
    /**
     * / citation information
     * @type {string}
     * @memberof Document
     */
    'citation': string;
    /**
     * / created date
     * @type {number}
     * @memberof Document
     */
    'created': number;
    /**
     *
     * @type {Array<Person>}
     * @memberof Document
     */
    'creators': Array<Person>;
    /**
     * / description
     * @type {string}
     * @memberof Document
     */
    'description': string;
    /**
     *
     * @type {Array<any>}
     * @memberof Document
     */
    'files': Array<any>;
    /**
     * / modified date using Unix timestamp
     * @type {number}
     * @memberof Document
     */
    'modified': number;
    /**
     * pages protobuf number type
     * @type {string}
     * @memberof Document
     */
    'pages': string;
    /**
     * / publication date
     * @type {string}
     * @memberof Document
     */
    'publication_date': string;
    /**
     * / In the case of a Zotero Item, this is the Zotero URI.
     * @type {string}
     * @memberof Document
     */
    'source_id': string;
    /**
     * / Describes what the unique Id refers to.
     * @type {string}
     * @memberof Document
     */
    'source_id_type': string;
    /**
     * / source url, e.g. a direct link to the source, e.g. the DOI of a book or journal
     * @type {string}
     * @memberof Document
     */
    'source_url': string;
    /**
     *
     * @type {string}
     * @memberof Document
     */
    'title': string;
    /**
     * / Uuid of the source.
     * @type {string}
     * @memberof Document
     */
    'uuid': string;
}
/**
 *
 * @export
 * @interface ModelFile
 */
export interface ModelFile {
    /**
     * / file directory
     * @type {string}
     * @memberof ModelFile
     */
    'file_dir': string;
    /**
     * / file extension
     * @type {string}
     * @memberof ModelFile
     */
    'file_extension': string;
    /**
     * / filename, with extension
     * @type {string}
     * @memberof ModelFile
     */
    'file_name': string;
    /**
     * id
     * @type {string}
     * @memberof ModelFile
     */
    'uuid': string;
}
/**
 *
 * @export
 * @interface Passage
 */
export interface Passage {
    /**
     * passage description
     * @type {string}
     * @memberof Passage
     */
    'description': string;
    /**
     *
     * @type {Document}
     * @memberof Passage
     */
    'document': Document;
    /**
     * e.g. \"book1/chapter1\" or page number
     * @type {string}
     * @memberof Passage
     */
    'location': string;
    /**
     * passage text
     * @type {string}
     * @memberof Passage
     */
    'text': string;
    /**
     * id
     * @type {string}
     * @memberof Passage
     */
    'uuid': string;
}
/**
 * / a unique id in the original place
 * @export
 * @interface Person
 */
export interface Person {
    /**
     * / description
     * @type {string}
     * @memberof Person
     */
    'description': string;
    /**
     * / first name
     * @type {string}
     * @memberof Person
     */
    'first_name': string;
    /**
     * / last name
     * @type {string}
     * @memberof Person
     */
    'last_name': string;
    /**
     *
     * @type {string}
     * @memberof Person
     */
    'uuid': string;
}

/**
 * CratecontrollerscrollApi - axios parameter creator
 * @export
 */
export const CratecontrollerscrollApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {DistantApiScrollRequest} distantApiScrollRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        scroll: async (distantApiScrollRequest: DistantApiScrollRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'distantApiScrollRequest' is not null or undefined
            assertParamExists('scroll', 'distantApiScrollRequest', distantApiScrollRequest)
            const localVarPath = `/scroll`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;



            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(distantApiScrollRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CratecontrollerscrollApi - functional programming interface
 * @export
 */
export const CratecontrollerscrollApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CratecontrollerscrollApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @param {DistantApiScrollRequest} distantApiScrollRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async scroll(distantApiScrollRequest: DistantApiScrollRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DistantApiSearchResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.scroll(distantApiScrollRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CratecontrollerscrollApi - factory interface
 * @export
 */
export const CratecontrollerscrollApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CratecontrollerscrollApiFp(configuration)
    return {
        /**
         *
         * @param {DistantApiScrollRequest} distantApiScrollRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        scroll(distantApiScrollRequest: DistantApiScrollRequest, options?: any): AxiosPromise<DistantApiSearchResponse> {
            return localVarFp.scroll(distantApiScrollRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CratecontrollerscrollApi - object-oriented interface
 * @export
 * @class CratecontrollerscrollApi
 * @extends {BaseAPI}
 */
export class CratecontrollerscrollApi extends BaseAPI {
    /**
     *
     * @param {DistantApiScrollRequest} distantApiScrollRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CratecontrollerscrollApi
     */
    public scroll(distantApiScrollRequest: DistantApiScrollRequest, options?: AxiosRequestConfig) {
        return CratecontrollerscrollApiFp(this.configuration).scroll(distantApiScrollRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * CratecontrollersearchApi - axios parameter creator
 * @export
 */
export const CratecontrollersearchApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {DistantApiSearchRequest} distantApiSearchRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        search: async (distantApiSearchRequest: DistantApiSearchRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'distantApiSearchRequest' is not null or undefined
            assertParamExists('search', 'distantApiSearchRequest', distantApiSearchRequest)
            const localVarPath = `/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;



            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(distantApiSearchRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CratecontrollersearchApi - functional programming interface
 * @export
 */
export const CratecontrollersearchApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CratecontrollersearchApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @param {DistantApiSearchRequest} distantApiSearchRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async search(distantApiSearchRequest: DistantApiSearchRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DistantApiSearchResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.search(distantApiSearchRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CratecontrollersearchApi - factory interface
 * @export
 */
export const CratecontrollersearchApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CratecontrollersearchApiFp(configuration)
    return {
        /**
         *
         * @param {DistantApiSearchRequest} distantApiSearchRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        search(distantApiSearchRequest: DistantApiSearchRequest, options?: any): AxiosPromise<DistantApiSearchResponse> {
            return localVarFp.search(distantApiSearchRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CratecontrollersearchApi - object-oriented interface
 * @export
 * @class CratecontrollersearchApi
 * @extends {BaseAPI}
 */
export class CratecontrollersearchApi extends BaseAPI {
    /**
     *
     * @param {DistantApiSearchRequest} distantApiSearchRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CratecontrollersearchApi
     */
    public search(distantApiSearchRequest: DistantApiSearchRequest, options?: AxiosRequestConfig) {
        return CratecontrollersearchApiFp(this.configuration).search(distantApiSearchRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

