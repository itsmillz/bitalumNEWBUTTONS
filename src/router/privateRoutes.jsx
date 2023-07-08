import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardAlumno from "../pages/Alumno/Dashboard";
import DashboardJefeCarrera from "../pages/JefeDeCarrera/dashboardJefe/DashboardJefeCarrera";
import DashboardProfesional from "../pages/ProfesionalApoyo/dashboardProfesional/DashboardProfesional";
import ModificarEmpresa from "../pages/ProfesionalApoyo/dashboardProfesional/empresas/modificar_empresa";
import BitacorasJefe from "../pages/JefeDeCarrera/dashboardJefe/BitacoraJefe/BitacorasJefe";
import BitacoraRender from "../pages/JefeDeCarrera/dashboardJefe/BitacoraJefe/BitacoraRender";
import DetailsBitacora from "../pages/JefeDeCarrera/dashboardJefe/BitacoraJefe/DetailsBitacora";
import EditingBit from "../pages/JefeDeCarrera/dashboardJefe/BitacoraJefe/EditingBit";
import BitAlumnoRender from "../pages/Alumno/CreateBitacoAlumno/BitaAlumnoRender";
import RenderBitaAlumno from "../pages/Alumno/ShowBitaAlum/RenderBitaAlumno";
import RenderDetailsAlumno from "../pages/Alumno/DetailsAlumno/RenderDetailsAlumno";
import EditingBitAlumno from "../pages/Alumno/ModificarAlumno/EditingBitAlumno";
const PrivateRoutes = () => {

    const { user } = useContext(AuthContext);

    const rol = localStorage.getItem("rol");


    if (rol && rol == 1) {
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardAlumno />} />
                <Route path="/bitacoralumno" element={<BitAlumnoRender />} />
                <Route path="/showbitalumno" element={<RenderBitaAlumno/>} />
                <Route path="/detailsbitacoralumno/:id" element={<RenderDetailsAlumno/>} />
                <Route path="/modificarbitacoralumno/:id" element={<EditingBitAlumno/>} />
            </Routes>
        )
    }
    if (rol && rol == 2) {
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardJefeCarrera />} />
                <Route path="/bitacorajefe" element={<BitacorasJefe />} />
                <Route path="/showbitacorajefe" element={<BitacoraRender />} />
                <Route path="/detailsbitacorajefe/:id" element={<DetailsBitacora/>} />
                <Route path="/modificarbitacorajefe/:id" element={<EditingBit/>}/>
            </Routes>

        )
    }
    if (rol && rol == 3) {
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardProfesional />} />
                <Route path="modificarEmpresa/:id" element={<ModificarEmpresa />} />
            </Routes>
        )
    }

};


export default PrivateRoutes;