import DatabaseClient from './baseAPI.js';

const baseURL = 'branch';

const branchApi = {
    getAll: async () => {
        const res = DatabaseClient.get(`/${baseURL}`).catch((err) => err.response);
        return res;
    },
    getBranchWithID: async (id) => {
        const res = DatabaseClient.get(`/${baseURL}/${id}`).catch((err) => err.response);
        return res;
    },
    getBranchAndTotalStock: async () => {
        const res = DatabaseClient.get(`${baseURL}/getAllBranch/getTotalStock`).catch((err) => err.response);
        return res;
    },
};
export default branchApi;
