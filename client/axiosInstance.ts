import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: ( toast ) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// Crea una instancia de axios
const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor para validar los headers a la hora de hacer una petición
axiosInstance.interceptors.request.use(
    ( config: AxiosRequestConfig ) => {
        // Valida que sea el cliente quien hace la peticion y no el servidor
        if ( typeof window === 'undefined' ) {
            return config;
        }

        // Valida que haya headers y, en caso de que si, agrega el token
        if ( config.headers ) {
            try {
                const token = JSON.parse( localStorage.getItem('token') || '' );
                config.headers.Authorization = `Bearer ${ token }`;
            } catch ( error ) {
                console.log( error );
            }
        }

        return config;
    },
    ( error ) => {
        // Si hay un error al hacer la peticion, lo marca en la consola y muestra un toast
        Toast.fire({
            icon: 'error',
            title: 'Ocurrió un error al hacer la petición',
        });
        return console.error( error );
    }
);

// Interceptor para validar el status de la respuesta
axiosInstance.interceptors.response.use(
    ( response: AxiosResponse ) => {
        return response;
    },
    ( error ) => {
        // Muestra una alerta en caso de que haya un error en la respuesta
        if ( error.response?.status < 200 || error.response?.status >= 300 ) {
            Toast.fire({
                title:
                    error.response.data.message === 'Unauthorized'
                        ? 'No tienes permisos para realizar esta acción'
                        : error.response.data.message || error.response.statusText,
                icon: 'warning'
            });
        }

        return Promise.reject( error );
    }
);

export default axiosInstance;
