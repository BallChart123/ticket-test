const ticket = require('../../controllers/ticket');
jest.mock('../../models/ticket');
describe('should test controller', () => {
    test('should return success when call  getAll ', async () => {
        const result = await ticket.getAll();
        console.log(`result ::`, result);
        expect(result.status).toBe(200);
    });
});
