const db = require('../../models/ticket');

const controllers = require('../../controllers/ticket');
let request = {};

describe('test controller', () => {
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
        expect(result.statusCode).toEqual(200);
        expect(result.body.name).toEqual(expectedResult.name);
        expect(result.body.description).toEqual(expectedResult.description);
        expect(result.body.status).toEqual(expectedResult.status);
        expect(result.body.contact_information).toEqual(
            expectedResult.contact_information
        );
    });
    test('should fail when create not success', async () => {
        const request = {};
        const expectedResult = {
            statusCode: 500,
            message: 'Fail to Connect'
        };
        request.body = {
            name: 'test',
            description: 'create ticket',
            status: 'pending',
            information: '1234'
        };
        let errorBody = {
            statusCode: 500,
            message: 'Fail to Connect'
        };
        controllers.createOne = jest.fn().mockRejectedValueOnce(errorBody);

        let result;
        try {
            await controllers.createOne(request);
        } catch (error) {
            result = error;
            expect(result.statusCode).toEqual(expectedResult.statusCode);
            expect(result.message).toEqual(expectedResult.message);
        }
    });
    test('should succeed when get one', async () => {
        const request = {
            params: {
                id: 1
            }
        };
        let response;
        const result = await controllers.getOne(request, response);
        const expectedResult = {
            id: 1,
            name: 'test_mock',
            description: 'create ticket',
            status: 'pending',
            contact_information: 'mock_information',
            created_by: 'test'
        };
        expect(result.statusCode).toEqual(200);
        expect(result.body.name).toEqual(expectedResult.name);
        expect(result.body.description).toEqual(expectedResult.description);
        expect(result.body.status).toEqual(expectedResult.status);
        expect(result.body.contact_information).toEqual(
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
        expect(result.statusCode).toEqual(200);
        expect(result.body[0].name).toEqual(expectedResult.name);
        expect(result.body[0].description).toEqual(expectedResult.description);
        expect(result.body[0].status).toEqual(expectedResult.status);
        expect(result.body[0].contact_information).toEqual(
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
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual('Update Success !');
    });
    test('should succeed when delete', async () => {
        let response = {
            status: 200
        };
        const request = {
            params: {
                id: 1
            }
        };

        const result = await controllers.deleteOne(request, response);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual('Delete Success !');
    });
    afterAll(async () => {
        await thisDb.sequelize.close();
    });
});
