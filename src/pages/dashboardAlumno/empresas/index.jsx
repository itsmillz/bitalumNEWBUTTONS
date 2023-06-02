import { Grid, Typography } from "@mui/material";

import TableEmpresa from "../../../components/tableEmpresas/tableEmpresa";

const Empresas = ()=>{

    return (
        <Grid
            sx={{
                width:"100%",
                display:"flex",
                flexDirection:"column"
            }}
        >
            <TableEmpresa/>
            

        </Grid>
    )

}


export default Empresas;