import DatabaseClient from './baseAPI.js'

const baseURL = 'branch'

const branchApi = {
    getAll: async () => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },
}
export default branchApi