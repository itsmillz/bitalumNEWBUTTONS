import React from "react";
import clienteAxios from "../../../helpers/clienteaxios";
import { useQuery } from "react-query";
import { Box, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useParams } from 'react-router-dom';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Swal from 'sweetalert2';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const ShowBitaAlumno = () => {
    const {id} = useParams();
    const {data, status, refetch} = useQuery("bitacoralumno", async () => {
        const response = await clienteAxios.get(`bitacoralumno/getall`);
        return response.data.bitacoras;
    }, {
        refetchOnWindowFocus: false
    });


    const navigate = useNavigate();


    const handleNavigate = (id) => {
        navigate(`/detailsbitacoralumno/${id}`);
    }
//Implementacion para eliminar bitácoras de alumnos

const BitacoraDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // La función de callback se ejecutará si el usuario hace clic en "Aceptar"
        //const response = await axios.delete(`${BASE_API}/${id}`);
        const response = await clienteAxios.delete(`/bitacoralumno/delete/${id}`);
        if (response.status === 200) {

          Swal.fire({
            title: "Eliminado",
            text: "La bitácora ha sido eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
          })
          setTimeout(() => {
            navigate("/showbitalumno");
            window.location.reload();
          }, 2000)
        } else {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la bitácora",
            icon: "error",
            confirmButtonText: "Aceptar"
          })
        }

      }
    });
  }


  const BitacoraEdit = (id) => {
    navigate(`/modificarbitacoralumno/${id}`);
  }
  const formato = (texto) => {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  }


  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '0px auto', marginTop: '300px' }}>
        <Typography variant="h5">Por favor, espera. Cargando datos...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'error') {
    return <Typography variant="h5">Error al obtener las bitácoras</Typography>;
  }

  return (
    <Container maxWidth="lg" maxHeight="lg" sx={{
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Centrado vertical
      height: '100vh', // Ocupar toda la altura de la pantalla
      paddingBottom: '85px'
    }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '50px',
          justifyContent: 'center', // Centrado horizontal
          alignItems: 'center', // Centrado vertical
          color: 'inherit',
          marginTop: '60px',
          '&:hover': {
            color: 'orange',
            cursor: 'default',
          },
        }}
      >
        
        <Typography variant="h3" style={{fontSize:35}}>
          Bitácoras del Alumno
        </Typography>
        <ContentPasteGoIcon style={{ fontSize: 35}} color="inherit" />
      </Box>
      {data.length === 0 ? (
        <Typography variant="h5">No hay bitácoras disponibles.</Typography>
      ) : (
        <TableContainer sx={{
          // border: '1px solid black', // Agrega un borde
          borderRadius: '5px', // Redondea los bordes
          maxHeight: '400px', // Altura máxima
          overflow: 'auto', // Muestra una barra de desplazamiento cuando el contenido sobrepasa la altura máxima
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Añade sombra
          marginBottom: 'auto',
          maxWidth: '70%', // Para centrar horizontalmente
          paddingBottom: '5px',
          margin: 'auto' // Para centrar horizontalmente
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '33%', height: '50px' }}>Título:</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '33%', height: '50px' }}>Ver más:</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '33%', height: '50px' }}>Editar:</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '33%', height: '50px' }}>Eliminar:</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((bitacora, idx) => (
                <TableRow key={idx}>
                  <TableCell style={{ width: '33%', height: '50px' }}>{bitacora.titulo}</TableCell>
                  <TableCell style={{ width: '33%', height: '50px' }}>
                    <IconButton onClick={() => handleNavigate(bitacora.id_bitacora)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell style={{ width: '33%', height: '50px' }}>
                    <IconButton onClick={() => BitacoraEdit(bitacora.id_bitacora)}>
                      <ModeEditOutlineIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell style={{ width: '33%', height: '50px' }}>
                    <IconButton onClick={() => BitacoraDelete(bitacora.id_bitacora)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );

}

export default ShowBitaAlumno;