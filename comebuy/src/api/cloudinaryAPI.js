import DatabaseClient from './baseAPI.js'

const baseURL = 'cloudinary'

const cloudinaryApi = {
    uploadImages: async (data) => {
        const res = await DatabaseClient.post('/' + baseURL, data);
        return res;
    },
}
export default cloudinaryApi