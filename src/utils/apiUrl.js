import { dev } from '$app/env';
const apiUrl = dev ? 'http://127.0.0.1:1337/api' : 'https://katharina-api.herokuapp.com';
export default apiUrl;
