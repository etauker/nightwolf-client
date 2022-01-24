import { IKeyValue } from '../data/key-value.interface';
// import { NightwolfOptions } from '../data/nightwolf-options.interface';
import { NightwolfRequest } from '../data/nightwolf-request.interface';
// import { NightwolfSettings } from '../data/nightwolf-settings.interface';

export interface NightwolfRequestTemplate {

    // constructor(settings: NightwolfSettings, options: NightwolfOptions, fileContent: string);
    
    format(map: Map<string, IKeyValue>): NightwolfRequest;

}