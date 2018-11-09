const axios = require('axios')
    const accessToken = 'f65b661b55374ee9b233a52ba7b2fb71'
    const baseURL = 'https://api.dialogflow.com/v1/query?v=20150910'
    module.exports = {
      send (message) {
        const data = {
          query: message,
          lang: 'en',
          sessionId: '123456789!@#$%'
        }
        return axios.post(baseURL, data, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
      }
    }