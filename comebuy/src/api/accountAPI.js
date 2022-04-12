import DatabaseClient from './baseAPI.js'

const baseURL = 'account'

const accountApi = {
    getAccountbyEmail: async (email) => {
        const res = await DatabaseClient.get('/' + baseURL + '/email/' + email);
        return res.data;
    },
    register: async (dataForReg) => {
        const res = DatabaseClient.post('/' + baseURL, dataForReg)
        return res;
    },
    getAccountWithID: async (id) => {
        const res = DatabaseClient.get('/' + baseURL + `/${id}`)
        return res;
    },
    getAll: async () => {
        const res = DatabaseClient.get('/' + baseURL)
        return res;
    },
    updateAccount: async (data) => {
        const res = DatabaseClient.put("/" + baseURL + "/" + data.userID, data)
        return res
    }
}
export default accountApi