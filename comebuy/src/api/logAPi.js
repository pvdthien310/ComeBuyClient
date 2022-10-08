import DatabaseClient from './baseAPI.js';

const baseURL = 'log';

const logApi = {
    getLog: async (id, offset) => {
        let res;
        if (id === undefined) {
            res = await DatabaseClient.get(`/${baseURL}/admin/${offset}`).catch((err) => err.response);
        } else {
            res = await DatabaseClient.get(`/${baseURL}/${id}/${offset}`).catch((err) => err.response);
        }
        return res;
    },
};
export default logApi;
