export const api = {
    url: 'https://joinus.kalinowski.one/api/',
    version: 'v1'
};

export const apiUrl = (version?: string) => api.url + (version || api.version);
export const createEndpoint = (tag: string) => (endpoint: string) =>
    `${tag}${endpoint ? `/${endpoint}` : ''}`;
