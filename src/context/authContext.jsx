import { createContext, useContext, useEffect, useState } from "react";
import api from "../util/api";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const login = (token)=>{
        localStorage.setItem('token', token);
        setToken(token);
        setLoadingUser(true);
    };

    const logOut = ()=>{
        localStorage.removeItem('token');
        setToken(null);
    };

    useEffect(()=>{
        const fetchUser = async () => {
            if (!token) {
                setLoadingUser(false); // não tem token, não precisa esperar nada
                return;
            }

            try {
                const response = await api.get('/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    logOut();
                }
            } finally {
                setLoadingUser(false);
            }
        };        
        fetchUser();
    },[token]);

    return(
        <AuthContext.Provider value={{token, user, login, logOut, loadingUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    return useContext(AuthContext);
}