import {  Grid,Button, Box,TextField,Typography, Modal, MenuItem, InputLabel, Alert } from "@mui/material"
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";

const FormularioModificar = ({empresa})=>{

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [region,setRegion] = useState();
    const {register,handleSubmit,formState:{errors},control,reset} = useForm({
        defaultValues:{
            rut_empresa: "",
            razon_social: "",
            direccion: "",
            telefono: "",
            correo: "",
        }
    });
    const [comunas,setComunas] = useState([]);
    const [comuna,setComuna] = useState();
    
    const handleComuna = (event)=>{
        setComuna(event.target.value);
    }

    useEffect(()=>{
        if(empresa){
             reset({
                rut_empresa:empresa.rut_empresa,
                razon_social:empresa.razon_social,
                direccion:empresa.direccion,
                telefono:empresa.telefono,
                correo:empresa.correo
             })
        }
    },[empresa, reset])

    const handleRegion = (event)=>{
        const id = event.target.value;
       
        const actualiza = getcomunas.status=="success" && getcomunas.data.filter((comuna)=>{
            return comuna.id_region === id; 
        })
        setComunas(actualiza);
    
        setRegion(event.target.value);
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const regiones = useQuery("regiones", async()=>{
        const response = await clienteAxios.get("/comuna/getall");
        //console.log(response.data.regiones);
        return response.data.regiones
    });

    const getcomunas = useQuery("comunas", async()=>{
        const response = await clienteAxios.get("/comuna/getComunas");
        return response.data.comuna;
    })
    const getEstados = useQuery("estados",async()=>{
       
    })

    const onSubmit = (data)=>{
        const data_oficial = {
            rut_empresa: data.rut_empresa,
            razon_social: data.razon_social,
            direccion:data.direccion,
            centro_practica: selectedValue == 1 ? true: false,
            correo: data.correo,
            telefono: data.telefono,
            id_comuna: comuna,
            id_estado_empresa: 1

        }
        console.log(data_oficial)
    }

    return (
        <Grid sx={{width:"75%",margin:"0px auto"}}>
           <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{marginTop:"10px"}}>

                     <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                               
                                <Controller name="rut_empresa" control={control} 
                                    render={({field})=>(
                                        <TextField {...field} label="Rut" fullWidth />
                                    )}
                                />
                            </Grid>
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField label="Razón social"
                                {...register("razon_social",{required:true})}
                                fullWidth />
                                {errors.rut_empresa && <Alert sx={{marginTop:"5px"}} severity="error" >Este campo es requerido</Alert>}
                        </Grid>
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField label="Dirección"
                                {...register("direccion",{required:true})}
                                fullWidth />
                                {errors.direccion && <Alert sx={{marginTop:"5px"}} severity="error" >Este campo es requerido</Alert>}
                        </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <InputLabel id="yes-no-select-label">Centro de práctica</InputLabel>
                                <Select required labelId="yes-no-select-label"
                                        id="yes-no-select"
                                        value={selectedValue}
                                        label="Centro de práctica"
                                        onChange={handleChange} 
                                        fullWidth >
                                    <MenuItem value={1}>Si</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                </Select>
                                
                            </Grid>

                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField label="Correo" fullWidth 
                                    {...register("correo",{required:true})}
                                    
                                />
                                {errors.correo && <Alert sx={{marginTop:"5px"}} severity="error" >Este campo es requerido</Alert>}

                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField label="Teléfono" fullWidth 
                                    {...register("telefono",{required:true})}
                                />
                                {errors.telefono && <Alert sx={{marginTop:"5px"}} severity="error" >Este campo es requerido</Alert>}
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <InputLabel>Region</InputLabel>
                                <Select 
                                        
                                        value={region}
                                        label="Región"
                                        onChange={handleRegion} 
                                        fullWidth >
                                        {
                                            regiones.status == "success" && regiones.data.map((region,idx)=>{
                                                return (
                                                    <MenuItem key={idx} value={region.id_region} >{region.nombre_region}</MenuItem>
                                                )
                                            })
                                        }
                                </Select>
                                
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <InputLabel>Comuna</InputLabel>
                                <Select 
                                        
                                        value={comuna}
                                        label="Comuna"
                                        onChange={handleComuna} 
                                        fullWidth >
                                        {
                                            getcomunas.status == "success" && comunas.map((comuna,idx)=>{
                                                return (
                                                    <MenuItem key={idx} value={comuna.id_comuna} >{comuna.nombre}</MenuItem>
                                                )
                                            })
                                        }
                                </Select>
                                
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <InputLabel>Estado Empresa</InputLabel>

                            </Grid >
                          

                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <Button variant="contained"
                                    type="submit"
                                    fullWidth
                                >
                                    Actualizar Empresa
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
        </Grid>
    )
}

export default FormularioModificar;