import React, { useEffect, useState } from 'react'
import { PostCard, Loader } from '../components'
import appwriteService from '../appwrite/appwriteService'

function AllPosts() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts().then(posts => {
      if (posts) {
        setPosts(posts.documents)
        setLoading(false)
      }
    })
  })

  if (loading) return <Loader />

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard
            key={post.$id}
            {...post}
          />
        ))}
      </div>
    </div>
  )
}

export default AllPosts
