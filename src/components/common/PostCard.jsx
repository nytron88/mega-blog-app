import React from 'react'
import { Link } from 'react-router-dom'
import parse from "html-react-parser"
import appwriteService from '../../appwrite/appwriteService'

function PostCard({ $id, content, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="h-full">
      <div
        key={$id}
        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col"
      >
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full aspect-video object-cover"
        />
        <div className="p-6 space-y-4 flex-grow">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-400 line-clamp-2">
              {parse(content)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard