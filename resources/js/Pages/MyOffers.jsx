import NavLink from "@/Components/NavLink";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const MyOffers = ({auth}) => {
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoaading, setIsLoading] = useState(true);



    // set curent page
    const [currentPage,setCurrentPage]=useState(1);
    const itemsPerPage=1000;
    useEffect(() => {
        fetchJobs();
    }, [searchText, currentPage]);

    const fetchJobs = () => {
        setIsLoading(true);
        /*faire de profile de company name */
        fetch(`/api/jobs?page=${currentPage}&search=${searchText}`)
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                setIsLoading(false);
            });
    };
    //pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs=jobs.slice(indexOfFirstItem,indexOfLastItem)

    // next btn & previous btn
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };



    const handleSearch = () => {
        setIsLoading(true); // Ajoutez cette ligne pour indiquer que le chargement est en cours
    
        fetch(`/api/jobs?page=${currentPage}&search=${searchText}`)
            .then((res) => res.json())
            .then((data) => {
                setJobs(data); // Remplacez ceci par setJobs(data.data) pour mettre à jour les offres d'emploi uniquement
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                setIsLoading(false);
            });
    };

    const handleDelete = (id) => {
        fetch(`/api/jobs/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Job deleted:", data);
                fetchJobs();
            })
            .catch((error) => {
                console.error("Error deleting job:", error);
            });
    };
    
    
    // Utilisation de handleDelete dans le composant pour supprimer une offre d'emploi spécifique
    // Supposons que chaque offre d'emploi a un identifiant unique stocké dans la variable job.id
    /*<button onClick={() => handleDelete(job.id)}>Supprimer</button>*/
    
  
    
    //console.log(searchText);
    return (
        <AuthenticatedLayout
            user={auth.user}
            >
        <div className="max-w-screen-2xl constainer mx-auto xl:px-24 px-4">
            MyOffers : {jobs.length}
            <div className="my-jobs-container">
                <h1 className="text-center p-4">ALL MY OFFERS</h1>
                <div className="search-box p-2 text-center mb-2">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        name="search"
                        id="search"
                        className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
                    />
                    <button
                        className="bg-blue text-white font-semibold px-8 py-2 rounded-sm m-4"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
            {}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">
                                        All offers
                                    </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <NavLink href={route('createJob')} active={route().current('createJob')}>
                                
                                    <button
                                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Post a new offer
                                    </button>
                                    </NavLink>
                                 </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            N°
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Offer Title
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Company Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Salary
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    isLoaading ? (<div className="flex items-center justify-center h-20"><p>loading .......</p></div>):( <tbody>
                                        {
                                          currentJobs.map((job, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                  {index + 1}
                                                
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {job.jobTitle}
                                                    
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                   {job.companyName}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                    ${job.maxPrice} - ${job.minPrice}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                    <button><Link to={`/edit-job/${job?._id}`}>Edit</Link></button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                    <button onClick={() => handleDelete(job._id)} className="bg-red-700 py-2 px-6 text-white rounded-sm">Delete</button>

                                                </td>
                                            </tr>
                                          ))
                                        }
                                        
                                      </tbody>)
                                }

                               
                            </table>
                        </div>
                    </div>
                </div>
                   {/*pagination */}
                   <div className="flex justify-center text-black space-x-8 mb-8">
                        {
                            currentPage >1 && (
                                <button className="hover:underline" onClick={prevPage}>Previous</button>
                            ) 

                        }
                        {
                            indexOfLastItem <jobs.length && (
                                <button onClick={nextPage} className="hover:underline">Next</button>
                            )
                        }

                   </div>
            </section>
        </div>
        
        </AuthenticatedLayout>
    );
};

export default MyOffers;
