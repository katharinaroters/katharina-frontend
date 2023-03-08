import axios from "axios";
import apiUrl from "./apiUrl";


const fetcher = axios.create({
    baseURL: apiUrl
});

fetcher.defaults.headers.common['Authorization'] = `Bearer ${process.env.API_KEY}`;
fetcher.defaults.headers.common['content-type'] = 'application/json'

export default fetcher