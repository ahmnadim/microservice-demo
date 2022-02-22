const express = require('express');

const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const app = express(); 
  
app.use(bodyParser.json());
  
app.post('/events', async (req, res) => {    
	const { mcEvent } = req.body;
	const { type, data } = mcEvent; 
      
	if (type == 'commentCreated') {
		const { id, content, postId, status } = data;

		const commentStatus = content.includes('orange') ? 'rejected' : 'approved';
		await axios.post('http://localhost:4005/events', { 
			mcEvent: {
				type: 'commentModerated',
				data: {
					id, 
					content,
					postId,
					status: commentStatus,
				},
			},
		});
	}
	res.send({});
});

app.listen(4003, () => {
	console.log('moderation service running 4003');    
});
