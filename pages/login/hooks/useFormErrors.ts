import { useEffect } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';

export const useFormErrors = ( errors: FieldErrors<FieldValues> ): void => {

    // Crea una instancia de Toast
    const toast = useToast();

    // Valida que el formulario no tenga errores
    useEffect(() => {
        // Transforma el objeto de errores a un array y busca el primer error
        Object.values( errors ).find( error => error && toast({
            title: 'Error',
            // @ts-ignore-next-line
            description: error?.message || 'Ocurrion un error en el formulario',
            status: 'warning',
            duration: 2000,
            isClosable: true,
        }))
    }, [ errors, toast ]);
}
