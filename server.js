 // server.js
 const express = require('express')
 const bodyParser = require('body-parser')
 const Pusher = require('pusher')
 const cors = require('cors')
 require('dotenv').config()
 const shortId = require('shortid') 
 const dialogFlow = require('./dialogFlow')
 const app = express()
 app.use(cors())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
 const pusher = new Pusher({
    app_id: '644541',
    key: '1aa659f1f16d26cd87bc',
    secret: '3d6ffe04372375c6d464',
    cluster: 'ap2',
    encrypted: true
 })
 app.post('/message', async (req, res) => {
   // simulate actual db save with id and createdAt added
   const chat = {
     ...req.body,
     id: shortId.generate(),
     createdAt: new Date().toISOString()
   } 
   //update pusher listeners
   pusher.trigger('chat-bot', 'chat', chat)

   const message = chat.message;
   const response = await dialogFlow.send(message);
   // trigger this update to our pushers listeners
   pusher.trigger('chat-bot', 'chat', {
     message: `${response.data.result.fulfillment.speech}`,
     type : 'bot',
     createdAt : new Date().toISOString(),
     id: shortId.generate()
   })
   res.send(chat)
 })

 app.listen(process.env.PORT || 5000, () => console.log('Listening at 5000'))