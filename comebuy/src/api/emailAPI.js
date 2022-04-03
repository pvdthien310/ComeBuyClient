import DatabaseClient from './baseAPI.js'

const baseURL = 'email'

const emailApi = {
    sendEmail: async (dataForSendMail) => {
        const res = await DatabaseClient.post(baseURL + '/verify', dataForSendMail)
        return res
    }
}
export default emailApi
