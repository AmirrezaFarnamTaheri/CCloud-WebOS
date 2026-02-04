import axios from 'axios';

const client = axios.create({
  baseURL: 'https://server-hi-speed-iran.info/api',
  timeout: 10000,
});

export default client;
