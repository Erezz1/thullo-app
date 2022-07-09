import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
            const token = localStorage.getItem('token') || '';
            config.headers.Authorization = `Bearer ${ token }`;
        }

        return config;
    },
    ( error ) => {
        // Si hay un error, lo marca en la consola
        return Promise.reject( error );
    }
);

// Interceptor para validar el status de la respuesta
axiosInstance.interceptors.response.use(
    ( response: AxiosResponse ) => {
        // Do something with response data
        return response;
    },
    ( error ) => {
        // Do something with response error
        return Promise.reject( error );
    }
);

export default axiosInstance;
