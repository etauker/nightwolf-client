import { OutgoingHttpHeaders } from 'http';
// import { IKeyValue } from "./key-value.interface";
import { NightwolfOptions } from './nightwolf-options.interface';
import { IKeyValue } from './key-value.interface';

export interface NightwolfRequestData {
    
    /** The path of the request to load and execute. */
    path: string;

    /** Key-value pairs to substitute request parameter placeholders with. */
    parameters: IKeyValue;

    /** Options to consider while loading, substituting and and executing this request. */
    options: NightwolfOptions;
}