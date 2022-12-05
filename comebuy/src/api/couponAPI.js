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
};
export default couponAPI;
