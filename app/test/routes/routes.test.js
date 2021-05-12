const Controller = require('../../controllers/ticket');

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
    require('../../routes/ticket');
    test('should test getAll GET', () => {
        expect(getSpy).toHaveBeenCalledWith(1, '/ticket', Controller.getAll);
    });
});
