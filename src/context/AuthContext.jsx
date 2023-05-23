import { createContext, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [token,setToken] = useState(localStorage.getItem("token")|| null);
    
    const login = (token) =>{
        setToken(token);
    } 
    const logout = ()=>{
        setToken(null);
    }
    const isAuthenticated = ()=>{
        return token !==null
    }

    const authContextValue = {
        token,login,logout,isAuthenticated
    }

    return (
        <AuthContext.Provider  value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider};