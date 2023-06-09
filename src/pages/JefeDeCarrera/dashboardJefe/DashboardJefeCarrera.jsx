import { Grid, Typography } from "@mui/material";
import HeaderJefe from "../../../components/headers/headerJefe";


const DashboardJefeCarrera = ()=>{

    return(
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderJefe/>
            <Typography>Dashboard jefe de carrera</Typography>
        </Grid>
    );
}

export default DashboardJefeCarrera;