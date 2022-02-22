import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentCreate from './commentCreate';
import CommentList from './commentList';

function PostList() {
	const [posts, setPosts] = useState({});

	const fetchPosts = async () => {
		const posts = await axios.get('http://localhost:4002/posts');

		setPosts(posts.data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const renderPosts = Object.values(posts).map((post) => {
		return (
			<div className='card' key={post.id}>
				<div className='cardBody'>
					<h3 className='postTitle'>{post.title}</h3>
					<CommentCreate postId={post.id} />
					<CommentList comments={post.comments} />
				</div>
			</div>
		);
	});

	return <div className='postListWrapper'>{renderPosts}</div>;
}

export default PostList;
