import { Grid, Typography } from "@mui/material";
import HeaderProfesional from "../../../components/headers/headerProfesional";
import Empresas from "./empresas";

const DashboardProfesional = ()=>{
    return(
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderProfesional/>
            <Empresas/>
        </Grid>
    )
};


export default DashboardProfesional;