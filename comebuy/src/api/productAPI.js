import DatabaseClient from './baseAPI.js'

const baseURL = 'product'

const productAPI = {
    getAll: async () => {
        const res = await DatabaseClient.get('/' + baseURL);
        return res.data;
    },
    edit: async (data) => {
        const res = await DatabaseClient.put('/' + baseURL + '/' + data.productID, data)
        return res
    }  
}
export default productAPI