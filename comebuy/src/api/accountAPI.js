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
        const res = DatabaseClient.get('/' + baseURL + '/' + id)
        return res.data;
    }
}
export default accountApi