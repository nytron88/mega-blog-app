import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import appwriteService from '../appwrite/appwriteService';
import parse from 'html-react-parser';
import { Loader } from '../components';
import { useSelector } from 'react-redux';

function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const currentUserData = useSelector((state) => state.auth.userData);

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

    fetchPost().finally(() => setLoading(false));

  }, [slug, navigate]);

  const handleDelete = () => {
    appwriteService.deletePost(post.$id).then((res) => {
      if (res) {
        appwriteService.deleteFile(post.featuredImage);
        navigate('/');
      }
    })
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto">
            {post.featuredImage && (
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full max-h-96 object-cover mb-8 rounded-lg"
              />
            )}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div
              className="prose text-white break-words whitespace-pre-wrap mb-8"
            >
              {parse(post.content)}
            </div>

            {/* Edit and Delete Buttons */}
            {currentUserData.$id === post.userId && ( // Replace `true` with your condition
              <div className="flex justify-end space-x-4">
                <Link to={`/edit/${post.$id}`}>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
