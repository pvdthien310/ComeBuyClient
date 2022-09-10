import DatabaseClient from './baseAPI.js'

const baseURL = 'banner'

const bannerApi = {
    getAll: async () => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },
    createNewBanner: async (id) => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    }
}
export default bannerApi