import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { Banner } from './Banner';
import {Link} from '@inertiajs/react'; 

import Cards from './Cards';
import Posts from './Posts';
import FiltersSide from './FiltersSide';

const StudentHome = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [query, setQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSalary, setSelectedSalary] = useState(null);
    const [selectedSalaryType, setSelectedSalaryType] = useState('');
    const [selectedWorkExperience, setSelectedWorkExperience] = useState('');
    const [selectedEmploymentType, setSelectedEmploymentType] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
      setIsLoading(true);
      axios.get("/posts")
          .then(response => {
              setPosts(response.data);
              setIsLoading(false);
              console.log(response.data)
          })
          .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleLocationInputChange = (event) => {
      setSelectedLocation(event.target.value);
    };
  

    const handleFilterChange = (filterType, value) => {
      switch (filterType) {
         case 'location':
           setSelectedLocation(value);
           break;
         case 'salary':
           setSelectedSalary(value);
           break;
         case 'salaryType':
           setSelectedSalaryType(value);
           break;
         case 'date':
           setSelectedDate(value);
           break;
        case 'work-exp':
          setSelectedWorkExperience(value);
          break;
        case 'employment-type':
          setSelectedEmploymentType(value);
          break;
         default:
           break;
      }
     };

    const filteredData = (posts, selectedLocation, selectedSalary, selectedSalaryType, selectedDate, selectedWorkExperience, selectedEmploymentType, query) => {
      let filteredPosts = [...posts];
     
      if (selectedLocation) {
         filteredPosts = filteredPosts.filter(post => post.jobLocation.toLowerCase() === selectedLocation.toLowerCase());
      }
     
      if (selectedSalary) {
         filteredPosts = filteredPosts.filter(post => parseInt(post.maxPrice) <= parseInt(selectedSalary));
      }
     
      if (selectedSalaryType) {
         filteredPosts = filteredPosts.filter(post => post.salaryType.toLowerCase() === selectedSalaryType.toLowerCase());
      }
     
      if (selectedDate) {
         const selectedDateObj = new Date(selectedDate);
         filteredPosts = filteredPosts.filter(post => new Date(post.postingDate) >= selectedDateObj);
      }
      
      if (selectedWorkExperience) {
        filteredPosts = filteredPosts.filter(post => post.experienceLevel.toLowerCase() === selectedWorkExperience.toLowerCase());
     }
      if (selectedEmploymentType) {
          filteredPosts = filteredPosts.filter(post => post.employmentType.toLowerCase() === selectedEmploymentType.toLowerCase());
      }
     
      if (query) {
         filteredPosts = filteredPosts.filter(post => post.jobTitle.toLowerCase().includes(query.toLowerCase()));
      }
     
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      filteredPosts = filteredPosts.slice(startIndex, endIndex);
     
      return filteredPosts.map((data, i) => <Cards key={i} data={data} />);
     };

    const result = filteredData(posts, selectedLocation, selectedSalary, selectedSalaryType, selectedDate, selectedWorkExperience, selectedEmploymentType, query);

    const nextPage = () => {
        if (currentPage < Math.ceil(result.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
      axios.get('/companies')
        .then(response => {
          setCompanies(response.data);
        })
        .catch(error => console.error('Error fetching companies:', error));
    }, []);

    // In the parent component of FiltersSide
    const clearFilters = () => {
      setSelectedLocation(null);
      setSelectedSalary(null);
      setSelectedDate(null);
      setSelectedSalaryType('');
      setSelectedWorkExperience('');
      setSelectedEmploymentType('');
    
      // Reset checked state for radio buttons
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });
    };
 

    return (
        <div className=''>
            <Banner query={query} handleInputChange={handleInputChange} handleLocationInputChange={handleLocationInputChange} />
            <div className='md:grid grid-cols-4 gap-8 lg:px-2 px-4 py-12 rounded bg-gray-100'>
                <div className='bg-white p-4 rounded'>
                    <FiltersSide handleFilterChange={handleFilterChange} clearFilters={clearFilters} selectedWorkExperience={selectedWorkExperience} selectedEmploymentType={selectedEmploymentType}/>
                </div>
                <div className='col-span-2 bg-white p-4 rounded-sm'>
                    {isLoading ? (<p className='font-medium'>Loading...</p>) : result.length > 0 ? (<Posts result={result} companies={companies} />) : (<><h3 className='text-lg font-bold mb-2'>
                        {result.length} Jobs</h3><p>No Data Found</p>
                        </>
                    )}
                    {result.length > 0 && (
                        <div className='flex justify-center mt-4 space-x-8'>
                            <button onClick={previousPage} disabled={currentPage === 1} className='hover:underline cursor-pointer'>Previous</button>
                            <span className='mx-2'>Page {currentPage} of {Math.ceil(result.length / itemsPerPage)}</span>
                            <button onClick={nextPage} disabled={currentPage === Math.ceil(result.length / itemsPerPage)} className='hover:underline cursor-pointer'>Next</button>
                        </div>
                    )}
                </div>
                <div className='bg-white p-4 rounded'>right</div>
            </div>
        </div>
    );
}

export default StudentHome;
