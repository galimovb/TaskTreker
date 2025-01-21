import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const FilterRoute = ({ children }) => {
    const isAuth = !!Cookies.get('jwtToken'); // Проверяем наличие токена в куках

    return isAuth ? children : <Navigate to="/login" replace />;
};
