import axios from "axios";
import Swal from "sweetalert2";


const clienteAxios = axios.create({
    baseURL:"http://localhost:3000/api"
})


clienteAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Si la respuesta tiene un código de estado 401
      if (error.response.status === 401) {
        // Realiza las acciones necesarias, como redireccionar a la página de inicio de sesión
        Swal.fire(
            'Error',
            'Credenciales inválidas',
            'error'
          )
        setTimeout(()=>{
        },3000)
      }
      return Promise.reject(error);
    }
  );

export default clienteAxios;