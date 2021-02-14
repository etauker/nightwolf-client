/**
 * A class representing options passed to Nightwolf 
 * client for a specific request.
 */
export class NightwolfOptions {


    // properties
    private printRequest: boolean = false;
    private printResponse: boolean = false;


    // getters
    public getPrintRequest(): boolean { return this.printRequest; }
    public getPrintResponse(): boolean { return this.printResponse; }


    // setters
    public setPrintRequest(printRequest: boolean): NightwolfOptions {
        this.printRequest = printRequest;
        return this;
    }
    public setPrintResponse(printResponse: boolean): NightwolfOptions {
        this.printResponse = printResponse;
        return this;
    }
}