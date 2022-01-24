// import * as path from 'path';
// import { assert } from 'chai';
// import { TestServer } from "./server";
// import { Nightwolf } from '../nightwolf';
// import { NightwolfOptions } from '../data/nightwolf-options';

// describe('Nightwolf', () => {

//     const port = 1234;
//     const server = new TestServer();
//     const testDir = path.resolve(__filename, '..');

//     before(() => {
//         server.start(port);
//     });

//     after(() => {
//         server.stop();
//     });

//     describe('run', () => {
//         it('should run a GET request without parameters', () => {

//             const options = new NightwolfOptions()
//                 .setPrintRequest(false)
//                 .setPrintResponse(false)
//             ;

//             const requestPath = `${testDir}/requests/GET-cars.http`;
//             const environmentFiles = [];
//             const parameters = {};

//             return Nightwolf.run(options, requestPath, environmentFiles, parameters).then((res) => {
//                 const json = res.toJson();

//                 // status
//                 assert.equal(json.code, 200);
//                 assert.equal(json.message, 'OK');

//                 // headers
//                 const buffer = Buffer.from(JSON.stringify(json.body), 'utf8');
//                 assert.equal(JSON.stringify(json.body).length, Buffer.byteLength(buffer));

//                 // body
//                 const body = json.body as any;
//                 assert.equal(body.method, 'GET');
//                 assert.equal(body.collection, 'cars');
//             });
//         });
//     });
// });
