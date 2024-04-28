import { defineConfig } from '@playwright/test';

export default defineConfig({
    fullyParallel: true,
    globalTimeout: 1000000,
    projects: [
        {
            name: 'chromium',
            use: {
                bypassCSP: true,
                launchOptions: {
                    args: ['--disable-web-security'],
                },
            },
        },
    ],
    reporter: [['junit', { outputFile: 'results.xml' }]],
    retries: 0,
    testDir: './tests',
    timeout: 1000000,
    use: {
        baseURL: 'https://club-administration.qa.qubika.com/',
    },
    workers: 1,
});
