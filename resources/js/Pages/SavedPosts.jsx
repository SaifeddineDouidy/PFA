import React, { useState, useEffect } from 'react';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar, FiTrash, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

const SavedPostsPage = ({ auth, savedPosts }) => {
  const { user } = auth;
  const [filterQuery, setFilterQuery] = useState('');
  const [sortBy, setSortBy] = useState('posting_date');
  const [currentPage, setCurrentPage] = useState(1);
  const [localSavedPosts, setLocalSavedPosts] = useState(savedPosts); // Local state for saved posts
  const postsPerPage = 10;

  // Update localSavedPosts whenever savedPosts prop changes
    useEffect(() => {
        setLocalSavedPosts(savedPosts);
    }, [savedPosts]);

  // Calculate time passed for each post
  const currentTime = new Date();
 
  // Use localSavedPosts instead of savedPosts for filtering, sorting, and pagination
 const updatedSavedPosts = localSavedPosts.map(post => ({
    ...post,
    timePassed: Math.floor((currentTime - new Date(post.saved_at)) / (1000 * 60 * 60 * 24))
 }));

  // Filtering and sorting logic
  const filteredSavedPosts = updatedSavedPosts.filter((post) =>
    post.job_title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const sortedSavedPosts = filteredSavedPosts.sort((a, b) => {
    if (sortBy === 'time_passed') {
      return a.timePassed - b.timePassed;
    } else if (a[sortBy] < b[sortBy]) {
      return -1;
    } else if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  });

  // Readable Time
  const readableTime = (timestamp) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - new Date(timestamp)) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInDays > 0) {
      return `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentSavedPosts = sortedSavedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(sortedSavedPosts.length / postsPerPage);

  // Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeletePost = async (postId) => {
    console.log(postId)
    try {
      await axios.delete('/saved-posts', {
        data: { postId: postId }, // Sending a single postId
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Post removed from saved posts!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLocalSavedPosts(localSavedPosts.filter(post => post.job_id !== postId));
      // Re-fetch saved posts after deletion
      // You might need to implement a method to re-fetch saved posts or update the state directly
    } catch (error) {
      console.error('Error deleting saved post:', error.message);
      toast.error('Error removing post from saved posts. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
   

  return (
    <AuthenticatedLayout user={user}>
      <Head title="Saved Posts" />
      <div className="bg-white p-4 rounded-sm">
        <h2 className="text-2xl font-bold mb-4">Saved Posts</h2>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label htmlFor="filter" className="mr-2">Filter:</label>
            <input
              type="text"
              id="filter"
              placeholder="Search by job title"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <label htmlFor="sort-by" className="mr-4 mt-2">Sort by:</label>
            <select
              id="sort-by"
              className="border border-gray-300 rounded-md px-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="posting_date">Posting Date</option>
              <option value="job_title">Job Title</option>
              <option value="job_location">Job Location</option>
            </select>
          </div>
        </div>
        {currentSavedPosts.length === 0 ? (
          <p>You haven't saved any posts yet.</p>
        ) : (
          <div className="space-y-4">
            {currentSavedPosts.map((post) => (
              <div key={post.id} className="bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-semibold hover:text-blue-500 transition-colors">
                      <Link href={`/detailjobs/${post.job_id}`}>{post.job_title}</Link>
                    </div>
                    <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                      <span className="flex items-center gap-2">
                        <FiMapPin aria-label="Job Location" />
                        {post.job_location}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiClock />
                        {post.employment_type}
                      </span>
                      {post.min_price !== null && post.max_price !== null && (
                        <span className="flex items-center gap-1">
                          <FiDollarSign />
                          {parseInt(post.min_price)}-{parseInt(post.max_price)}
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <FiCalendar />
                        {post.posting_date}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">
                      <h3 className="text-lg font-semibold">Job Description:</h3>
                      <p>{post.description}</p>
                    </div>
                    <div className="text-gray-700">
                      <h3 className="text-lg font-semibold">Requirements:</h3>
                      {post.requirments ? (
                        <ul className="list-disc pl-4">
                          {post.requirments.split(',').map((requirment, index) => (
                            <li key={index}>{requirment.trim()}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No requirements listed.</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post.job_id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash />
                  </button>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {readableTime(post.saved_at)}
                </div>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors mr-2"
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                  } mr-2`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        )}
        <ToastContainer />
      </div>
    </AuthenticatedLayout>
  );
};

export default SavedPostsPage;
