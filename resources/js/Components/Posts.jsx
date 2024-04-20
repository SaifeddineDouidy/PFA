import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Posts = ({ result, companies }) => {
    return (
        <>
            <div>
                <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                {result.map((card, index) => (
                    <Link key={index} href={`/detailjobs/${card.props.data.id}`}>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {React.cloneElement(card, { companies })}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Posts;