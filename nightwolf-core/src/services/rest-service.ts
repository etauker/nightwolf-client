import * as http from 'http';
import * as https from 'https';

import { DeprecatedNightwolfOptions } from '../data/nightwolf-options';
import { DeprecatedNightwolfRequest } from '../data/nightwolf-request';
import { DeprecatedNightwolfResponse } from '../data/nightwolf-response';
import { IKeyValue } from '../data/key-value.interface';
import { RequestFactory } from './request-factory';
import { NightwolfSettings } from '../data/nightwolf-settings.interface';


/**
 * A service used making prepared API requests.
 * @hideconstructor
 */
export class RestService {

    public static makeRequest(
        settings: NightwolfSettings,
        options: DeprecatedNightwolfOptions,
        request: DeprecatedNightwolfRequest,
        environment: IKeyValue,
        parameters: IKeyValue,
    ): Promise<DeprecatedNightwolfResponse> {

        const copy = RequestFactory.substitute(request, environment, parameters);
        if (options.getPrintRequest()) {
            console.log(copy.toString());
        }

        return RestService._makeRequest(copy).then(response => {
            if (options.getPrintResponse()) {
                console.log(response.toString());
            }
            return response;
        });
    }


    private static _makeRequest(request: DeprecatedNightwolfRequest): Promise<DeprecatedNightwolfResponse> {
        const library = request.getUrl().startsWith('https') ? https : http;
        const options: http.RequestOptions = {
            'method': request.getMethod(),
            'headers': request.getHeaders(),
        };

        return new Promise((resolve, reject) => {
            const req = library.request(request.getUrl(), options, (res) => {
                res.setEncoding('utf8');

                let responseBody = '';

                res.on('data', (chunk) => {
                    responseBody += chunk;
                });

                res.on('end', () => {
                    const response = new DeprecatedNightwolfResponse(res.statusCode, res.statusMessage, res.headers, responseBody);
                    resolve(response);
                });
            });

            req.on('error', (error) => {
                reject(error);
            });
            
            if (request.getBody()) {
                req.write(request.getBody());
            }
            req.end();
        });
    }

}