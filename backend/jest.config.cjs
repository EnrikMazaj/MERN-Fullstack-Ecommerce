module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: ['**/*.test.ts'],
}; 