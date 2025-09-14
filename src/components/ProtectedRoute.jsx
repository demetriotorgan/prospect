import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {
    const {token, user, loadingUser} = useAuth();    
     if (loadingUser) {
      // enquanto carrega o user, não decide ainda (pode exibir um spinner)
      return <p>Carregando...</p>
    }

    if (!token || !user) {
      return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute