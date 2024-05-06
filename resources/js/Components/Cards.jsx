import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { usePage, useForm } from '@inertiajs/react';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar, FiSave, FiArrowRight } from 'react-icons/fi';
import { InertiaLink, Link } from '@inertiajs/inertia-react';

const Cards = ({ data, companies, savePost }) => {
    const { id, company_id, jobTitle, minPrice, maxPrice, salaryType, jobLocation, experienceLevel, employmentType, postingDate, description } = data;

    // Find the company object that matches the company_id
    const company = companies.find(c => c.id === company_id);
    const companyName = company ? company.companyName : 'Unknown Company';

    // Handle the save post functionality
    const handleSavePost = async () => {
        try {
            console.log(id);
          await axios.post('/saved-posts', { postId: id });
          toast.success('Post saved!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } catch (error) {
          if (error.response) {
            console.error('Error saving post:', error.response.data);
            toast.error(`Error saving post: ${error.response.data.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (error.request) {
            console.error('Error saving post:', error.request);
            toast.error('Error saving post. Please try again later.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            console.error('Error saving post:', error.message);
            toast.error('Error saving post. Please try again later.', {
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
        }
      };

      // Handle the apply functionality
      const handleApply = () => {
        const { post } = useForm();
      
        const submit = () => {
          post(`/applications/${id}`);
        };
      
        return (
          <button onClick={submit} className="flex items-center gap-2 bg-white text-blue px-4 py-2 rounded-md hover:bg-blue-500 hover:bg-blue hover:text-white transition-colors">
            Apply
            <FiArrowRight className="ml-2" />
          </button>
        );
      };

    return (
        <section className=''>
            <div className='flex gap-4 flex-col sm:flex-row items-start'>
                <div>
                    {/* Company name */}
                    <h4 className='text-primary mb-1'>{companyName}</h4>
                    {/* Job title */}
                    <div className="text-lg font-semibold mb-2 hover:text-blue">
                        <Link href={`/detailjobs/${id}`} className="hover:text-blue-500 transition-colors">
                            {jobTitle}
                        </Link>
                    </div>
                    {/* Job details */}
                    <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                    <span className='flex items-center gap-2'><FiMapPin aria-label="Job Location" /> {jobLocation}</span>
                        <span className='flex items-center gap-2'><FiClock /> {employmentType}</span>
                        {minPrice !== null && maxPrice !== null && (
                            <span className='flex items-center gap-1'><FiDollarSign /> {parseInt(minPrice)}-{parseInt(maxPrice)}</span>
                        )}
                        <span className='flex items-center gap-2'><FiCalendar /> {postingDate}</span>
                    </div>
                    {/* Job description */}
                    <p className='text-base text-primary/70'>{description}</p>
                    {/* Buttons */}
                    <div className='flex justify-start mt-4 gap-2'>
                <button onClick={handleSavePost} className='flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors'>
                    <FiSave />
                    Save
                </button>
                <InertiaLink href={`/applications/${id}`} className="flex items-center gap-2 bg-white text-blue px-4 py-2 rounded-md hover:bg-blue-500 hover:bg-blue hover:text-white transition-colors">
                  Apply
                  <FiArrowRight className="ml-2" />
                </InertiaLink>
            </div>
                </div>
            </div>
        </section>
    );
};

export default Cards;