import React from 'react';
import { FadeLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <FadeLoader color='#3B82F6'/>
        </div>
    );
};

export default Loading;