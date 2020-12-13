const { validateOptions } = require('../validate');

describe('validate tests', () => {
    test('throws error for lat long', () => {
        const testThrower = () => {
            validateOptions({ lat: '34' });
        };
        expect(testThrower).toThrow();
    });
    test('doesnt throw error otherwise', () => {
        expect(() => {
            validateOptions({ lat: '34', long: '-75' });
        }).not.toThrow();
    });
});
