import * as express from 'express';

export class TestServer {

    private port: number;
    private app: express.Server;

    constructor() {
        this.app = express();
    }
    
    public start(port: number = 8000) {
        // this.app.use(bodyParser.json());         // to support JSON-encoded bodies
        // this.app.use(cookieParser());
        // this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        //     extended: true
        // }));

        this.port = port;

        this.app.get('/:collection', this.handleGet.bind(this))
        this.app.get('/:collection/:id', this.handleGetItem.bind(this))
        this.app.post('/:collection', this.handlePost.bind(this))
        this.app.put('/:collection/:id', this.handlePutItem.bind(this))
        this.app.put('/:collection/:id', this.handlePatchItem.bind(this))
        this.app.delete('/:collection/:id', this.handleDeleteItem.bind(this))

        this.app.listen(port, () => {
            // console.log(`Test app listening at http://localhost:${port}`)
        })
    }

    public stop() {
        process.exit(0);
    }

    public getPort(): number { return this.port; }


    private handleGet(req, res) {
        res.status(200, 'received GET request on collection');
        res.json(this.handleFormatDebugResponse(req));
    }
    private handleGetItem(req, res) {
        res.status(200, 'received GET request on collection item');
        res.json(this.handleFormatDebugResponse(req));
    }
    private handlePost(req, res) {
        res.status(200, 'received POST request on collection');
        res.json(this.handleFormatDebugResponse(req));
    }
    private handlePutItem(req, res) {
        res.status(200, 'received PUT request on collection item');
        res.json(this.handleFormatDebugResponse(req));
    }
    private handlePatchItem(req, res) {
        res.status(200, 'received PATCH request on collection item');
        res.json(this.handleFormatDebugResponse(req));
    }
    private handleDeleteItem(req, res) {
        res.status(200, 'received DELETE request on collection item');
        res.json(this.handleFormatDebugResponse(req));
    }

    private handleFormatDebugResponse(req) {
        return {
            method: req.method,
            endpoint: req.url,
            collection: req.params.collection,
            id: req.params.id,
        }
    }
}
