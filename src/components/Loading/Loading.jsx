import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <HashLoader color='#f20b97' />
        </div>
    );
};

export default Loading;