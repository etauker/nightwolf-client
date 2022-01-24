// import { IncomingHttpHeaders } from "./key-value.interface";
import { IncomingHttpHeaders } from 'http';
import { IResponse } from './response.interface';


/**
 * A REST API response object.
 */
export class DeprecatedNightwolfResponse {

    private id: string;
    private code: number;
    private message: string;
    private headers: IncomingHttpHeaders;
    private body: string | {};

    constructor(
        // id: string,
        code: number,
        message: string,
        headers: IncomingHttpHeaders = {},
        body: string = '',
    ) {
        // this.id = id;
        this.code = code;
        this.message = message;
        this.headers = headers;
        this.body = body;
    }
    
    
    public setCode(code: number): DeprecatedNightwolfResponse {
        return this;
    }
    public setMessage(message: string): DeprecatedNightwolfResponse {
        this.message = message;
        return this;
    }

    public toString(): string {
        const lines = [];

        // status
        lines.push(`${this.code} ${this.message}`);
        lines.push('\n');

        // headers
        if (Object.keys(this.headers).length > 0) {
            Object.keys(this.headers).forEach(key => {
                lines.push(`${key}: ${this.headers[key]}`);
            });
            lines.push('\n');
        }

        // body
        if (this.body) {
            if (this.getContentType().includes('application/json')) {
                lines.push(JSON.stringify(this.body, null, 2));
            } else {
                lines.push(this.body);
            }
            lines.push('\n');
        }

        return lines.join('\n').replace('\n\n', '\n');
    }

    public toJson(): IResponse {
        let body = this.body;

        if (this.getContentType().includes('application/json')) {
            body = JSON.parse(this.body as string);
        }

        return {
            code: this.code,
            message: this.message,
            headers: this.headers,
            body: body,
        }
    }

    private getContentType(): string {
        return Object.keys(this.headers)
            .map(key => {
                if (key.toLowerCase() === 'content-type') {
                    return this.headers[key] as string;
                }
            })
            .filter(value => value)[0];
    }

}