import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Loader, PostCard } from '../components';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/appwriteService';
import { Query } from 'appwrite';

function Home() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const currentUserData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (authStatus) {
        const response = await appwriteService.getPosts([Query.equal("userId", currentUserData.$id)]);
        setPosts(response.documents);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [authStatus]);

  const previewArticles = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt: "Explore the latest trends in web development, from AI integration to advanced frontend frameworks...",
      imageUrl: "https://cloud.appwrite.io/v1/storage/buckets/6742260b0015a29cb92d/files/67441c2e00340f987719/view?project=67343822001d8de0944e&mode=admin"
    },
    {
      id: 2,
      title: "Mastering Modern JavaScript: A Complete Guide",
      excerpt: "Deep dive into advanced JavaScript concepts, best practices, and performance optimization techniques...",
      imageUrl: "https://cloud.appwrite.io/v1/storage/buckets/6742260b0015a29cb92d/files/67441ea200273d2bb80d/view?project=67343822001d8de0944e&mode=admin"
    },
    {
      id: 3,
      title: "Building Scalable Applications with React",
      excerpt: "Learn how to architect large-scale React applications with proven patterns and practices...",
      imageUrl: "https://cloud.appwrite.io/v1/storage/buckets/6742260b0015a29cb92d/files/67441f3e0028e46670b9/view?project=67343822001d8de0944e&mode=admin"
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {authStatus ? (
            <div className="container mx-auto px-4 py-16">
              {/* Post Count Banner */}
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white">
                  {posts.length === 0 ? (
                    <div className="bg-gray-800/50 mt-16">
                      <div className="container mx-auto px-4 py-16">
                        <div className="text-center max-w-2xl mx-auto space-y-6">
                          <h2 className="text-3xl font-bold text-white">Ready to start writing?</h2>
                          <p className="text-gray-300">
                            Join our community and share your stories with readers around the world.
                          </p>
                          <Link to="/add-post" className="inline-block">
                            <Button className="cursor-pointer">
                              <span className="px-8">Start Writing</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : <>{`You have ${posts.length} ${posts.length === 1 ? "post" : "posts"}`}</>}
                </h2>
              </div>

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.$id} {...post} />
                ))}
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-gray-900">
              {/* Hero Section */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-blue-600/20 pointer-events-none" />
                <div className="relative container mx-auto px-4 py-20 z-10">
                  <div className="text-center max-w-3xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Welcome to Mega Blog
                      </span>
                    </h1>
                    <p className="text-gray-300 text-xl">
                      A platform where ideas come to life. Join our community of writers and readers.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link to="/signup" className="w-auto">
                        <Button className="cursor-pointer w-full">
                          <span className="px-8">Get Started</span>
                        </Button>
                      </Link>
                      <Link to="/login" className="w-auto">
                        <Button className="cursor-pointer bg-gray-800 hover:bg-gray-700 w-full">
                          <span className="px-8">Sign In</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Articles Preview */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Featured Articles</h2>
                  <p className="text-gray-400">Sign in to read full articles and join the discussion</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {previewArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-gray-700">
                          <Link
                            to="/login"
                            className="text-purple-500 hover:text-purple-400 font-medium cursor-pointer flex items-center gap-2 group"
                          >
                            Login to read full article
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gray-800/50 mt-16">
                <div className="container mx-auto px-4 py-16">
                  <div className="text-center max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold text-white">Ready to start writing?</h2>
                    <p className="text-gray-300">
                      Join our community and share your stories with readers around the world.
                    </p>
                    <Link to="/signup" className="inline-block">
                      <Button className="cursor-pointer">
                        <span className="px-8">Start Writing</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
