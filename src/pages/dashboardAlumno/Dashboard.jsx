import { Grid, Typography } from "@mui/material";

import HeaderAlumno from "../../components/headers/headerAlumno";
const Dashboard = ()=>{

    const rol = localStorage.getItem("rol")
  
    return(
        <Grid style={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderAlumno/>
            <Typography>Bienvenido ALUMNO   </Typography>
        </Grid>
    )
};

export default Dashboard;