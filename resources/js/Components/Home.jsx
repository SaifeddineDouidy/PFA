import React, { useState, useEffect } from 'react';
import BannerC from "./BannerC";
import Card from "./Card";
import Jobs from "../Pages/Jobs";
import Sidebar from "./sidebar/Sidebar";
import Newsletter from "./Newsletter";

const Home =()=>{
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoaading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const itemsPerPage = 1000000;
    useEffect(() => {
        setIsLoading(true);
        /*const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/all-jobs');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();*/
        fetch("http://localhost:3001/all-jobs")
        .then((res) => res.json())
        .then((data) => {
            setJobs(data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Ensure loading state is set to false even if an error occurs
        });



    }, []);

    // Fonction pour récupérer les données postées

    //console.log(jobs)

    //handle input change
    const [query, setQuery] = useState("");
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    //filter jobs by title
    const filteredItems = jobs.filter(
        (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    //---------------Radio filtering ---------
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    //---buttonb based filtering -----
    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    // calculates the index rangs
   
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    };

    //function for the next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    // function for the previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // main function
    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;

        //filtering Input items
        if (query) {
            filteredJobs = filteredItems;
        }

        //category filtering
        if (selected) {
            filteredJobs = filteredJobs.filter(
                ({
                    jobLocation,
                    experienceLevel,
                    employmentType,
                    postingDate,
                }) =>
                    jobLocation.toLowerCase() === selected.toLowerCase() ||
                    experienceLevel.toLowerCase() === selected.toLowerCase() ||
                    employmentType.toLowerCase() === selected.toLowerCase() ||
                    postingDate >= selected
            );
            console.log(filteredJobs);
        }
        // slice the data based on currebt page
        const { startIndex, endIndex } = calculatePageRange();
        filteredJobs = filteredJobs.slice(startIndex, endIndex);
        return filteredJobs.map((data, i) => <Card key={i} data={data} />);
    };

    const result = filteredData(jobs, selectedCategory, query);

    return (
        <div className="text-blue">
            <BannerC query={query} handleInputChange={handleInputChange} />
            {/*main content*/}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                {/*left side*/}
                <div className="bg-white p-4 rounded">
                    <Sidebar
                        handleChange={handleChange}
                        handleClick={handleClick}
                    />
                </div>

                {/*job cards */}
                <div className="col-span-2 bg-white p-4 rounded-sm ">
                    {isLoaading ? (
                        <p className="font-medium">Loading..........</p>
                    ) : result.length > 0 ? (
                        <Jobs result={result} />
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mb-2">
                                {result.length} Jobs
                            </h3>
                            <p>No data found !</p>
                        </>
                    )}
                    {
                        //pagination//
                        result.length > 0 ? (
                            <div className="flex justify-center mt-4 space-x-8">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="hover:underline"
                                >
                                    Previous
                                </button>
                                <span className="mx-2">
                                    Page {currentPage} of{" "}
                                    {Math.ceil(
                                        filteredItems.length / itemsPerPage
                                    )}
                                </span>
                                <button
                                    onClick={nextPage}
                                    disabled={
                                        currentPage ===
                                        Math.ceil(
                                            filteredItems.length / itemsPerPage
                                        )
                                    }
                                    className="hover:underline"
                                >
                                    Next
                                </button>
                            </div>
                        ) : (
                            ""
                        )
                    }
                </div>

                {/*right side*/}
                <div className="bg-white p-4 rounded"><Newsletter/></div>
            </div>
        </div>
    );
}

export default Home;
