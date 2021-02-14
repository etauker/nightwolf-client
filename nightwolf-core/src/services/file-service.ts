import * as fs from 'fs';
import * as readline from 'readline';

import { Observable } from 'rxjs';
import { NightwolfOptions } from '../data/nightwolf-options';
import { NightwolfRequest } from '../data/nightwolf-request';
import { RequestFactory } from './request-factory';


/**
 * A service used for loading and saving files on the local machine.
 * @hideconstructor
 */
export class FileService {


    /**
     * Reads a file at the provided path and returns the results line by line.
     * @param {NightwolfOptions} options request options
     * @param {string} path path of the file to load
     * @returns {Observable<string>}
     */
    public static readLines(options: NightwolfOptions, path: string): Observable<string> {
        return new Observable(subscriber => {

            const rl = readline.createInterface({
                input: fs.createReadStream(path),
                output: process.stdout,
                terminal: false
            });

            rl.on('line', (line) => subscriber.next(line));
            rl.on('close', () => subscriber.complete());

        });
    }


    /**
     * Reads a http request file at the provided path, parses it into a NightwolfRequest.
     * @param {NightwolfOptions} options request options
     * @param {string} path path of the file to load
     * @returns {Promise<NightwolfRequest>}
     * 
     * @example <caption>Format of file contents:</caption>
     * POST https://example.com/post-endpoint
     * 
     * Content-Type: application/json
     * Authentication: Bearer abcdefgh
     * 
     * {
     *     "json": "json value"
     * }
     */
    public static loadHttpRequest(options: NightwolfOptions, path: string): Promise<NightwolfRequest> {
        return new Promise((resolve, reject) => {
            const lines = [];

            FileService.readLines(options, path).subscribe(
                line => lines.push(line),
                error => reject(error),
                () => resolve(RequestFactory.fromHttpFile(lines))
            );
        });
    }


    /**
     * Reads a json request file at the provided path, parses it into a NightwolfRequest.
     * @param {NightwolfOptions} options request options
     * @param {string} path path of the file to load
     * @returns {NightwolfRequest}
     * 
     * @example <caption>Format of file contents:</caption>
     * {
     *     "method": "POST",
     *     "url": "https://example.com/post-endpoint",
     *     "headers": {
     *         "Content-Type": "application/json",
     *         "Authentication": "Bearer abcdefgh"
     *     },
     *     "body": {
     *         "json": "json value"
     *     }
     * }
     */
    public static loadJsonRequest(options: NightwolfOptions, path: string): Promise<NightwolfRequest> {
        return new Promise((resolve, reject) => {
            const lines = [];

            FileService.readLines(options, path).subscribe(
                line => lines.push(line),
                error => reject(error),
                () => resolve(RequestFactory.fromJsonFile(lines))
            );
        });
    }

}