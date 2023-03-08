import { dev } from '$app/env';
const apiUrl = dev ? 'http://127.0.0.1:1337/api' : 'https://katharinaroters.herokuapp.com/api';
export default apiUrl;
