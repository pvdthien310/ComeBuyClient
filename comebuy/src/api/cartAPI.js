import DatabaseClient from './baseAPI.js'

const baseURL = 'cart'

const cartApi = {
    getAll: async () => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },
}
export default cartApi