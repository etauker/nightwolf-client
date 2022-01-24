import { NightwolfRequest } from '../data/nightwolf-request.interface';
import { NightwolfSettings } from '../data/nightwolf-settings.interface';
import { NightwolfOptions } from '../data/nightwolf-options.interface';
import { NightwolfRequestTemplate } from './nightwolf-template.interface';
import { IKeyValue } from '../../dist/data/key-value.interface';

/**
 * Function that replaces "${ type.key }" placeholders with a specific value.
 */
export interface NightwolfTemplateReplacer {
    (
        settings: NightwolfSettings,
        options: NightwolfOptions,
        template: NightwolfRequestTemplate,
        key: string,
        environment: IKeyValue,
        parameters: IKeyValue,
    ):  NightwolfRequestTemplate
}
