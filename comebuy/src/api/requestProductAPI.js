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
    getReqFromMe: async (branchId) => {
        const res = DatabaseClient.get(`/${baseURL}/from/${branchId}`).catch((err) => err.response);
        return res;
    },
    getReqById: async (reqId) => {
        const res = DatabaseClient.get(`/${baseURL}/${reqId}`).catch((err) => err.response);
        return res;
    },
    updateReq: async (data) => {
        const res = DatabaseClient.put(`/${baseURL}/${data.requestId}`, data).catch((err) => err.response);
        return res;
    },
    updateReqStatus: async (data) => {
        const res = DatabaseClient.put(`/${baseURL}/update-prodReq-status/${data.type}`, data).catch(
            (err) => err.response,
        );
        return res;
    },
    doDistribution: async (data) => {
        const res = DatabaseClient.post(`/${baseURL}/distribution`, data).catch((err) => err.response);
        return res;
    },
    checkForDistAll: async (amount) => {
        const res = DatabaseClient.post(`/${baseURL}/checkForDistAll`, amount).catch((err) => err.message);
        return res;
    },
    doDistributionToAllBranch: async (data) => {
        const res = DatabaseClient.post(`${baseURL}/distributionToAllBranches`, data).catch((err) => err.response);
        return res;
    },
    dealSingleReq: async (data) => {
        const res = DatabaseClient.post(`${baseURL}/deal/single/${data.request.requestProductId}`, data).catch(
            (err) => err.response,
        );
        return res;
    },
    dealMultiReq: async (data) => {
        const res = DatabaseClient.post(`${baseURL}/deal/multi/${data.branchId}`, data).catch((err) => err.response);
        return res;
    },
    showMyFullySupplied: async (branchId) => {
        const res = DatabaseClient.get(`${baseURL}/getMyFullySupplied/${branchId}`).catch((err) => err.response);
        return res;
    },
};
export default requestProdApi;
