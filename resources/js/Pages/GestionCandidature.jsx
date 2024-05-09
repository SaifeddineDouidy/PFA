import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const GestionCandidature = ({auth}) => {
    const [candidates, setCandidates] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1000;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3001/all-employee`)
            .then((res) => res.json())
            .then((data) => {
                setCandidates(data);
                setIsLoading(false);
            });
    }, [searchText]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCandidates = candidates.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < candidates.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearch = () => {
        // Logique de recherche
    };

    const handleAccept = async (id) => {
        // Appel à l'API pour marquer le candidat comme accepté
        try {
            const response = await fetch(`http://localhost:3001/accept-candidate/${id}`, {
                method: "PUT",
            });
            if (response.ok) {
                // Mettre à jour la liste des candidats après acceptation
                const updatedCandidates = candidates.filter(candidate => candidate.idemp !== id);
                setCandidates(updatedCandidates);
            } else {
                console.error("Erreur lors de l'acceptation du candidat.");
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };
    
    const handleReject = async (id) => {
        // Appel à l'API pour supprimer le candidat
        try {
            const response = await fetch(`http://localhost:3001/delete-candidate/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Mettre à jour la liste des candidats après la suppression
                const updatedCandidates = candidates.filter(candidate => candidate.idemp !== id);
                setCandidates(updatedCandidates);
            } else {
                console.error("Erreur lors de la suppression du candidat.");
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            >
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <h1 className="text-center p-4">Toutes les Candidatures</h1>
            <div className="search-box p-2 text-center mb-2">
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    name="search"
                    id="search"
                    className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
                    placeholder="Rechercher par nom"
                />
                <button
                    className="bg-blue text-white font-semibold px-8 py-2 rounded-sm m-4"
                    onClick={handleSearch}
                >
                    Rechercher
                </button>
            </div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">
                                        Toutes les candidatures
                                    </h3>
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
                                            Nom & Prénom
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            CV
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Lettre de Motivation
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">
                                                Chargement en cours...
                                            </td>
                                        </tr>
                                    ) : (
                                        currentCandidates.map((candidate, index) => (
                                            <tr key={index}>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {candidate.fullName}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <a href={`http://localhost:3001/${candidate.cvFile}`} target="_self" rel="noopener noreferrer">{candidate.cvFile}</a>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <a href={`http://localhost:3001/${candidate.motivationLetter}`} target="_self" rel="noopener noreferrer">{candidate.motivationLetter}</a>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button onClick={() => handleAccept(candidate.idemp)} className="bg-green-700 py-2 px-6 text-white rounded-sm mr-2">Accepter</button>
                                                    <button onClick={() => handleReject(candidate.idemp)} className="bg-red-700 py-2 px-6 text-white rounded-sm">Refuser</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center text-black space-x-8 mb-8">
                    {currentPage > 1 && (
                        <button className="hover:underline" onClick={prevPage}>
                            Précédent
                            </button>
                    )}
                    {indexOfLastItem < candidates.length && (
                        <button className="hover:underline" onClick={nextPage}>
                            Suivant
                        </button>
                    )}
                </div>
            </section>
        </div>
        
        </AuthenticatedLayout>
    );
};

export default GestionCandidature;
