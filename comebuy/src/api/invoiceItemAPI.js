import DatabaseClient from './baseAPI.js';

const baseURL = 'invoiceItem';

const invoiceItemAPI = {
    addInvoiceItem: async (invoiceItem) => {
        const res = await DatabaseClient.post(`/${baseURL}`, invoiceItem).catch((err) => err.response);
        return res;
    },
};
export default invoiceItemAPI;
