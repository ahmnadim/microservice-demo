function CommentList({comments}) {

   
    const renderComments = comments.map(comment => {
      let data;
      if(comment.status === 'pending'){
        data = 'This comment need moderation.'
      }
      if(comment.status === 'approved'){
        data = comment.content
      }
      if(comment.status === 'rejected'){
        data = 'This comment is rejected.'
      }

        return <li key={comment.id}>{data}</li>
    })
  return (
    <ul>{renderComments}</ul>
  )
}

export default CommentList