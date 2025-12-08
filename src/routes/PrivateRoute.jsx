import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';

const PrivateRoutes = ({children}) => {

     const {user, loading} = useAuth()

    const location = useLocation()
    // console.log(location)

    if(loading){
        return <Loading></Loading>
    }

    if(user && user?.email){
        return children
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>

   
};

export default PrivateRoutes;