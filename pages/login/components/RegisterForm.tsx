import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import {
    Box,
    Button,
    Input,
    Text,
} from '@chakra-ui/react';

import logo from '@/public/images/Logo.svg';

interface IProps {
    login: () => void;
}

const RegisterForm = ({ login }: IProps ) => {

    const [ formState, setFormState ] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
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
            <Input
                placeholder="Correo electrónico"
                name="name"
                value={ formState.name }
                onChange={ handleInputChange }
                autoComplete="off"
            />

            <Input
                placeholder="Correo electrónico"
                name="email"
                type="email"
                value={ formState.email }
                onChange={ handleInputChange }
                autoComplete="off"
            />

            <Input
                placeholder="Contraseña"
                name="password"
                type="password"
                value={ formState.password }
                onChange={ handleInputChange }
                autoComplete="off"
            />

            <Input
                placeholder="Contraseña"
                name="passwordConfirmation"
                type="password"
                value={ formState.passwordConfirmation }
                onChange={ handleInputChange }
                autoComplete="off"
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
                ¿Ya tienes cuenta?
                <Button
                    variant="link"
                    onClick={ login }
                    ml="2"
                    fontSize="sm"
                >Inicia sesion!</Button>
            </Text>
        </Box>
    )
}

export default RegisterForm;
