
import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';
import NotAccess from '../components/NotAccess/NotAccess';

const TutorRoute = ({children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== "tutor") {
        return <NotAccess></NotAccess>
    }
    return children;
};

export default TutorRoute;
