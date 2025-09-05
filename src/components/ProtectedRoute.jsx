import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {
    const {token} = useAuth();    
  return token ? children : <Navigate to='/'/>
}

export default ProtectedRoute