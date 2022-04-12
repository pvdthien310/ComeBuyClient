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
    },
    getProductWithID: async (id) => {
        const res = await DatabaseClient.get('/' + baseURL + `/${id}`)
        return res;
    },
    deleteAndUpdate_Feature: async (productID, newFeatures) => {
        const res = await DatabaseClient.post('/' + baseURL + "/DeleteAndUpdate/Feature",
            {
                productID: productID,
                featureID: newFeatures
            })
        return res
    },
    createNewProduct: async (newProduct) => {
        const res = await DatabaseClient.post('/' + baseURL,newProduct)
        return res
    },
    deleteByID: async (productID)=> {
        const res = await DatabaseClient.delete('/' + baseURL + `/${productID}`)
        return res;
    }
}
export default productAPI