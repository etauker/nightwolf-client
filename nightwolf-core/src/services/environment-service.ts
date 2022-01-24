import { IKeyValue } from '../data/key-value.interface'
import { NightwolfOptions } from '../data/nightwolf-options.interface';
import { NightwolfSettings } from '../data/nightwolf-settings.interface';
import { FileService } from "./file-service";


/**
 * A service used for loading, merging and configuring 
 * runtime environment variables in the form of property 
 * files and key-value pairs.
 * @hideconstructor
 */
export class EnvironmentService {


    /**
     * Loads the provided file and parses the key value pairs into an object.  
     * Assumes the file has the following structure:  
     * 
     * ```properties
     * KEY_1=value_1  
     * KEY_2=another value  
     * ```
     * 
     * Any number of spaces either side of equals are allowed, e.g.  
     *
     * ```properties
     * KEY_1 = value_1  
     * KEY_2  =    another value  
     * ```
     * 
     * @param {NightwolfOptions} options request options
     * @param {string} path the full path to load (including filename and extension)
     * @returns {Promise<IKeyValue>} loaded key-value pairs as an object
     */
    public static loadEnvironment(settings: NightwolfSettings, options: NightwolfOptions, path: string): Promise<IKeyValue> {
        return new Promise((resolve, reject) => {
            const env = {};

            FileService.readLines(options, path).subscribe(
                line => {

                    // ignores lines that do not contain '='
                    if (line.includes('=')) {
                        const parts = line.split('=');
                        env[parts[0].trim()] = parts[1].trim();
                    }
                },
                error => reject(error),
                () => resolve(env)
            );
        });
    }


    /**
     * Loads any number of property files at the provided paths and merges them.
     * The merge also includes system environment variables.
     * When merging, system environment variables may get overwritten by files 
     * containing identical keys. Where multiple files contain the same keys, 
     * the file later in the array overwrites any previous values for the same key.
     * @param {NightwolfOptions} options request options
     * @param {string[]} paths the full path to load (including filename and extension)
     * @param {IKeyValue} overrides the values to override resolved settings with
     * @returns {Promise<IKeyValue>} merged environment variables as an object
     */
    public static resolveEnvironments(settings: NightwolfSettings, options: NightwolfOptions, paths: string[], overrides: IKeyValue = {}): Promise<IKeyValue> {
        const promises = paths.map(path => EnvironmentService.loadEnvironment(settings, options, path));
        return Promise.all(promises).then(environments => {
            const merged = environments.reduce((merged, env) => {
                return { ...merged, ...env };
            }, process.env);
            return { ...merged, ...overrides };
        });
    }

}