import { Button, Grid, Typography } from "@mui/material";

import HeaderAlumno from "../../components/headers/headerAlumno";

const DashboardAlumno = ()=>{
    
  
    return(
        <Grid style={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderAlumno/>
          
            
        </Grid>
    )
};

export default DashboardAlumno;