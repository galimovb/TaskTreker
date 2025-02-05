import React, {useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';

export const FilterRoute = ({ children }) => {
    const isAuth = !!Cookies.get('jwtToken');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/admin') {
            window.location.href = 'https://localhost:8080/admin';
        }
    }, [location]);

    return isAuth ? children : <Navigate to="/login" replace />;
};
