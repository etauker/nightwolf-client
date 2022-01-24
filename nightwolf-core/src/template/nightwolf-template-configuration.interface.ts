import { NightwolfTemplateParser } from './nightwolf-template-parser.interface';
import { NightwolfTemplateReplacer } from './nightwolf-template-replacer.interface';

/**
 * Represents configuration for implementing a custom request template.
 */
export interface NightwolfTemplateConfiguration {

    /** File extensions associated with the custom template. */
    extensions: string[];

    /** Function used to parse the files with the provided extensions. */
    parser: NightwolfTemplateParser;

    /** Functions used for replacing "${ type.key }" placeholders with a specific value. */
    replacers: {
        [type: string]: NightwolfTemplateReplacer
    };
}