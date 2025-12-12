import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import useRole from '../hooks/useRole';
import NotAccess from '../components/NotAccess/NotAccess';

const AdminRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(role !== "admin"){
        return <NotAccess></NotAccess>
    }
    return children;
};

export default AdminRoute;