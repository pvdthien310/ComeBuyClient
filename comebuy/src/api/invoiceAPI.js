import DatabaseClient from './baseAPI.js'

const baseURL = 'invoice'

const invoiceAPI = {
    getAll: async () => {
        const res = await DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res.data;
    },
    updateInvoice: async (data) => {
        const res = await DatabaseClient.put('/' + baseURL + '/' + data.invoiceID, data)
            .catch(err => { return err.response })
        return res.data;
    }
}
export default invoiceAPI