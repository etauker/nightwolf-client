import { NightwolfTemplateConfiguration } from './nightwolf-template-configuration.interface';

/**
 * Represents persisted settings from Nightwolf application.
 */
export interface NightwolfSettings {
    customTemplates: NightwolfTemplateConfiguration[];
    environmentRoot: string;
    requestRoot: string;
}

export const defaults: NightwolfSettings = { 
    customTemplates: [],
    requestRoot: '~/.nightwolf/requests',
    environmentRoot: '~/.nightwolf/envs',
}
