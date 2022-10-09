import DatabaseClient from './baseAPI.js';

const baseURL = 'stock';

const stockApi = {
    getAllStockByBranch: async (branchID) => {
        const res = DatabaseClient.get(`/${baseURL}/FindByBranch/${branchID}`).catch((err) => err.response);
        return res;
    },
    createNewStock: async (data) => {
        const res = DatabaseClient.post(`/${baseURL}`, data).catch((err) => err.response);
        return res;
    },
    deleteStock: async (stockID) => {
        const res = DatabaseClient.delete(`/${baseURL}/${stockID}`).catch((err) => err.response);
        return res;
    },
    updateStock: async (data) => {
        const res = DatabaseClient.put(`/${baseURL}/${data.id}`, data).catch((err) => err.response);
        return res;
    },
    dealRemain: async (data) => {
        const res = DatabaseClient.put(`/${baseURL}/dealRemain`, data).catch((err) => err.response);
        return res;
    },
    getStockAndTotalRemain: async (userId) => {
        const res = DatabaseClient.get(`/${baseURL}/getCurrStock/${userId}`).catch((err) => err.response);
        return res;
    },
    getProdInStockByBranchId: async (branchId) => {
        const res = DatabaseClient.get(`/${baseURL}/getProdInStockBy/${branchId}`).catch((err) => err.response);
        return res;
    },
};
export default stockApi;
