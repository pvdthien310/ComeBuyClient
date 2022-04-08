import DatabaseClient from './baseAPI.js'

const baseURL = 'productImage'

const productImageAPI = {
    getProductImageWithID: async (id) => {
        const res = await DatabaseClient.get('/' + baseURL + `/${id}`)
        return res;
    },
    addMany: async (list) => {
        const res = await DatabaseClient.post('/' + baseURL + '/many', list)
        return res;
    },
    deleteImagesOfProduct: async (productID) => {
        const res = await DatabaseClient.delete('/' + baseURL + '/byproductid/' + productID)
        return res;
    }

}
export default productImageAPI