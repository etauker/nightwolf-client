import { IKeyValue } from '../../data/key-value.interface';
import { NightwolfOptions } from '../../data/nightwolf-options.interface';
import { NightwolfRequest } from '../../data/nightwolf-request.interface';
import { NightwolfSettings } from '../../data/nightwolf-settings.interface';
import { NightwolfRequestTemplate } from '../nightwolf-template.interface';

export class JsonRequestTemplate implements NightwolfRequestTemplate {
    constructor(settings: NightwolfSettings, options: NightwolfOptions, fileContent: string) {
        throw new Error('Method not implemented.');
    }
    format(map: Map<string, IKeyValue>): NightwolfRequest {
        throw new Error('Method not implemented.');
    }
}

// const template = {
//     constructor(settings: NightwolfSettings, options: NightwolfOptions, fileContent: string) {
//         throw new Error('Method not implemented.');
//     },
//     format(map: Map<string, IKeyValue>): NightwolfRequest {
//         throw new Error('Method not implemented.');
//     }
// }

// class BaseClass { 
//     prototype = {

//     };
// }

// const JsonRequestTemplate = new BaseClass();
// JsonRequestTemplate.prototype.format()