import DatabaseClient from './baseAPI.js';

const baseURL = 'account';

const accountApi = {
    getAccountbyEmail: async (email) => {
        const res = await DatabaseClient.get(`/${baseURL}/email/${email}`).catch((err) => err.response);
        return res.data;
    },
    register: async (dataForReg) => {
        const res = await DatabaseClient.post(`/${baseURL}`, dataForReg).catch((err) => err.response);
        return res;
    },
    getAccountWithID: async (id) => {
        const res = await DatabaseClient.get(`/${baseURL}/${id}`).catch((err) => err.response);
        return res;
    },
    getAll: async () => {
        const res = await DatabaseClient.get(`/${baseURL}`).catch((err) => err.response);
        return res;
    },
    updateAccount: async (data) => {
        const res = await DatabaseClient.put(`/${baseURL}/${data.userID}`, data).catch((err) => err.response);
        return res;
    },
    updatePasswordForAccount: async (newPassword, userID) => {
        const res = await DatabaseClient.put(`/${baseURL}/updatePassword/${userID}`, { password: newPassword }).catch(
            (err) => err.response,
        );
        return res;
    },
    deleteAccount: async (accountID) => {
        const res = await DatabaseClient.delete(`/${baseURL}/${accountID}`).catch((err) => err.response);
        return res;
    },
    createNewAccount: async (data) => {
        const res = await DatabaseClient.post(`/${baseURL}`, data).catch((err) => err.response);
        return res;
    },
};
export default accountApi;
