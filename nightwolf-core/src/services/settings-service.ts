import { IKeyValue } from '../data/key-value.interface'
import { NightwolfOptions } from '../data/nightwolf-options.interface';
import { FileService } from './file-service';
import { defaults, NightwolfSettings } from '../data/nightwolf-settings.interface';


/**
 * A service used for loading, merging and configuring 
 * application settings in the form of json objects.
 * @hideconstructor
 */
export class SettingsService {


    /**
     * Loads the provided file and parses the key value pairs into an object.  
     * @param {NightwolfOptions} options request options
     * @param {string} path the full path to load (including filename and extension)
     * @returns {Promise<IKeyValue>} loaded file content as a json object
     */
    public static loadSettings(options: NightwolfOptions, path: string): Promise<IKeyValue> {
        return new Promise((resolve, reject) => {
            const lines = [];

            FileService.readLines(options, path).subscribe(
                line => lines.push(line),
                error => reject(error),
                () => resolve(JSON.parse(lines.join('\n')))
            );
        });
    }


    /**
     * Loads any number of json files at the provided paths and merges them.
     * The merge also includes system default settings.
     * When merging, default settings get overwritten by files contents.
     * Where multiple files contain the same keys, 
     * the file later in the array overwrites any previous values for the same key.
     * @param {NightwolfOptions} options request options
     * @param {string[]} paths the full path to load (including filename and extension)
     * @param {IKeyValue} overrides the values to override resolved settings with
     * @returns {Promise<IKeyValue>} merged environment variables as an object
     */
    public static resolveSettings(options: NightwolfOptions, paths: string[], overrides: Partial<NightwolfSettings>): Promise<NightwolfSettings> {
        const promises = paths.map(path => SettingsService.loadSettings(options, path));
        return Promise.all(promises).then(settings => {

            // TODO: do a recursive merge
            const merged = defaults;

            return merged;
        });
    }

}