import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import Login from "../pages/login/login"
import Dashboard from "../pages/dashboardAlumno/Dashboard";
import { getToken } from "../helpers/tokenUtilities";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({element:Element,...rest})=>{
    
    const {isAuthenticated} = useContext(AuthContext);
    
    return (          
                <Route 
                    {...rest}
                    element={
                        isAuthenticated() ? (
                            <Element />
                        ):(
                            <redirect to="/login" />
                        )
                    }
                
                />
         
    )
};

export default PrivateRoute;