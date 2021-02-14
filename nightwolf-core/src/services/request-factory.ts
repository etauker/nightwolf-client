import { NightwolfRequest } from "../data/nightwolf-request";
import { IKeyValue } from '../data/key-value.interface';


/**
 * A factory service used for creating NightwolfRequest objects.
 * @hideconstructor
 */
export class RequestFactory {

    /**
     * Parses lines of a json file into a NightwolfRequest object.
     * @param {string[]} lines lines of a json file to parse
     */
    public static fromJsonFile(lines: string[]): NightwolfRequest {
        const [envReplaced, envObject] = RequestFactory._collectPlaceholders('env', lines);
        const [paramsReplaced, paramObject] = RequestFactory._collectPlaceholders('param', envReplaced);

        const json = JSON.parse(paramsReplaced.join(' ').replace(/\s/g, ' '));
        const body = typeof json.body === 'string'
            ? json.body
            : JSON.stringify(json.body)
        ;

        return new NightwolfRequest(json.method, json.url, json.headers, body)
            .setParameterTemplateKeys(paramObject)
            .setEnvironmentTemplateKeys(envObject)
        ;
    }

    /**
     * Parses lines of a http file into a NightwolfRequest object.
     * @param {string[]} lines lines of a http file to parse
     */
    public static fromHttpFile(lines: string[]): NightwolfRequest {
        let section = 1;

        let method = null;
        let url = null;
        let body = null;
        let headers = {};

        const [envReplaced, envObject] = RequestFactory._collectPlaceholders('env', lines);
        const [paramsReplaced, paramObject] = RequestFactory._collectPlaceholders('param', envReplaced);
        
        paramsReplaced.forEach(line => {            
            line = line.replace(/\s/g, ' ').trim();

            if (!line) {
                section ++;
            } else if (section === 1) {
                const parts = line.split(' ');
                method = parts[0];
                url = parts[1];
            } else if (section === 2) {
                const parts = line.split(': ');
                const key = parts[0];
                const value = parts[1];
                headers[key] = value;
            } else if (section === 3) {
                body = `${body} ${line}`.replace(/\s/g, ' ');
            }
        });

        return new NightwolfRequest(method, url, headers, body)
            .setParameterTemplateKeys(paramObject)
            .setEnvironmentTemplateKeys(envObject)
        ;
    }


    public static substitute(request: NightwolfRequest, environment: IKeyValue, parameters: IKeyValue): NightwolfRequest {
        let str = request.toString();
        const missing = [];

        request.getEnvironmentTemplateKeys().forEach(key => {
            const value = `${ environment[key] }`;
            const regex = new RegExp(`\\\${env.${ key }}`, 'g');

            if (regex.test(str)) {
                str = str.replace(regex, value);
            } else {
                missing.push('env.' + key);
            }
        });

        request.getParameterTemplateKeys().forEach(key => {
            const value = `${ parameters[key] }`;
            const regex = new RegExp(`\\\${param.${ key }}`, 'g');

            if (regex.test(str)) {
                str = str.replace(regex, value);
            } else {
                missing.push('param.' + key);
            }
        });

        if (missing.length > 0) {
            const message = 'Missing values for the following template strings: ' 
                + '\n    --'
                + missing.join('\n    --')
            throw new Error(message); 
        }

        return RequestFactory.fromHttpFile(str.split('\n'))
    }

    /**
     * Collects a list of placeholders for a given identifier and removes
     * all whitespace from inside the template.
     * 
     * @todo: allow replacing more than one template per line. 
     */
    private static _collectPlaceholders(identifier: string, lines: string[]): [string[], string[]] {
        const regex = new RegExp(`\\$\\{\\s${identifier}\\.(?<key>.*)\\s\\}`);
        const placeholders = [];

        const mapped = lines.map(line => {
            if (regex.test(line)) {
                const match = line.match(regex);
                const fullMatch = match[0];
                const key = match.groups.key;
                placeholders.push(key);
                return line.replace(fullMatch, `\${${identifier}.${key}}`);
            }
            return line;
        });

        return [mapped, placeholders];
    }

}