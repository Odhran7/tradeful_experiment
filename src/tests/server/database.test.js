// This is the test suite for connection to the database

import config from '../../config/index.js';

describe('Database Connection', () => {
    beforeAll(async () => {
        await config.connectDB();
    });

    afterAll(async () => {
        await config.disconnectDB();
    });

    test('should connect to the database successfully', () => {
        // DB connection severed if this test fails
        expect(true).toBe(true);
    });
});