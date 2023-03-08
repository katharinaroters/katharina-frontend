import axios from "axios";
import apiUrl from "./apiUrl";
import qs from 'qs';

const fetcher = axios.create({
    baseURL: apiUrl
});

fetcher.defaults.headers.common['content-type'] = 'application/json'
fetcher.defaults.params = 'pagination[pageSize]=300'
export default fetcher