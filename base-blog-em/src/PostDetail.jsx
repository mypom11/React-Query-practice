import { useMutation, useQuery } from '@tanstack/react-query'
import { deletePost, fetchComments, updatePost } from './api'
import './PostDetail.css'

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
  })

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  })

  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  })

  if (isLoading) return <h3>is Loading</h3>
  if (isError)
    return (
      <h3>
        is Error <p>{error.toString()}</p>
      </h3>
    )

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>Error deleting the post</p>
      )}
      {deleteMutation.isPending && (
        <p style={{ color: 'purple' }}>deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: 'blue' }}>post has not deleted</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isError && (
        <p style={{ color: 'red' }}>Error updating the post</p>
      )}
      {updateMutation.isPending && (
        <p style={{ color: 'purple' }}>updating the post</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: 'blue' }}>post has not updated</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  )
}
