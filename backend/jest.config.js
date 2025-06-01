/** @type {import('jest').Config} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
            tsconfig: 'tsconfig.json'
        }],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(module-that-needs-to-be-transformed)/)'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/src/**/*.test.ts'],  // Only run tests in src directory
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js'
    ],
    rootDir: '.',
    testTimeout: 10000,
    maxWorkers: '50%',  // Use half of available CPU cores
    maxConcurrency: 1,  // Run tests serially to avoid connection issues
    verbose: true,      // Show more detailed output
    bail: 1            // Exit on first failure
}; 
