import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardAlumno from "../pages/Alumno/Dashboard";
import DashboardJefeCarrera from "../pages/JefeDeCarrera/dashboardJefe/DashboardJefeCarrera";
import DashboardProfesional from "../pages/ProfesionalApoyo/dashboardProfesional/DashboardProfesional";
import ModificarEmpresa from "../pages/ProfesionalApoyo/dashboardProfesional/empresas/modificar_empresa";


const PrivateRoutes = ()=>{

    const {user} = useContext(AuthContext);

    const rol = localStorage.getItem("rol");
    
    
    if(rol && rol == 1 ){
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardAlumno/>} />  
            </Routes>
        )
    }
    if(rol && rol == 2){
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardJefeCarrera/>} />
            </Routes>
        )
    }
    if(rol && rol == 3){
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardProfesional/>} />
                <Route path="modificarEmpresa/:id" element={<ModificarEmpresa/>} />
            </Routes>
        )
    }

};


export default PrivateRoutes;