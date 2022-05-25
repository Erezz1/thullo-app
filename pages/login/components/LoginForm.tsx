import { ChangeEvent, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import {
    Box,
    Button,
    Input,
    Text,
} from '@chakra-ui/react';

import logo from '@/public/images/Logo.svg';

interface IProps {
    register: () => void;
}

const LoginForm = ({ register }: IProps ) => {

    const { data: session } = useSession();
    console.log( session );

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

    const handleSubmit = async ( event: any ) => {
        signIn();
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
            onSubmit={ handleSubmit }
        >
            <Image
                src={ logo }
                alt="Logotipo"
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

            <Button
                colorScheme="blue"
                alignSelf="flex-end"
                size="sm"
                w="full"
                type="submit"
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
