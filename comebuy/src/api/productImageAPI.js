import DatabaseClient from './baseAPI.js'

const baseURL = 'productImage'

const productImageAPI = {
    getProductImageWithID: async (id) => {
        const res = DatabaseClient.get('/' + baseURL + `/${id}`)
        return res;
    }
}
export default productImageAPI