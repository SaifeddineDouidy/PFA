import React, { useState, useEffect } from 'react';
import {Banner} from './Banner';
import Cards from './Cards';
import Posts from './Posts';
import FiltersSide from './FiltersSide';

const StudentHome = () => {
    // State to hold the selected category for filtering posts
    const [selectedCategory, setSelectedCategory] = useState(null);
    // State to hold all posts fetched from the server
    const [posts, setPosts] = useState([]);
    // State to indicate whether the posts are currently being loaded
    const [isLoading, setIsLoading] = useState(true);
    // State to hold the current page number for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Number of items to display per page
    const itemsPerPage = 6;

    // Fetch posts from the server when the component mounts
    useEffect(() => {
        setIsLoading(true); // Set loading state to true before fetching
        fetch("/posts")
            .then(res => res.json()) // Parse the response as JSON
            .then(data => {
                setPosts(data); // Update the posts state with the fetched data
                setIsLoading(false); // Set loading state to false after fetching
            })
            .catch(error => {
                console.error('Error fetching posts:', error); // Log any errors
            });
    }, []); // Empty dependency array means this effect runs once on component mount

    // State to hold the search query
    const [query, setQuery] = useState("");
    // Handler for input change events to update the search query
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    // Filter posts based on the search query
    const filteredItems = posts.filter((post) => post.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    // Handler for radio button change events to update the selected category
    const handleChange = (event) => {
        setSelectedCategory(event.target.value); // Update the selected category state
    }

    // Handler for button click events to update the selected category
    const handleClick = (event) => {
        setSelectedCategory(event.target.value); // Update the selected category state
    }

    // Calculate the index range
    const calculatePageRange = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex * itemsPerPage;
      return(startIndex, endIndex);
    }

    // Function for the next Page
    const nextPage = () => {
      if(currentPage < Math.ceil(filteredItems.length) / itemsPerPage){
        setCurrentPage(currentPage-1);
      }
    }

    //Function For the previous page
    const previousPage = () =>{
      if(currentPage > 1)
      {
        setCurrentPage(currentPage-1);
      }

    }

    // Function to filter posts based on the selected category and search query
    // Function to filter posts based on the selected category and search query
const filteredData = (posts, selected, query) => {
  let filteredPosts = posts;
  if (query) {
      filteredPosts = filteredItems; // Filter posts based on the search query
  }

  if (selected) {
      filteredPosts = filteredPosts.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => {
          // Convert postingDate to Date object
          const postDate = new Date(postingDate);
          const selectedDate = new Date(selected);
          return jobLocation.toLowerCase() === selected.toLowerCase() || // Filter posts based on the selected category
              parseInt(maxPrice) <= parseInt(selected) ||
              postDate >= selectedDate || // Compare postingDate as Date object
              salaryType.toLowerCase() === selected.toLowerCase() ||
              employmentType.toLowerCase() === selected.toLowerCase();
      });
  }

  // Slice the Data based on the current page
  const {startIndex, endIndex} = calculatePageRange();
  filteredPosts = filteredPosts.slice(startIndex, endIndex);

  return filteredPosts.map((data, i) => <Cards key={i} data={data} />); // Map filtered posts to Cards components
};


    // Call filteredData function to get the filtered posts
    const result = filteredData(posts, selectedCategory, query);

    return (
        <div>
          {/* Banner component with search input */}
            <Banner query={query} handleInputChange={handleInputChange} /> 
            <div className='bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
              {/* FiltersSide component with radio buttons and buttons */}
                <div className='bg-white p-4 rounded'>
                    <FiltersSide handleChange={handleChange} handleClick={handleClick} /> 
                    
                </div>
                {/* Display posts or loading message */}
                <div className='col-span-2 bg-white p-4 rounded-sm'>
                    {isLoading ? (<p className='font-medium'>Loading...</p>) : result.length > 0 ? (<Posts result={result} />) : (<><h3 className='text-lg font-bold mb-2 '>
                      {result.length} Jobs</h3><p>No Data Found</p>
                    </>
                  )} 

                {/** Pagination */}
                {
                  result.length > 0 ? (
                    <div className='flex justify-center mt-4 space-x-8'>
                    <button onClick={previousPage} disabled={currentPage===1} className='hover:underline cursor-pointer'>Previous</button>
                    <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                    <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline cursor-pointer'>Next</button>
                  </div>
                  ) : ""
                }
                </div>

                {/* Placeholder for the right side content */}
                <div className='bg-white p-4 rounded'>right</div> 
                
            </div>
        </div>
    );
}

export default StudentHome;
