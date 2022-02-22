const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser') 
 
 
const app = express(); 
const events = []
app.use(bodyParser.json()); 
  
app.post('/events', async(req, res) => { 
    const {mcEvent} = req.body;

    events.push(mcEvent)
    await axios.post('http://localhost:4000/events', {mcEvent});  
    await axios.post('http://localhost:4001/events', {mcEvent});
    await axios.post('http://localhost:4002/events', {mcEvent});
    await axios.post('http://localhost:4003/events', {mcEvent});
    res.send({status: 'OK'})
})

app.get('/events', (req, res) => {  
    console.log("events: ", events);  
    res.send(events)
})

app.listen(4005, () => {
    console.log("event bus service running 4005");
})