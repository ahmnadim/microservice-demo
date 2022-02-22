const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())

app.use(cors())
 
const posts = {};

const handleEvent = (mcEvent) => {
    const {type, data} = mcEvent;
    const {id, content, postId, status,title} = data;

    if(type == 'postCreated'){
        posts[id] = {id, title, comments: []} 
    } 
    if(type == 'commentCreated'){  
         const post = posts[postId]  
        post.comments.push({id, content, status})   
    } 
    if(type == 'commentUpdated'){
        const post = posts[postId]

		const comment = posts[postId].comments.find(comment => {
			return comment.id == id;
		})

		comment.status = status;
		comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const {mcEvent} = req.body;   

    handleEvent(mcEvent);
    res.send({})
} )


app.listen(4002, async() => {
    console.log('query service running 4002');
    const res = await axios.get('http://localhost:4005/events')
    for(let events of res.data){  
        console.log("processing event: ", events.type);  
        handleEvent(events)
    }
})