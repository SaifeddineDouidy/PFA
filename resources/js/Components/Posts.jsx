import React from 'react';
const Posts = ({ result, companies }) => {
    return (
        <>
            <div>
                <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                {result.map((card, index) => (
                   
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            {React.cloneElement(card, { companies })}
                        </div>
                    
                ))}
            </div>
        </>
    );
};

export default Posts;