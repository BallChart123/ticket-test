const ticket = require('../../controllers/ticket');
const model = require('../../models/ticket');
jest.mock('../../models/ticket');
describe('should test controller', () => {
    test('should return success when call  getAll ', async () => {
        let mockResult = [
            {
                id: 1,
                name: 'test_stub'
            }
        ];
        model.findAll().mockImplementation(() => {
            return mockResult;
        });
        const result = await ticket.getAll();
        console.log(`result ::`, result);
        expect(result.status).toBe(200);
    });
});
