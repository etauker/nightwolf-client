import { IKeyValue } from './data/key-value.interface';

import { EnvironmentService } from './services/environment-service';
import { RestService } from './services/rest-service';
import { NightwolfRequestData } from './data/nightwolf-request-data.interface';
import { NightwolfSettings } from './data/nightwolf-settings.interface';
import { SettingsService } from './services/settings-service';
import { NightwolfOptions } from './data/nightwolf-options.interface';
import { NightwolfResponse } from './data/nightwolf-response.interface';

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




    public static runOnce(
        requests: NightwolfRequestData[],
        settingsPaths: string[] = [],
        environmentPaths: string[] = [],
        settingsOverrides: Partial<NightwolfSettings> = {},
        environmentOverrides: Partial<IKeyValue> = {},
    ): Promise<NightwolfResponse[]> {

        
        const promises = requests.map(data => {
            // let settings, template;

            return Promise.all([
                SettingsService.resolveSettings(data.options, settingsPaths, settingsOverrides),
                EnvironmentService.resolveEnvironments(data.options, environmentPaths, environmentOverrides),
            ])
            .then(([settings, environment]) => {
                return Promise.all([
                    TemplateService.loadTemplate(settings, data.options, data.path),
                    settings,
                    environment,
                ])
            })
            .then(([template, settings, environment]) => {
                return Promise.all([
                    TemplateService.substitute(settings, data.options, template, environment, data.parameters),
                    settings,
                    environment,
                ])
            })
            .then(([request, settings, environment]) => {
                return RestService.makeRequest(settings, data.options, request, environment, data.parameters);
            });
        });

        return Promise.all(promises)
    }


}