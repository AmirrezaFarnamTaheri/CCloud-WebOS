import axios from 'axios';

const client = axios.create({
  baseURL: 'https://server-hi-speed-iran.info/api',
  timeout: 10000,
});

export const setApiBaseUrl = (baseURL) => {
  if (typeof baseURL === 'string' && baseURL.trim()) {
    client.defaults.baseURL = baseURL.trim();
  }
};

export default client;
