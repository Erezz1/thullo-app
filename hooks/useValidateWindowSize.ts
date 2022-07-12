import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useWindowSize } from 'hooks';

interface IUseValidateWindowSize {
    minWidth?: number;
    maxWidth?: number;
    message: string;
}

export const useValidateWindowSize = ({
    minWidth = 200,
    maxWidth = 992,
    message,
}: IUseValidateWindowSize ): void => {

    // Obtenemos la funcion para mostrar el componente toast y el tamaño de la ventana
    const toast = useToast();
    const { windowSize } = useWindowSize();

    // Valida si el usuario esta en una resolución de escritorio
    useEffect(() => {
        if ( windowSize.width < maxWidth && windowSize.width > minWidth ) {
            toast({
                title: '¡Atención!',
                description: message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [ windowSize, toast ]);
}
