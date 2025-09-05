import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (token)=>{
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logOut = ()=>{
        localStorage.removeItem('token');
        setToken(null);
    };

    return(
        <AuthContext.Provider value={{token, login, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    return useContext(AuthContext);
}