import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin, FiSave } from "react-icons/fi";
import { useState } from "react";
const Card = ({ data }) => {
    const {
        companyName,
        companyLogo,
        jobLocation,
        employmentType,
        postingDate,
        description,
        jobTitle,
    } = data;
    const [buttonText, setButtonText] = useState("Postuler");
    const handleApplyClick = () => {
        alert("Merci d'avoir postulé !");
    };
    const handleImportClick = () => {
        // Ici, vous pouvez importer votre document
        window.open('/Documents', '_self');
    };
    const [saved, setSaved] = useState(false); // État de la sauvegarde

    const handleSaveClick = () => {
        setSaved(!saved); // Inverser l'état de la sauvegarde
    };
    const formattedPostingDate = postingDate.substring(0, 10);
    
    return (
        <section className="card">
            <Link
                to={"/"}
                className="flex gap-4 flex-col sm:flex-row items-start"
            >
                  {companyLogo ? (
        <img src={companyLogo} alt="Company Logo" className='create-job-logo' style={{width:100,height:100}} onError={() => console.error('Erreur de chargement de l\'image')  } />
    ) : (
        <p>Aucun logo disponible</p>
    )}
                <div>
                    <h4 className="text-primary mb-1">{companyName}</h4>
                    <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
                    <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                        <span className="flex items-center gap-2">
                            <FiMapPin />
                            {jobLocation}
                        </span>
                        <span className="flex items-center gap-2">
                            <FiClock />
                            {employmentType}
                        </span>
                        <span className="flex items-center gap-2">
                            <FiCalendar />
                            {formattedPostingDate}
                        </span>
                    </div>
                    <p className="text-base text-primary/70">{description}</p>
                </div>
            </Link>
        
            <br />
            <button onClick={handleImportClick}>
                Postuler
            </button>
            <div className="mt-4">
                <button onClick={handleSaveClick} className="flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors">
                    <FiSave />
                    {saved ? 'Saved' : 'Save'}
                </button>
            </div>
        </section>
    );
};

export default Card;
