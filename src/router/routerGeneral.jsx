import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/login"


const RouterGeneral = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route index path="/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterGeneral;