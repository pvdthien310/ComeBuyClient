import DatabaseClient from './baseAPI.js'

const baseURL = 'invoice'

const invoiceAPI = {
    getAll: async () => {
        const res = await DatabaseClient.get('/' + baseURL);
        return res.data;
    },
    updateInvoice: async (invoiceID, data) => {
        const res = await DatabaseClient.put('/' + baseURL + '/' + invoiceID, data)
        return res.data;
    }
}
export default invoiceAPI