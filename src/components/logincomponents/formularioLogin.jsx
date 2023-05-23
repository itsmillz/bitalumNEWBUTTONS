import { Input, Key, Lock, PermIdentity } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, FormLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useRut } from "react-rut-formatter";
import {setToken} from "../../helpers/tokenUtilities";
import clienteAxios from "../../helpers/clienteaxios" 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioLogin = ()=>{
    const { rut, updateRut, isValid } = useRut();
    const {register,handleSubmit,reset,formState:{errors}} = useForm({
        defaultValues:{
            contrasena:""
        }
    })
    const navigate = useNavigate();

    const onSubmit = async(data)=>{

        const datos = {
            rut:rut.formatted,
            contrasena:data.contrasena
        }
        const response = await clienteAxios.post("/auth/login",datos);
        console.log(response.data)
        if(response.status==200){
            switch(response.data.rol){
                case 1:{
                    setToken(response.data.token);
                    localStorage.setItem("rol",response.data.rol);
                    localStorage.setItem("rut",response.data.alumno.rut);
                    Swal.fire(
                        'Iniciando sesión',
                        'Redireccionando .......',
                        'success'
                      )
                    setTimeout(()=>{
                        navigate("/dashboard")
                    },3000)
                   
                    
                    break;
                }
                case 2:{
                    console.log("Se ha logueado el jefe de carrera");
                    break;
                }
                case 3:{
                    console.log("Se ha logueado el personal de apoyo");
                    break;
                }
                
            }
        }
       
        reset()
    }
    return (
        <Card sx={{width:"40%",padding:"10px",margin:"0px auto",marginTop:"30px"}}>
            <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Typography sx={{fontSize:"20px",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"5px",marginBottom:"15px"}}>Bienvenid@ <Input style={{marginLeft:"5px"}} /></Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                        <Box sx={{marginBottom:"15px",display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                            <TextField 
                        
                            label="Rut" 
                            name="rut"
                            value={rut.formatted} 
                            onChange={(e)=>updateRut(e.target.value)}

                            />
                            <PermIdentity style={{width:"40px"}}/>
                            {rut.formatted.length>0 && !isValid && <Alert style={{width:"60%",marginTop:"10px"}} severity="error">Rut inválido</Alert> }
                           
                            
                        </Box>
                        <Box sx={{marginBottom:"15px",display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                            <TextField  type="password" label="Contraseña"
                                name="contrasena"
                                {...register("contrasena",{required:true})}
                            />
                            <Lock style={{width:"40px"}}/>
                            {errors.password && <Alert style={{width:"50%",marginTop:"10px"}} severity="error">Este campo es requerido</Alert>}
                        </Box>
                        
                        <Box sx={{display:"flex",justifyContent:"center"}} >
                            <Button variant="contained" type="submit" >  <Key style={{marginRight:"5px"}} />  Ingresar</Button>
                        </Box>
                    </form>
            </CardContent>
           
        </Card>
    )
}

export default FormularioLogin;