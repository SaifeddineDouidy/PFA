import React from 'react';
import Cards from './Cards';

export const Posts = ({ posts, companies }) => {
  // This component receives two props: 'posts' and 'companies'
  // 'posts' is an array of job postings
  // 'companies' is an object or array that contains the company information for each job posting

  return (
    <>
      {/* Main container */}
      <div>
        {/* Heading that displays the number of job postings */}
        <h3 className='text-lg font-bold mb-2'>{posts.length} Jobs</h3>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
        <div>
          {/* Map over the 'posts' array and render a card for each post */}
          {posts.map((data, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 mt-5">
              {/* Render the 'Cards' component, passing the current 'data' and 'companies' as props */}
              <Cards key={i} data={data} companies={companies} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};