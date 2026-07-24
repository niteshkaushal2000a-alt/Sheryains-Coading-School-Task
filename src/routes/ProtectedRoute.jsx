// src/routes/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router'; 
import { MyAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(MyAuth);
    
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export default ProtectedRoute;