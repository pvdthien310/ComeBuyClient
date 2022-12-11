import DatabaseClient from './baseAPI.js';

const baseURL = 'coupon';

const couponAPI = {
    createCoupon: async (params) => {
        const res = await DatabaseClient.post(`/${baseURL}/createCoupon`, params).catch((err) => err.response);
        return res;
    },
    getCouponData: async (params) => {
        const res = await DatabaseClient.post(`/${baseURL}/getCoupon`, params).catch((err) => err.response);
        return res;
    },
    updateStatusCoupon: async (params) => {
        const res = await DatabaseClient.put(`/${baseURL}/updateStatus/${params.couponId}`, params).catch(
            (err) => err.response,
        );
        return res;
    },
    deleteOneCoupon: async (id) => {
        const res = await DatabaseClient.post(`/${baseURL}/${id}`).catch((err) => err.response);
        return res;
    },
    crawlCoupon: async (params) => {
        const res = await DatabaseClient.post(`/${baseURL}/crawlCoupon`, params).catch((err) => err.response);
        return res;
    },
};
export default couponAPI;
