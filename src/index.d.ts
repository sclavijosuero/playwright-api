// import { APIResponse } from 'playwright';
// import { Serializable } from 'playwright-core/types/structs';
// import { ReadStream } from 'fs';


// export interface APIRequestContext {
//   apiFetch(urlOrRequest: string | Request, options?: {
//     /**
//      * Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
//      * and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type`
//      * header will be set to `application/octet-stream` if not explicitly set.
//      */
//     data?: string | Buffer | Serializable;

//     /**
//      * Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status
//      * codes.
//      */
//     failOnStatusCode?: boolean;

//     /**
//      * Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent
//      * as this request body. If this parameter is specified `content-type` header will be set to
//      * `application/x-www-form-urlencoded` unless explicitly provided.
//      */
//     form?: { [key: string]: string | number | boolean; } | FormData;

//     /**
//      * Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by
//      * it.
//      */
//     headers?: { [key: string]: string; };

//     /**
//      * Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
//      */
//     ignoreHTTPSErrors?: boolean;

//     /**
//      * Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is
//      * exceeded. Defaults to `20`. Pass `0` to not follow redirects.
//      */
//     maxRedirects?: number;

//     /**
//      * Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not
//      * retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
//      */
//     maxRetries?: number;

//     /**
//      * If set changes the fetch method (e.g. [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or
//      * [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)). If not specified, GET method is used.
//      */
//     method?: string;

//     /**
//      * Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this
//      * request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless
//      * explicitly provided. File values can be passed either as
//      * [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file
//      * name, mime-type and its content.
//      */
//     multipart?: FormData | {
//       [key: string]: string | number | boolean | ReadStream | {
//         /**
//          * File name
//          */
//         name: string;

//         /**
//          * File type
//          */
//         mimeType: string;

//         /**
//          * File content
//          */
//         buffer: Buffer;
//       };
//     };

//     /**
//      * Query parameters to be sent with the URL.
//      */
//     params?: { [key: string]: string | number | boolean; } | URLSearchParams | string;

//     /**
//      * Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
//      */
//     timeout?: number;
//   }): Promise<APIResponse>;
// }