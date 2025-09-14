import { createContext, useContext, useEffect, useState } from "react";
import api from "../util/api";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);

    const login = (token)=>{
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logOut = ()=>{
        localStorage.removeItem('token');
        setToken(null);
    };

    useEffect(()=>{
        if (!token) return; // não faz nada se não tiver token        
        
            api.get('/me',{
                headers:{
                     Authorization: `Bearer ${token}`,
                },
            })
            .then(response =>{
                setUser(response.data);
                // console.log('Usario: ', response.data);
            })
            .catch(error =>{
                console.error(error);
            });
        
    },[token]);

    return(
        <AuthContext.Provider value={{token, user, login, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    return useContext(AuthContext);
}