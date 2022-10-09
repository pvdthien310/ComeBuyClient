import DatabaseClient from './baseAPI.js';

const baseURL = 'requestProduct';

const requestProdApi = {
    createReq: async (data) => {
        const res = DatabaseClient.post(`/${baseURL}/makeReq`, data).catch((err) => err.response);
        return res;
    },
    createReqItem: (data) => {
        const res = DatabaseClient.post(`/${baseURL}/makeReqItem`, data).catch((err) => err.response);
        return res;
    },
    getReqToMine: async (branchId) => {
        const res = DatabaseClient.get(`/${baseURL}/to/${branchId}`).catch((err) => err.response);
        return res;
    },
};
export default requestProdApi;
