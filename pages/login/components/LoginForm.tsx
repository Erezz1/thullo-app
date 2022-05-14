import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import {
    Box, Button, Text,
} from '@chakra-ui/react';

import InputFloating from './InputFloating';
import logo from '@/public/images/Logo.svg';

interface IProps {
    register: () => void;
}

const LoginForm = ({ register }: IProps ) => {

    const [ formState, setFormState ] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = event.target;

        setFormState( {
            ...formState,
            [ name ]: value,
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
        >
            <Image
                src={ logo }
                alt="Logotipo"
            />
            <InputFloating
                placeholder="Correo electrónico"
                name="email"
                type="email"
                value={ formState.email }
                onChange={ handleInputChange }
            />
            <InputFloating
                placeholder="Contraseña"
                name="password"
                type="password"
                value={ formState.password }
                onChange={ handleInputChange }
            />

            <Button
                colorScheme="blue"
                alignSelf="flex-end"
                size="sm"
                w="full"
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
                    onClick={ register }
                    ml="2"
                    fontSize="sm"
                >Registrate!</Button>
            </Text>
        </Box>
    )
}

export default LoginForm;
