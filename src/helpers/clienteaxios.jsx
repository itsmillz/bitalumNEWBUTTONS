import axios from "axios";
import Swal from "sweetalert2";
import { deleteToken, getToken } from "./tokenUtilities";


const clienteAxios = axios.create({
    baseURL:"http://localhost:3000/api"
})


clienteAxios.interceptors.request.use((config)=>{
   const token = getToken();
   const rol = localStorage.getItem("rol");
    
    if(token && rol){
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["rol"] = rol;
       
    }
    return config;

},(error)=>{
    return Promise.reject(error);  
})


clienteAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Si la respuesta tiene un código de estado 401
      if (error.response.status === 401) {
        // Realiza las acciones necesarias, como redireccionar a la página de inicio de sesión
        Swal.fire(
            'Error',
            'No tiene autorización',
            'error'
          )
        setTimeout(()=>{
        },3000)
        window.location.href = "/"
      }
      return Promise.reject(error);
    }
  );



export default clienteAxios;