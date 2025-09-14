import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {
    const {token, user} = useAuth();    
    if(!token || !user){
      return <Navigate to='/' replace/>
    }
    return children;
}

export default ProtectedRoute