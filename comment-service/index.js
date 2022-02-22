const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	const comments = commentsByPostId[req.params.id] || [];
	res.send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
	const { content } = req.body;

	const id = randomBytes(4).toString('hex');
	const comment = { id, content, status: 'pending' };
	const comments = commentsByPostId[req.params.id] || [];
	comments.push(comment);
	commentsByPostId[req.params.id] = comments;

	await axios.post('http://localhost:4005/events', {
		mcEvent: { 
			type: 'commentCreated',
			data: { ...comment, postId: req.params.id },
		},
	});  
	res.status(201).send(comments);
});

app.post('/events', async(req, res) => { 
	const { mcEvent } = req.body;
	const { type, data } = mcEvent;
	const {id, content, status, postId} = data;
	
	if (type === 'commentModerated') {
		 
		const comments = commentsByPostId[postId];     
		const comment = comments.find(comment => {
			return comment.id == id; 
		}) 
		
		comment.status = status;
		console.log('event received: ', commentsByPostId);

		// commentsByPostId[postId]
		
		await axios.post('http://localhost:4005/events', {
			mcEvent: { type: 'commentUpdated', data: { ...comment, postId} },
		});
	}
	res.send({});
});

app.listen(4001, () => {
	console.log('comment service running 4001'); 
});
