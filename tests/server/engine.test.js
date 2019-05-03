import server from '../../src/server';

let appTest;

describe('engine test', () => {
    beforeAll(done => {
        server(params).then(app => {
            appTest = app;
            done()
        })
    })



    afterAll((done) => {
        setTimeout( async() => {
            appTest.stop(done)
        }, 1000)
    })
})
