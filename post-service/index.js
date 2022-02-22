const express = require('express')
const bodyParser = require('body-parser') 
const {randomBytes} = require('crypto');   
const cors = require('cors'); 
const { default: axios } = require('axios'); 
const app = express();            
 
app.use(bodyParser.json()) 
app.use(cors())   
 
const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)  
})

app.post('/post', async(req, res) => {
    const {title} = req.body;
    const id = randomBytes(4).toString('hex')
    posts[id] = {id, title}
    await axios.post('http://localhost:4005/events', {mcEvent: {type: 'postCreated', data: {id, title}}})

    res.status(201).send(posts[id])

}) 

app.post('/events', (req,res) => {
    console.log("event received: ", req.body.mcEvent.type)
    res.send({})
})


app.listen(4000, () => {
    console.log('post service running 4000');
})