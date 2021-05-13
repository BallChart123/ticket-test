const db = require('../../models/ticket');

const controllers = require('../../controllers/ticket');
let request = {};

describe('test the JWT authorization middleware', () => {
    // Set the db object to a variable which can be accessed throughout the whole test file
    let thisDb = db;

    // Before any tests run, clear the DB and run migrations with Sequelize sync()
    beforeAll(async () => {
        await thisDb.sequelize.sync({ force: true });
    });
    beforeEach(async () => {
        request.body = {
            name: 'test_mock',
            description: 'create ticket',
            status: 'pending',
            information: 'mock_information'
        };
        await controllers.createOne(request);
    });
    test('should succeed when create', async () => {
        const request = {};
        request.body = {
            name: 'test',
            description: 'create ticket',
            status: 'pending',
            information: '1234'
        };
        const result = await controllers.createOne(request);
        const expectedResult = {
            id: 1,
            name: 'test',
            description: 'create ticket',
            status: 'pending',
            contact_information: '1234',
            created_by: 'test'
        };
        const body = JSON.parse(result.body);
        expect(result.statusCode).toEqual(200);
        expect(body.name).toEqual(expectedResult.name);
        expect(body.description).toEqual(expectedResult.description);
        expect(body.status).toEqual(expectedResult.status);
        expect(body.contact_information).toEqual(
            expectedResult.contact_information
        );
    });
    test('should succeed when get all', async () => {
        const result = await controllers.getAll();
        const expectedResult = {
            id: 1,
            name: 'test_mock',
            description: 'create ticket',
            status: 'pending',
            contact_information: 'mock_information',
            created_by: 'test'
        };
        const body = JSON.parse(result.body);
        expect(result.statusCode).toEqual(200);
        expect(body[0].name).toEqual(expectedResult.name);
        expect(body[0].description).toEqual(expectedResult.description);
        expect(body[0].status).toEqual(expectedResult.status);
        expect(body[0].contact_information).toEqual(
            expectedResult.contact_information
        );
    });
    test('should succeed when update', async () => {
        const request = {
            params: {
                id: 1
            },
            body: {
                name: 'test1',
                description: 'create ticket2',
                status: 'approved',
                information: 'mock_55'
            }
        };

        const result = await controllers.updateOne(request);
        const body = JSON.parse(result.body);
        expect(result.statusCode).toEqual(200);
        expect(body[0]).toEqual(1);
    });
    afterAll(async () => {
        await thisDb.sequelize.close();
    });
});
