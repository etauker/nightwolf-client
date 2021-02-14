import { IncomingHttpHeaders } from 'http';

/**
 * Interface representing JSON format of a REST response.
 * @example
 * {
 *     "code": "200",
 *     "message": "OK",
 *     "headers": {
 *         "Content-Type": "application/json",
 *     },
 *     "body": {
 *          "json": "json value"
 *      }
 * }
 */
export interface IResponse {

    /** response status code */
    code: number;

    /** response status message */
    message: string;

    /** response body as a string or json object */
    body: string | object;

    /** response headers */
    headers: IncomingHttpHeaders;

}