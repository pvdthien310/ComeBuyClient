import DatabaseClient from './baseAPI.js';

const baseURL = 'coupon';

const couponAPI = {
    createCoupon: async (params) => {
        const res = await DatabaseClient.post(`/${baseURL}/createCoupon`, params).catch((err) => err.response);
        return res;
    },
};
export default couponAPI;
