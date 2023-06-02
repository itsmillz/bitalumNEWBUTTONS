import { Grid, Typography } from "@mui/material";

import HeaderAlumno from "../../components/headers/headerAlumno";
import Empresas from "../dashboardAlumno/empresas/index"
const Dashboard = ()=>{

    const rol = localStorage.getItem("rol")
  
    return(
        <Grid style={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderAlumno/>
            <Typography variant="h4" sx={{textAlign:"center",fontFamily:"arial",marginTop:"20px",marginBottom:"10px"}}>Listado de empresas</Typography>
            <Empresas/>
        </Grid>
    )
};

export default Dashboard;