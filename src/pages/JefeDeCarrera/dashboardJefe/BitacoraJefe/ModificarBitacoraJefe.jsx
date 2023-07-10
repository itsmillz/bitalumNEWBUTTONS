import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TextField, Button, Container, MenuItem, Select, FormControl, InputLabel, Card, Typography, Box } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

const ModificarBitacoraJefe = () => {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_creacion, setFechaCreacion] = useState('');
    const [hora_inicio, setHoraInicio] = useState('');
    const [hora_fin, setHoraFin] = useState('');
    const [showError, setShowError] = useState(false);
    const [TipoBitacora, setTipoBitacora] = useState('');
    const [loading, setLoading] = useState(true);
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();


    const tiposbitacoras = useQuery("tipo bitacoras", async () => {

        const response = await clienteAxios.get('/bitacorajefe/tipobitacoras')
        if (response.status === 200) {

            console.log(response.data.tipo_bitacoras)
            return response.data.tipo_bitacoras

        }

    });


    const getEstados = useQuery("estadosbitacora", async () => {

        const response = await clienteAxios.get("/bitacorajefe/estados")

        console.log(response.data)
        if (response.status == 200) {

            return response.data.estados_bitacora;
            
        }

    })

    const id_usuario = localStorage.getItem('id_usuario');

    const onSubmit = async (e) => {

        e.preventDefault();

        const data = {

            titulo,
            descripcion,
            fecha_creacion: fecha_creacion,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            id_tipo_bitacora: TipoBitacora, // Reemplaza con el valor correcto
            id_estado_bitacora: estado, // Reemplaza con el valor correcto
            id_usuario: Number(id_usuario), // Reemplaza con el valor correcto

        }
        console.log(data)

        const response = await clienteAxios.put(`/bitacorajefe/update/${id}`, data);

        console.log(response.data)

        if (response.status == 200) {

            Swal.fire({

                title: "Actualizado",
                text: "La bitácora ha sido actualizada correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",

            })
            setTimeout(() => {

                navigate("/showbitacorajefe");
                // window.location.reload();

            }, 2000)
        }
    }


    const getBitacoraJefe = async () => {

        const response = await clienteAxios.get(`/bitacorajefe/show/${id}`)

        if (response.status == 200) {

            console.log(response.data)
            setLoading(false)
            setTitulo(response.data.bitacora.titulo)
            setDescripcion(response.data.bitacora.descripcion) 
            const fechaupdate = response.data.bitacora.fecha_creacion.split(`T`)[0]
            console.log(fechaupdate)
            setFechaCreacion(fechaupdate)
            const horainicio = response.data.bitacora.hora_inicio.split(`T`)[1]
            const horainicioupdate = horainicio.substring(0, 5)
            setHoraInicio(horainicioupdate)
            console.log(horainicioupdate)

            // const horafin = response.data.bitacora.hora_fin.split(`T`)[1]
            // console.log(horafin)
            // const horafinupdate = hora_fin.substring(0,5)
            // setHoraFin(horafinupdate)
            // console.log(horafinupdate)

            const horafin = response.data.bitacora.hora_fin;
            const horafinupdate = horafin.includes('T') ? horafin.split('T')[1].substring(0, 5) : '';
            setHoraFin(horafinupdate);

            setTipoBitacora(response.data.bitacora.tipo_bitacora.id_tipo_bitacora)

            setEstado(response.data.bitacora.estado_bitacora.id_estado_bitacora)

        }

    }


    useEffect(() => {

        getBitacoraJefe()

    }, [])



    const remainingChars = 1000 - descripcion.length;

    const remainingCharsColor = remainingChars > 200 ? 'green' : remainingChars > 100 ? 'orange' : 'red';


    const remainingCharsTitle = 100 - titulo.length;

    const remainingCharsTitleColor = remainingCharsTitle > 50 ? 'green' : remainingCharsTitle > 25 ? 'orange' : 'red';


    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 1000) {
            setDescripcion(inputValue);
        }
    };


    const handleChangeTitle = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 100) {
            setTitulo(inputValue);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(titulo + descripcion + fecha_creacion + hora_inicio + hora_inicio)
        if (titulo == '' || descripcion == '' || fecha_creacion == '' || hora_inicio == '' || hora_fin == '') {

            Swal.fire({
                title: "Error",
                text: "Rellene todos los campos del formulario",
                icon: "error",
                confirmButtonText: "Aceptar"
            })


            setShowError(true);
            return;
        }

        try {

            const response = await clienteAxios.post('/bitacorajefe/create', {
                titulo,
                descripcion,
                fecha_creacion: fecha_creacion,
                hora_inicio: hora_inicio,
                hora_fin: hora_fin,
                id_tipo_bitacora: TipoBitacora, // Reemplaza con el valor correcto
                id_estado_bitacora: 1, // Reemplaza con el valor correcto
                id_usuario: 3, // Reemplaza con el valor correcto
            });
            console.log(response.data);
            // Realiza las acciones necesarias con la respuesta del servidor
            if (response.status === 200) {
                Swal.fire({
                    title: "Registrada",
                    text: "La bitácora ha sido registrada correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                })
                setTimeout(() => {
                    navigate("/showbitacorajefe")
                }, 1000);

            }

        } catch (error) {
            console.error(error);
            // Realiza acciones en caso de error
        }
    };


    return (
        <Container maxWidth="sm" sx={{ marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:'50px' }}>
            <Card sx={{ padding: '20px' }}>
                <Typography
                    component="h2"
                    sx={{
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'null',
                        transition: 'color 0.3s',
                        '&:hover': { color: 'orange' },
                        textAlign: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        fontSize: '30px'
                    }}
                >

                    <SpeakerNotesIcon sx={{ fontSize: '2rem', verticalAlign: 'middle', marginRight: '10px' }} />
                    Bitácora Jefe de Carrera

                </Typography>


                <TextField
                    label="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 101,
                    }}

                />
                <p style={{ color: remainingCharsTitleColor, fontSize: '15px', textAlign: 'center' }}>
                    {remainingCharsTitle >= 0 ? `Carácteres restantes: ${remainingCharsTitle}` : 'Has superado el límite de carácteres. Por favor, reduce tu título.'}
                </p>

                <TextField
                    label="Fecha de Creación"
                    type="date"
                    value={fecha_creacion}
                    onChange={(e) => setFechaCreacion(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                <TextField
                    label="Hora de Inicio"
                    type="time"
                    value={hora_inicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                <TextField
                    label="Hora de Fin"
                    type="time"
                    value={hora_fin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                {
                    tiposbitacoras.status == 'success' &&
                    <FormControl variant="outlined" fullWidth margin='normal'>
                        <InputLabel htmlFor="bitacora-select">Seleccione tipo bitácora</InputLabel>
                        <Select
                            value={TipoBitacora}
                            onChange={(e) => setTipoBitacora(e.target.value)}
                            id="bitacora-select"
                            label="Seleccione tipo bitácora"
                        >
                            {
                                tiposbitacoras.data.map((tiposbitacora, idx) => (
                                    <MenuItem key={idx} value={tiposbitacora.id_tipo_bitacora}>{tiposbitacora.nombre_tipo_bitacora}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                }


                <FormControl variant="outlined" fullWidth margin='normal'>
                    <InputLabel htmlFor="estado-select">Seleccione estado bitácora</InputLabel>
                    <Select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        id="estado-select"
                        label="Seleccione estado bitácora"
                    >
                        {
                            getEstados.status == "success" && Array.isArray(getEstados.data) &&

                            getEstados.data.map((estado, idx) => (
                                <MenuItem key={idx} value={estado.id_estado_bitacora}>{estado.nombre_estado_bitacora}</MenuItem>
                            ))


                        }
                    </Select>
                </FormControl>


                <TextField
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={10}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        maxLength: 1001,
                    }}

                />

                <p style={{ color: remainingCharsColor, fontSize: '15px', textAlign: 'center' }}>
                    {remainingChars >= 0 ? `Carácteres restantes: ${remainingChars}` : 'Has superado el límite de carácteres. Por favor, reduce tu descripción.'}
                </p>


                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                    sx={{ margin: '20px auto' }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        sx={{ marginBottom: '10px', maxWidth: '300px', width: '100%' }}
                        onClick={handleSubmit}
                        disabled={remainingChars === -1 || remainingCharsTitle === -1} //desactiva el botón cuando no quedan caracteres disponibles
                    >
                        Modificar Bitácora

                    </Button>

                    <Button
                        variant="contained"
                        sx={{ maxWidth: '300px', width: '100%', backgroundColor: '#9e9e9e', color: '#FFFFFF', '&:hover': { backgroundColor: '#757575' } }}
                        onClick={() => navigate("/showbitacorajefe")}
                    >
                        Cancelar

                    </Button>
                </Box>

            </Card>
        </Container>
    );



}

export default ModificarBitacoraJefe;