'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

const ML = () => {
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag') || '';

    return (
        <div>
            {/* <h1 className="text-3xl font-bold mb-6">
                Explore by {tag ? `- ${tag}` : ''}
            </h1>*/}
        </div>
    );
};

export default ML;


