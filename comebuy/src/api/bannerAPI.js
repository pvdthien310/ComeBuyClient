import DatabaseClient from './baseAPI.js';

const baseURL = 'banner';

const bannerApi = {
    getAll: async () => {
        const res = await DatabaseClient.get(`/${baseURL}`).catch((err) => err.response);
        return res;
    },
    createNewBanner: async (data) => {
        const res = await DatabaseClient.post(`/${baseURL}`, data).catch((err) => err.response);
        return res;
    },
    deleteBannerById: async (id) => {
        const res = await DatabaseClient.delete(`/${baseURL}/${id}`, id).catch((err) => err.message);
        return res;
    },
};
export default bannerApi;
