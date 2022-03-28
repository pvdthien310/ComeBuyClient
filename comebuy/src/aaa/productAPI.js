import DatabaseClient from './baseAPI.js'

const baseURL = 'product'

const productAPI = {
    getAll: async () => {
        const res = await DatabaseClient.get('/' + baseURL);
        return res.data;
    },
   
}
export default productAPI