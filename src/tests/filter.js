const { filterZipsFromOptions } = require('../filter');

const testData = require('./testData.json');

describe('filter tests', () => {
    test('no filters', async () => {
        const results = await filterZipsFromOptions(testData, {});
        expect(results.length).toBe(testData.length);
    });
    test('city filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            city: 'Amherst',
        });
        expect(results.length).toBe(1);
    });
    test('partial city filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            partial_city: 'Amher',
        });
        expect(results.length).toBe(1);
    });
    test('county filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            county: 'Hampden County',
        });
        expect(results.length).toBe(1);
    });
    test('zipcode filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            zip: '01001',
        });
        expect(results.length).toBe(1);
    });
    test('partial zipcode filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            partial_zip: '0100',
        });
        expect(results.length).toBe(2);
    });
    test('area code filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            area_code: '413',
        });
        expect(results.length).toBe(3);
    });
    test('multiple area code filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            area_code: '978',
        });
        expect(results.length).toBe(1);
    });
    test('max population filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            max_pop: '1500',
        });
        expect(results.length).toBe(1);
    });
    test('min population filter', async () => {
        const results = await filterZipsFromOptions(testData, {
            min_pop: '5000',
        });
        expect(results.length).toBe(2);
    });
    test('return distance', async () => {
        const results = await filterZipsFromOptions(testData, {
            lat: '43',
            long: '-75',
        });
        expect(results[0]).toHaveProperty('distance');
    });
    test('max distance', async () => {
        const results = await filterZipsFromOptions(testData, {
            lat: '43',
            long: '-75',
            max_distance: '135',
        });
        expect(results.length).toBe(2);
    });
});
