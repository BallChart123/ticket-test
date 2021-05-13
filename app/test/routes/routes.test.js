const Controller = require('../../controllers/ticket');
require('../../routes/ticket');

const getSpy = jest.fn();

jest.doMock('express', () => {
    return {
        Router() {
            return {
                get: getSpy
            };
        }
    };
});

describe('should test router', () => {
    test('should test get POSTS', () => {
        expect(getSpy).toHaveBeenCalledTimes(0, '/ticket', Controller.getAll);
    });
});
