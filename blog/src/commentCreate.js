import axios from 'axios';
import React from 'react';
import { useState } from 'react';
 
function CommentCreate({postId}) { 

    const [comment, setComment] = useState('')
 
    const submitComment = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content:comment
        })

        setComment('')
    }
    const onChangeComment = (e) => {
        setComment(e.target.value)
    }
	return (
		<div>
			<form className='commentForm' onSubmit={submitComment}>
				<div>
                    <label>comment</label>
                    <input type="text" value={comment} onChange={onChangeComment} className="comment" />

                </div>
                <button type='submit'>submit</button>
			</form>
		</div>
	);
}

export default CommentCreate;
