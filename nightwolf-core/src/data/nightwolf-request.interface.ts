import { OutgoingHttpHeaders } from 'http';
// import { IKeyValue } from "./key-value.interface";

/**
 * Interface representing JSON format of a REST request.
 * @example
 * {
 *     "method": "POST",
 *     "url": "https://example.com/post-endpoint",
 *     "headers": {
 *         "Content-Type": "application/json",
 *         "Authentication": "Bearer abcdefgh"
 *     },
 *     "body": {
 *          "json": "json value"
 *      }
 * }
 */
export interface NightwolfRequest {

    /** request method */
    method: string;

    /** request url */
    url: string;

    /** request body as a string or json object */
    body: string | object;

    /** request headers */
    headers: OutgoingHttpHeaders;

}