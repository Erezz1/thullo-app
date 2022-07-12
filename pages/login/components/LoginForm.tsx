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
import { useFormErrors } from '../hooks';

interface IProps {
    onRegister: () => void;
}

// Validaciones de cada campo del formulario
type IFormInputs = {
    email: string;
    password: string;
}
const schema = yup.object({
    email: yup
        .string()
        .required('El correo es requerido')
        .min(4, 'El correo debe tener al menos 4 caracteres')
        .email('El correo electrónico no es válido'),

    password: yup
        .string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).required();

const LoginForm = ({ onRegister }: IProps ) => {

    // Estado del formulario
    const { register: reg, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver( schema ),
    });
    const [ isLoading, setIsLoading ] = useState<boolean>( false );

    // Estado de los errores del formulario
    useFormErrors( errors );

    // Funcion para enviar el formulario
    const onSubmit = async ( data: IFormInputs ) => {
        setIsLoading( true );
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/boards',
        })
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
                placeholder="Correo electrónico"
                type="email"
                autoComplete="off"
                { ...reg('email') }
            />
            <Input
                placeholder="Contraseña"
                type="password"
                autoComplete="off"
                { ...reg('password') }
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
                ¿No tienes cuenta?
                <Button
                    variant="link"
                    onClick={ onRegister }
                    ml="2"
                    fontSize="sm"
                    disabled={ isLoading }
                >Registrate!</Button>
            </Text>
        </Box>
    )
}

export default LoginForm;
