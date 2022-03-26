import DatabaseClient from './baseAPI.js'

const baseURL = 'account'

const accountApi = {
    getAccountbyEmail: async (email) => {
        const res = await DatabaseClient.get('/' + baseURL + '/email/' +  email);
        return res.data;
    },
}
export default accountApi