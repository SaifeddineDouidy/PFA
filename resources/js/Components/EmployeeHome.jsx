import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Banner } from './Banner';
import { Link } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Cards from './Cards';
import Posts from './Posts';
import ApplicationsPostsPage from '@/Pages/ApplicationsPostsPage';
import FiltersSide from './FiltersSide';

const EmployeeHome = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [query, setQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [selectedSalaryType, setSelectedSalaryType] = useState([]);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/posts')
      .then(response => {
        setPosts(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    const filteredPosts = filteredData(posts, selectedLocations, selectedSalary, selectedSalaryType, selectedDate, selectedWorkExperience, selectedEmploymentType, query);
    setPosts(filteredPosts);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    const isChecked = event.target.checked;
   
    setSelectedLocations(prevLocations => {
       if (isChecked) {
         return [...prevLocations, location];
       } else {
         return prevLocations.filter(loc => loc !== location);
       }
    });
  };
   
  

  const handleFilterChange = (filterType, value, isChecked = true) => {
    switch (filterType) {
      case 'location':
      if (isChecked) {
        setSelectedLocations([...selectedLocations, value]);
      } else {
        setSelectedLocations(selectedLocations.filter(loc => loc !== value));
      }
      setCurrentPage(1);
      break;
      case 'salary':
        if (selectedSalary.includes(value)) {
          setSelectedSalary(selectedSalary.filter(s => s !== value));
        } else {
          setSelectedSalary([...selectedSalary, value]);
        }
        break;
      case 'salaryType':
        if (selectedSalaryType.includes(value)) {
          setSelectedSalaryType(selectedSalaryType.filter(t => t !== value));
        } else {
          setSelectedSalaryType([...selectedSalaryType, value]);
        }
        break;
     
        case 'date':
          if (isChecked) {
            setSelectedDate([...selectedDate, value]);
          } else {
            setSelectedDate(selectedDate.filter(d => d !== value));
          }
          setCurrentPage(1);
          break;
      case 'work-exp':
        if (isChecked) {
            setSelectedWorkExperience([...selectedWorkExperience, value]);
          } else {
            setSelectedWorkExperience(selectedWorkExperience.filter(t => t !== value));
          }
          setCurrentPage(1);
          break;
        case 'employment-type':
          if (isChecked) {
            setSelectedEmploymentType([...selectedEmploymentType, value]);
          } else {
            setSelectedEmploymentType(selectedEmploymentType.filter(t => t !== value));
          }
          setCurrentPage(1);
          break;
      default:
        break;
    }
  };
  

  const filteredData = (posts, selectedLocations, selectedSalary, selectedSalaryType, selectedDate, selectedWorkExperience, selectedEmploymentType, query) => {
    let filteredPosts = [...posts];

    if (selectedLocations.length > 0) {
      filteredPosts = filteredPosts.filter(post => selectedLocations.some(location => post.jobLocation.toLowerCase().includes(location.toLowerCase())));
    }

    if (selectedSalary.length > 0) {
      filteredPosts = filteredPosts.filter(post => selectedSalary.some(salary => parseInt(post.maxPrice) <= parseInt(salary)));
    }

    if (selectedSalaryType.length > 0) {
      filteredPosts = filteredPosts.filter(post => selectedSalaryType.some(type => post.salaryType.toLowerCase() === type.toLowerCase()));
    }

    if (selectedDate.length > 0) {
      filteredPosts = filteredPosts.filter(post => {
        const postingDate = new Date(post.postingDate);
        return selectedDate.some(date => {
          const selectedDateObj = new Date(date);
          return postingDate >= selectedDateObj;
        });
      });
    }

    if (selectedWorkExperience.length > 0) {
      filteredPosts = filteredPosts.filter(post => selectedWorkExperience.some(exp => post.experienceLevel.toLowerCase() === exp.toLowerCase()));
    }

    if (selectedEmploymentType.length > 0) {
      filteredPosts = filteredPosts.filter(post => selectedEmploymentType.some(employmentType => post.employmentType.toLowerCase().includes(employmentType.toLowerCase())));
    }

    if (query) {
      filteredPosts = filteredPosts.filter(post => post.jobTitle.toLowerCase().includes(query.toLowerCase()));
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    filteredPosts = filteredPosts.slice(startIndex, endIndex);

    return filteredPosts.map((data, i) => <Cards key={i} data={data} />);
  };

  const result = filteredData(posts, selectedLocations, selectedSalary, selectedSalaryType, selectedDate, selectedWorkExperience, selectedEmploymentType, query);

  const nextPage = () => {
    if (currentPage < Math.ceil(result.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('/companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const clearFilters = () => {
    setSelectedLocations([]);
    setSelectedSalary([]);
    setSelectedDate([]);
    setSelectedSalaryType([]);
    setSelectedWorkExperience([]);
    setSelectedEmploymentType([]);

    // Reset checked state for checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  return (
    <div className="">
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        handleLocationChange={handleLocationChange}
        handleSubmit={handleSubmit}
      />
      <div className="md:grid grid-cols-4 gap-8 lg:px-2 px-4 py-12 rounded bg-gray-100">
        <div className="bg-white p-4 rounded">
          <FiltersSide
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            selectedLocations={selectedLocations}
            selectedWorkExperience={selectedWorkExperience}
            selectedEmploymentType={selectedEmploymentType}
            handleLocationChange={handleLocationChange}
          />
        
      </div>
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Posts result={result} companies={companies}/>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p className="flex justify-center">No jobs matched your filters!</p>
            </>
          )}
          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="hover:underline cursor-pointer"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {Math.ceil(result.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(result.length / itemsPerPage)}
                className="hover:underline cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded">right</div>
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default EmployeeHome;