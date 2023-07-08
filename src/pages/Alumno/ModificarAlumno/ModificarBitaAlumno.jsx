import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TextField, Button, Container, MenuItem, Select, FormControl, InputLabel, Card, Typography } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

const ModificarBitaAlumno = () => {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_creacion, setFechaCreacion] = useState('');
    const [hora_inicio, setHoraInicio] = useState('');
    const [hora_fin, setHoraFin] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const id_usuario = localStorage.getItem('id_usuario');
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            titulo,
            descripcion,
            fecha_creacion: fecha_creacion,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            id_estado_bitacora: 2, // Reemplaza con el valor correcto
            id_usuario: 1, // Reemplaza con el valor correcto
            id_inscripcion_practica: 26, // Reemplaza con el valor correcto
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


    const getBitacoraAlumno = async () => {
        const response = await clienteAxios.get(`/bitacoralumno/show/${id}`)
        if (response.status == 200) {
            console.log("AQUIIIIIIIIII")
            console.log(response.data)
            setLoading(false)
            // setTitulo(response.data.bitacora.titulo)
            // setDescripcion(response.data.bitacora.descripcion)
            // const fechaupdate = response.data.bitacora.fecha_creacion.split(`T`)[0]
            // console.log(fechaupdate)
            // setFechaCreacion(fechaupdate)
            // const horainicio = response.data.bitacora.hora_inicio.split(`T`)[1]
            // const horainicioupdate = horainicio.substring(0, 5)
            // setHoraInicio(horainicioupdate)
            // console.log(horainicioupdate)

            // const horafin = response.data.bitacora.hora_fin;
            // const horafinupdate = horafin.includes('T') ? horafin.split('T')[1].substring(0, 5) : '';
            // setHoraFin(horafinupdate);


        }
    }
    
    useEffect(() => {
        getBitacoraAlumno()
    }, [])



}

export default ModificarBitaAlumno;