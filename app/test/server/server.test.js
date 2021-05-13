const router = require('../../routes/ticket');

const useSpy = jest.fn();
const listenSpy = jest.fn();

jest.doMock('express', () => {
    return () => ({
        use: useSpy,
        listen: listenSpy
    });
});

describe('should test server configuration', () => {
    test('use router', () => {
        require('../../index');
        expect(useSpy).toHaveBeenCalledTimes(4);
    });

    test('should call listen fn', () => {
        require('../../index');
        expect(listenSpy).toHaveBeenCalled();
    });
});
