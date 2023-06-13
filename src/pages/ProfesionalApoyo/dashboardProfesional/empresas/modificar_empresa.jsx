import { Typography,Grid } from "@mui/material"
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import FormularioModificar from "./components/formularioModificar";


const ModificarEmpresa = ()=>{
    const {id} = useParams();

    const {data,status} = useQuery("empresa", async()=>{
        const response = await clienteAxios.get(`/empresa/show/${id}`);
        console.log(response.data);
        if(response.status==200){
            return response.data;
        }
    });

    if(status=="success"){
        return (
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                <HeaderProfesional/>
                {/* <Typography variant="h5" sx={{textAlign:"center",marginTop:"10px",marginBottom:"10px"}} >Empresa seleccionada: {empresa.data.empresa.razon_social} </Typography> */}
                <FormularioModificar  empresa={data.empresa}  />
            </Grid>
        )
    }   
    
}

export default ModificarEmpresa;
