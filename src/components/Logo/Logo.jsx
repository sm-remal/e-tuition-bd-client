import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to="/" className="text-xl md:text-3xl font-bold text-white">
                    eTuitionBD
            </Link>
        </div>
    );
};

export default Logo;