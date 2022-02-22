import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
	const [title, setTitle] = useState('');

	const submitForm = async (e) => {
		e.preventDefault();
		if (title == '') return alert('enter title.');

		const res = await axios.post('http://localhost:4000/post', {
			title,
		});
		setTitle('');
		console.log('res: ', res);
	};
	return (
		<div className='createPost'>
			<form className='form' onSubmit={submitForm}>
				<div className='input'>
					<label>Title</label>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='postTitle'
					/>
				</div>
				<button type='submit' className='submit'>
					submit
				</button>
			</form>
		</div>
	);
}

export default CreatePost;
