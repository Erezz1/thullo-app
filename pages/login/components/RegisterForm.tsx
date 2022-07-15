import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Button,
    Input,
    Text,
} from '@chakra-ui/react';

import logo from '@/public/images/Logo.svg';
import axiosInstance from 'client/axiosInstance';
import useFormErrors from '../hooks/useFormErrors';
import { randomAvatar } from 'helpers';

interface IProps {
    onLogin: () => void;
}

// Validaciones de cada campo del formulario
type IFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const schema = yup.object({
    name: yup
        .string()
        .required('El nombre es requerido')
        .min(4, 'El nombre debe tener al menos 4 caracteres'),

    email: yup
        .string()
        .required('El correo es requerido')
        .min(4, 'El correo debe tener al menos 4 caracteres')
        .email('El correo electrónico no es válido'),

    password: yup
        .string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),

    confirmPassword: yup
        .string()
        .required('La contraseña es requerida')
        .oneOf([ yup.ref('password'), null ], 'Las contraseñas no coinciden'),
}).required();

const RegisterForm = ({ onLogin }: IProps ) => {

    // Estado del formulario
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver( schema ),
    });
    const [ isLoading, setIsLoading ] = useState<boolean>( false );

    // Estado de los errores del formulario
    useFormErrors( errors );

    // Funcion para enviar el formulario
    const onSubmit = ( data: IFormInputs ) => {
        setIsLoading( true );
        axiosInstance
            .post('/user/create', {
                name: data.name,
                email: data.email,
                password: data.password,
                imageAvatar: randomAvatar(),
            })
            .then(() => {
                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    callbackUrl: '/boards',
                });
            })
            .catch( error => {
                console.log( error );
                setIsLoading( false );
            });
    }

    return (
        <Box
            bgColor="#FFF"
            shadow="lg"
            rounded="lg"
            py="5" px="10"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="5"
            width="xs"
            as="form"
            onSubmit={ handleSubmit( onSubmit ) }
        >
            <Image
                src={ logo }
                alt="Logotipo"
            />
            <Input
                placeholder="Nombre completo"
                autoComplete="off"
                { ...register('name') }
            />

            <Input
                placeholder="Correo electrónico"
                type="email"
                autoComplete="off"
                { ...register('email') }
            />

            <Input
                placeholder="Contraseña"
                type="password"
                autoComplete="off"
                { ...register('password') }
            />

            <Input
                placeholder="Contraseña"
                type="password"
                autoComplete="off"
                { ...register('confirmPassword') }
            />

            <Button
                colorScheme="blue"
                alignSelf="flex-end"
                size="sm"
                w="full"
                type="submit"
                isLoading={ isLoading }
            >Iniciar sesión</Button>

            <Text
                textAlign="right"
                w="full"
                fontSize="sm"
                color="gray.500"
            >
                ¿Ya tienes cuenta?
                <Button
                    variant="link"
                    onClick={ onLogin }
                    ml="2"
                    fontSize="sm"
                    disabled={ isLoading }
                >Inicia sesion!</Button>
            </Text>
        </Box>
    )
}

export default RegisterForm;
