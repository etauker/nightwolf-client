import { NightwolfOptions } from "../data/nightwolf-options.interface";
import { NightwolfSettings } from "../data/nightwolf-settings.interface";
import { JsonRequestTemplate } from "../template/parsers/JsonRequestTemplate";

export class ExtensionService {
    public static loadTemplate(
        settings: NightwolfSettings,
        options: NightwolfOptions,
        path: string,
        filename: string
    ): JsonRequestTemplate {

        // TODO: load based on filename extension
        return JsonRequestTemplate.prototype;
    }
}