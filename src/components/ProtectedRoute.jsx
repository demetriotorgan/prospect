import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router';
import loading from '../assets/loading.gif'

const ProtectedRoute = ({children}) => {
    const {token, user, loadingUser} = useAuth();    
     if (loadingUser) {
      // enquanto carrega o user, não decide ainda (pode exibir um spinner)
      return <img src="loading" alt="" 
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }} 
      />
    }

    if (!token || !user) {
      return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute