import React, { useEffect, useState } from 'react'
import { PostForm, Loader } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/appwriteService'
import { useSelector } from 'react-redux'

function EditPost() {

  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const currentUserData = useSelector(state => state.auth.userData)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await appwriteService.getPost(slug);
        setPost(post);
      } catch (error) {
        if (currentUserData) {
          navigate('/');
        }
      }
    }
    fetchPost();
  }, [navigate, slug])

  return (
    <>
      {post ? (
        <div className="container mx-auto px-4 py-16">
          <PostForm post={post} />
        </div>
      ) : <Loader />}
    </>
  )
}

export default EditPost
