import DatabaseClient from './baseAPI.js'

const baseURL = 'feature'

const featureAPI = {
    getAll: async () => {
        const res = await DatabaseClient.get('/' + baseURL);
        return res.data;
    },
    edit: async (data) => {
        const res = await DatabaseClient.put('/' + baseURL + '/' + data.featureID, data)
        return res
    }  
}
export default featureAPI