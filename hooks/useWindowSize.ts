import { useState, useEffect } from 'react';

// Define el tipo de dato que se va a manejar en el hook
interface Size {
    width: number;
    height: number;
}

export const useWindowSize = () => {

    const [ windowSize, setWindowSize ] = useState<Size>({
        width: 0,
        height: 0
    });

    useEffect(() => {

        // Se define el callback que se va a ejecutar
        const handleResize = () => {
            setWindowSize( prev => ({
                width: window.innerWidth,
                height: window.innerHeight
            }));
        }

        window.addEventListener('resize', handleResize );
        handleResize();

        return () => { window.removeEventListener('resize', handleResize ) };
    }, []);

    return { windowSize };
}
