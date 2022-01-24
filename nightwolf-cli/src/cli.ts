import { NightwolfOptions } from '../../nightwolf-core/src/data/nightwolf-options.interface';
import { NightwolfSettings } from '../../nightwolf-core/src/data/nightwolf-settings.interface';
import { EnvironmentService } from '../../nightwolf-core/src/services/environment-service';
import { SettingsService } from '../../nightwolf-core/src/services/settings-service';
import { FileService } from '../../nightwolf-core/src/services/file-service';
import { IKeyValue } from '../../nightwolf-core/src/data/key-value.interface';
import { NightwolfRequestTemplate } from '../../nightwolf-core/src/template/nightwolf-template.interface';

// TODO: parse cli params
const path = '';
const filename = '';
const options: NightwolfOptions = {
    printRequest: true,
    printResponse: true,
}
const overrides: Partial<NightwolfSettings> = {};
let settings: NightwolfSettings;

SettingsService.resolveSettings(options, [], overrides)
    .then(resolved => {
        settings = resolved;
        return Promise.all([
            ExtensionService.loadTemplate(settings, options, path, filename),
            FileService.loadFile(settings, options, path),
            EnvironmentService.resolveEnvironments(settings, options, [path]),
            {},
        ])
    })
    .then(([RequestTemplate, file, env, params]: [NightwolfRequestTemplate, string, IKeyValue, IKeyValue]) => {
        const template = RequestTemplate.constructor(settings, options, file);
        const request = template.format({ env, params });
        return request.execute();
    });

// TODO: save response

