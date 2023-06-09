import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardAlumno from "../pages/Alumno/Dashboard";
import DashboardJefeCarrera from "../pages/JefeDeCarrera/dashboardJefe/DashboardJefeCarrera";
import DashboardProfesional from "../pages/ProfesionalApoyo/dashboardProfesional/DashboardProfesional";


const PrivateRoutes = ()=>{

    const {user} = useContext(AuthContext);

    const rol = localStorage.getItem("rol");
    
    return(
        <Routes>
            {
                rol && rol == 1 && <Route path="/dashboard" element={<DashboardAlumno/>} />             
            }
            {
                rol && rol == 2 &&  <Route path="/dashboard" element={<DashboardJefeCarrera/>} />
            }
            {
                rol && rol == 3 &&  <Route path="/dashboard" element={<DashboardProfesional/>} />
            }
        </Routes>
    )
    /*
    if(user && user.rol == 1){
        return (
            <Routes>
                
            </Routes>
        )
    }
    if(user && user.rol == 2){
        return (
            <Routes>
               
            </Routes>
        )
    }
    if(user && user.rol == 3){
        return (
            <Routes>
               
            </Routes>
        )
    }

    */
};


export default PrivateRoutes;