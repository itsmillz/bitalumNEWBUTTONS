import { Grid,Button, Box,TextField,Typography, Modal, MenuItem, InputLabel, Alert } from "@mui/material";
import Select from "@mui/material/Select"

import { useState } from "react";
import FormularioRegistro from "./formulario_registro";
import TableEmpresa from "../../../../components/tableEmpresas/tableEmpresa"

const Empresas = ()=>{
 
    return (
        <Grid
            sx={{
                width:"100%",
                display:"flex",
                flexDirection:"column"
            }}
        > 
          <Typography variant="h4" sx={{textAlign:"center",fontFamily:"arial",marginTop:"20px",marginBottom:"10px"}}>Listado de empresas</Typography>
            <FormularioRegistro/>
            <TableEmpresa/>
            

        </Grid>
    )

}


export default Empresas;