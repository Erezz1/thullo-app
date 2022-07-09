import { useState } from 'react';

export const useLocalStorage = <T>( key: string, initialValue: T ) => {

    const [ storedValue, setStoredValue ] = useState<T>(() => {
        if ( typeof window === 'undefined' ) {
            return initialValue;
        }

        try {
            // Obtenemos el valor del localStorage
            const item = window.localStorage.getItem( key );

            // Valida si el valor existe, si no existe, retorna el valor inicial
            return item ? JSON.parse( item ) : initialValue;

        } catch ( error ) {
            // Si hay un error, retorna el valor inicial
            console.log( error );
            return initialValue;
        }
    });

    const setValue = ( value: T | (( val: T ) => T ) ) => {
        try {
            // Si el valor es una función, lo ejecutamos
            const valueToStore = value instanceof Function ? value( storedValue ) : value;

            // Seteamos el valor del estado
            setStoredValue(valueToStore);

            // Guardamos el valor en el localStorage
            if (typeof window !== "undefined") {
                window.localStorage.setItem( key, JSON.stringify( valueToStore ));
            }
        } catch ( error ) {
            // Si hay un error se lo imprime en consola
            console.log(error);
        }
    };

    return [ storedValue, setValue ] as const;
}
