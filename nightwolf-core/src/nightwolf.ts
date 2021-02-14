import { IKeyValue } from './data/key-value.interface';
import { NightwolfOptions } from './data/nightwolf-options';

import { EnvironmentService } from './services/environment-service';
import { RestService } from './services/rest-service';
import { FileService } from './services/file-service';

/**
 * This class is the entrypoint the functionality of the Nightwolf library.
 * @hideconstructor
 */
export class Nightwolf {

    /**
     * Loads, parses and runs the request file located at the 
     * provided <strong><em>requestPath</em></strong>.<br>
     * 
     * Any placeholders in the file get substituted for system's environment 
     * variables, key-value pairs loaded from files provided in 
     * <strong><em>environmentPaths</em></strong>, or for the 
     * provided <strong><em>parameters</em></strong> object.
     *
     * @param {NightwolfOptions} options request runner options
     * @param {string} requestPath path of the request 
     *      (including filename with extension)
     * @param {string[]} environmentPaths paths of the environment 
     *      files to merge with system environment variables and consider for substitution  
     *      (replaces <strong>${ env.KEY }</strong> placeholders in the request file)
     * @param {IKeyValue} parameters request parameters to consider for substitution  
     *      (replaces <strong>${ param.KEY }</strong> placeholders in the request file)
     */
    public static run(
        options: NightwolfOptions,
        requestPath: string,
        environmentPaths: string[],
        parameters: IKeyValue,
    ): Promise<void> {

        return Promise.all([
            FileService.loadHttpRequest(options, requestPath),
            EnvironmentService.resolveEnvironments(options, environmentPaths),
        ])
        .then(([request, environment]) => {
            RestService.makeRequest(options, request, environment, parameters);
        });

    }


}