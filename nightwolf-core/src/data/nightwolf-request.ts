// import { OutgoingHttpHeaders } from "./key-value.interface";
import { OutgoingHttpHeaders } from 'http';
import { IRequest } from './request.interface';


/**
 * A REST API request object.
 */
export class NightwolfRequest {

    private method: string;
    private url: string;
    private body: string;
    private headers: OutgoingHttpHeaders;

    private parameterTemplate: string[];
    private environmentTemplate: string[];

    constructor(method: string, url: string, headers: OutgoingHttpHeaders = {}, body: string = '') {
        this.method = method.toUpperCase();
        this.url = url;
        this.setHeaders(headers);
        this.setBody(body);
    }


    public setParameterTemplateKeys(parameterTemplate: string[]): NightwolfRequest {
        this.parameterTemplate = parameterTemplate;
        return this;
    }
    public setEnvironmentTemplateKeys(environmentTemplate: string[]): NightwolfRequest {
        this.environmentTemplate = environmentTemplate;
        return this;
    }
    // if a content length is already set, do not overwrite
    public setBody(body: string= ''): NightwolfRequest {
        const buffer = Buffer.from(body || '', 'utf-8');
        if (!this._isContentLengthSet()) {
            this.headers['Content-Length'] = `${ Buffer.byteLength(buffer) }`;            
        }
        return this;
    }
    public setHeaders(headers: OutgoingHttpHeaders = {}): NightwolfRequest {
        this.headers = JSON.parse(JSON.stringify(headers));
        return this;
    }


    public getEnvironmentTemplateKeys(): string[] { return this.environmentTemplate; }
    public getParameterTemplateKeys(): string[] { return this.parameterTemplate; }
    public getMethod(): string { return this.method; }
    public getUrl(): string { return this.url; }
    public getBody(): string { return this.body; }
    public getHeaders(): OutgoingHttpHeaders { return this.headers; }


    public toString(): string {
        return [
            this.formatStatusSection(this.method, this.url),
            this.formatHeaderSection(this.headers),
            this.formatBodySection(this.body),
        ].join('\n\n');
    }

    public toJson(): IRequest {
        return {
            method: this.method,
            url: this.url,
            body: this.body,
            headers: this.headers,
        }
    }


    private formatStatusSection(method: string, url: string): string {
        return `${method} ${url}`;
    }

    private formatHeaderSection(headers: OutgoingHttpHeaders): string {
        return Object.keys(headers)
            .map(key => `${key}: ${headers[key]}`)
            .join('\n')
        || '';
    }

    private formatBodySection(body: string): string {
        return body;
    }



    private _isContentLengthSet(): boolean {
        Object.keys(this.headers).forEach(key => {
            if (key.toLowerCase() === 'content-length') {
                return true;
            }
        });
        return false;
    }

}