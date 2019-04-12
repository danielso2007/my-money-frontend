const url = process.env.URL_BACKEND ? process.env.URL_BACKEND : 'http://localhost:3003';
export default {
    API_URL: `${url}/api`,
    OAPI_URL: `${url}/oapi`,
};