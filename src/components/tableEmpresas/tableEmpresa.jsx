import { Alert, CircularProgress, Grid, Tooltip } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../helpers/clienteaxios";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from "@mui/material/Table";
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const TableEmpresa = ()=>{
    const navigate = useNavigate();
    const {data, status} = useQuery("empresas", async()=>{
        const response = await clienteAxios.get("/empresa/getall");
        console.log(response.data);
        return response.data;
    });
    
    const eliminarEmpresa = async(id)=>{
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText:"Cancelar"
          }).then(async(result)  =>  {
            if (result.isConfirmed) {
              // La función de callback se ejecutará si el usuario hace clic en "Aceptar"
              //const response = await axios.delete(`${BASE_API}/${id}`);
                const response = await clienteAxios.delete(`/empresa/delete/${id}`);
              if(response.status===200){
             
                    Swal.fire({
                        title:"Eliminado",
                        text:"La empresa ha sido eliminada correctamente",
                        icon:"success",
                        confirmButtonText:"Aceptar"
                    })
                    setTimeout(()=>{
                        navigate("/dashboard");
                        window.location.reload();
                    },2000)
              }else{
                Swal.fire({
                    title:"Error",
                    text:"Ha ocurrido un error al eliminar la empresa",
                    icon:"error",
                    confirmButtonText:"Aceptar"
                })
              }
               
            }
          });
    }

   

    if(status=="success" && !data.empresas){
        
            return (
                <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"20px"}}>
                <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID_EMPRESA</TableCell>
                        <TableCell >RUT</TableCell>
                        <TableCell >Razon Social</TableCell>
                        <TableCell>Direción</TableCell>
                        <TableCell>Centro Práctica</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Comuna</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                <Alert severity="error"  sx={{margin:"0px auto",marginTop:"10px",marginBottom:"10px",width:"20%",textAlign:"center"}}>No hay empresas registradas</Alert>
                </TableContainer>
            );
        
    }
    
    if(status=="loading"){
        
        return (
            <TableContainer component={Paper} sx={{width:"100%"}}>
            <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell >RUT</TableCell>
                    <TableCell >Razon Social</TableCell>
                    <TableCell>Direción</TableCell>
                    <TableCell>Centro Práctica</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Comuna</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
                </TableHead>
           
            </Table>
            
            <Grid sx={{
                        margin:"0px auto",
                        height:"100px",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        fontFamily:"arial"
                    }}>
                            
                            Cargando datos.....
                            <CircularProgress/>

                    </Grid>

            </TableContainer>
        );
}
    if(status=="success" && data.empresas.length>0){
            
        return (
            <TableContainer component={Paper} sx={{width:"100%"}}>
            <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell >RUT</TableCell>
                    <TableCell >Razon Social</TableCell>
                    <TableCell>Direción</TableCell>
                    <TableCell>Centro Práctica</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Comuna</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.empresas.map((empresa,idx)=>{
                            return (
                                <TableRow key={idx}>
                                    <TableCell>{empresa.id_empresa}</TableCell>
                                    <TableCell>{empresa.rut_empresa}</TableCell>
                                    <TableCell>{empresa.razon_social}</TableCell>
                                    <TableCell>{empresa.direccion}</TableCell>
                                    <TableCell>{empresa.centro_practica ? "Si":"No" }</TableCell>
                                    <TableCell>{empresa.correo}</TableCell>
                                    <TableCell>{empresa.telefono}</TableCell>
                                    <TableCell>{empresa.comuna.nombre}</TableCell>
                                    <TableCell>{empresa.estado_empresa.nombre_estado_empresa}</TableCell>
                                    <TableCell>
                                    
                                    <Tooltip title="Modificar Empresa" >
                                        <EditIcon style={{cursor:"pointer"}} className="iconn" onClick={()=> { navigate(`/modificarEmpresa/${empresa.id_empresa}`) }} />
                                    </Tooltip>
                                    <Tooltip title="Eliminar Empresa">
                                        <DeleteIcon style={{cursor:"pointer"}} className="iconn" onClick={()=> eliminarEmpresa(empresa.id_empresa) } />
                                    </Tooltip>
                                </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
           
            </TableContainer>
        );

    }

    
}



export default TableEmpresa;