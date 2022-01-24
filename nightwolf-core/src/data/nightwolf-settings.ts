
/**
 * Represents persisted settings from Nightwolf application.
 */
export class DeprecatedNightwolfSettings {

    private requestRoot: string;
    private environmentRoot: string;
    private customTemplates: ICustomTemplate[];

    constructor() {
        // TODO: replace with peristed storage
        this.requestRoot = '~/.nightwolf/requests';
        this.environmentRoot = '~/.nightwolf/envs';
    }

    public setRequestRoot(requestRoot: string): DeprecatedNightwolfSettings {
        this.requestRoot = requestRoot;
        return this;
    }

    public getRequestRoot(): string {
        return this.requestRoot.replace('~', process.env.HOME);
    }

    public setEnvironmentRoot(environmentRoot: string): DeprecatedNightwolfSettings {
        this.environmentRoot = environmentRoot;
        return this;
    }

    public getEnvironmentRoot(): string {
        return this.environmentRoot.replace('~', process.env.HOME);
    }
}