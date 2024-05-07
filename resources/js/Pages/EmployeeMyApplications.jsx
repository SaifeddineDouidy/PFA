import React, {useState, useRef} from 'react';
import EmployeeLayout from '../Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { FiTrash, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from '@inertiajs/inertia-react';
import { format } from 'date-fns';

export default function EmployeeMyApplications({auth}) {
    const { user } = auth;
    const [applications, setApplications] = useState(usePage().props.applications);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const modalRef = useRef(null);

    const handleDeleteApplication = async (applicationId) => {
        try {
          setSelectedApplicationId(applicationId);
          setIsModalOpen(true);
          modalRef.current.showModal();
        } catch (error) {
          console.error('Error deleting application:', error);
        }
      };

    const confirmDelete = async () => {
        try {
          // Make the DELETE request
          const response = await axios.delete(`/applications/${selectedApplicationId}`);
      
          // Check if the deletion was successful
          if (response.status === 200) {
            // Update the state to remove the deleted application
            setApplications(applications.filter((app) => app.id !== selectedApplicationId));
      
            // Show a success toast
            toast.success('Application deleted successfully!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
      
            // Close the modal after successful deletion
            modalRef.current.close();
          } else {
            // Handle the case where the deletion failed
            console.error('Failed to delete application:', response.data.message);
      
            // Show an error toast
            toast.error('Error deleting application. Please try again later.', {
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
        } catch (error) {
          console.error('Error deleting application:', error);
      
          // Show an error toast
          toast.error('Error deleting application. Please try again later.', {
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
        <EmployeeLayout user={user} userId={user.id}>
            <Head title="My Applications" />
            <div className="bg-white p-4 rounded-sm">
                <h2 className="text-2xl text-primary font-bold mb-4">My Applications</h2>
                <dialog ref={modalRef} className='modal'>
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg text-primary">Confirm Deletion</h3>
        <p className="py-4 text-primary border-none">Are you sure you want to delete this application?</p>
        <div className="modal-action">
          <button className="btn hover:text-white" onClick={() => modalRef.current.close()}>Cancel</button>
          <button className="btn hover:bg-red-500 hover:text-white text-primary bg-red-500 border-none" onClick={confirmDelete}>Delete</button>
        </div>
      </div>
    </dialog>
                {applications.length === 0 ? (
                    <p>You haven't submitted any applications yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.map((application) => (
                            <div key={application.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                    <Link href={`/detailjobs/${application.job.id}`} className="text-lg text-primary font-semibold hover:text-gray-500 transition-colors">
                                        {application.job.jobTitle}
                                    </Link>
                                        <div className="text-gray-600 mb-2">{application.job.companyName}</div>
                                        <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <FiClock />
                                                {application.job.jobLocation}
                                            </span>
                                            {application.job.minPrice !== null && application.job.maxPrice !== null && (
                                                <span className="flex items-center gap-1">
                                                <FiDollarSign />
                                                {parseInt(application.job.minPrice)}-{parseInt(application.job.maxPrice)}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-2">
                                                <FiCalendar />
                                                {application.job.postingDate}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <p>Application sent, the :</p>
                                                <FiCalendar />
                                                {format(new Date(application.created_at), 'MMM d, yyyy')}
                                            </span>
                                        </div>
                                        <div className="text-gray-700">
                                            <h3 className="text-lg font-semibold">Job Description:</h3>
                                            <p>{application.job.description}</p>
                                        </div>
                                        <div className="text-gray-700">
                                            <h3 className="text-lg font-semibold">Status:</h3>
                                            <p
                                                className={`px-2 py-1 rounded-md text-white font-medium ${
                                                    application.status === 'pending'
                                                        ? 'bg-yellow-500'
                                                        : application.status === 'rejected'
                                                        ? 'bg-red-500'
                                                        : 'bg-green-500'
                                                }`}
                                            >
                                                {application.status}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteApplication(application.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <FiTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </EmployeeLayout>
    );
}