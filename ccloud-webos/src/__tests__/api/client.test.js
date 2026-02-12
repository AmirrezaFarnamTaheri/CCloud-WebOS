import client, { setApiBaseUrl } from '../../api/client';

jest.mock('axios', () => {
    const mAxios = {
        defaults: {
            baseURL: 'https://server-hi-speed-iran.info/api',
            timeout: 10000
        },
        get: jest.fn(),
        post: jest.fn(),
    };
    return {
        create: jest.fn(() => mAxios),
        defaults: {
            baseURL: 'https://server-hi-speed-iran.info/api',
            timeout: 10000
        }
    };
});

describe('API Client', () => {
    it('should create axios instance with default config', () => {
        // Since we mocked axios.create to return mAxios, client is mAxios
        expect(client.defaults.timeout).toBe(10000);
        expect(client.defaults.baseURL).toBe('https://server-hi-speed-iran.info/api');
    });

    it('should update base URL', () => {
        const newUrl = 'https://new-api.example.com';
        setApiBaseUrl(newUrl);
        expect(client.defaults.baseURL).toBe(newUrl);
    });

    it('should not update base URL if invalid', () => {
        const originalUrl = client.defaults.baseURL;
        setApiBaseUrl(null);
        expect(client.defaults.baseURL).toBe(originalUrl);
        setApiBaseUrl('');
        expect(client.defaults.baseURL).toBe(originalUrl);
    });
});
