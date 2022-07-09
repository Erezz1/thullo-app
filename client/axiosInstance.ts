import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { createStandaloneToast } from '@chakra-ui/toast';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const toast = createStandaloneToast();

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
            const token = JSON.parse( localStorage.getItem('token') || '' );
            config.headers.Authorization = `Bearer ${ token }`;
        }

        return config;
    },
    ( error ) => {
        // Si hay un error al hacer la peticion, lo marca en la consola y muestra un toast
        toast({
            title: `Error`,
            status: 'error',
            description: 'Ocurrió un error al recibir la respuesta',
            duration: 5000,
            isClosable: true,
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
        if ( error.response.status < 200 || error.response.status >= 300 ) {
            toast({
                title: `Error #${ error.response.status }`,
                status: 'warning',
                description: error.response.data.message || error.response.statusText,
                duration: 5000,
                isClosable: true,
            });
        }

        return Promise.reject( error );
    }
);

export default axiosInstance;
