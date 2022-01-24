import { NightwolfRequestTemplate } from './nightwolf-template.interface';
import { NightwolfSettings } from '../data/nightwolf-settings.interface';
import { NightwolfOptions } from '../data/nightwolf-options.interface';

/**
 * Function that parses a request template from a loaded string.
 */
export interface NightwolfTemplateParser {
    (settings: NightwolfSettings, options: NightwolfOptions, contents: string): NightwolfRequestTemplate,
}