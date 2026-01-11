import React from 'react';
import NavBar from '../pages/Shared/NavBar/NavBar';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className=''>
            <NavBar></NavBar>
            <div className='flex flex-col min-h-screen bg-rose-50 dark:bg-base-300 mt-16'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster />
        </div>
    );
};

export default MainLayout;