import DatabaseClient from './baseAPI.js';

const baseURL = 'chatbot';

const ChatbotApi = {
    getResponse: async (params) => {
        const res = DatabaseClient.post(`/${baseURL}/textQuery`, params).catch((err) => err.response);
        return res;
    },
};
export default ChatbotApi;
