
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";


const PublicRoutes = ()=>{

    return(
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    )

}

export default PublicRoutes;