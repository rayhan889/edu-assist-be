export const preset = 'ts-jest/presets/js-with-ts';
export const testEnvironment = 'node';
export const transformIgnorePatterns = [
    'node_modules/(?!uuid)/'
];
export const testPathIgnorePatterns = ['<rootDir>/dist/'];
