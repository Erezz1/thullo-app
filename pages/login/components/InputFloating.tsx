import { ChangeEvent } from 'react';
import {
    Box,
    ChakraProvider,
    extendTheme,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';

const activeLabelStyles = {
    transform: 'scale(0.85) translateY(-24px)',
}

const theme = extendTheme({
    components: {
        Form: {
            variants: {
                floating: {
                    container: {
                        _focusWithin: {
                            label: {
                                ...activeLabelStyles,
                            },
                        },
                        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
                            ...activeLabelStyles,
                        },
                        label: {
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            position: 'absolute',
                            backgroundColor: 'white',
                            pointerEvents: 'none',
                            mx: 3,
                            px: 1,
                            my: 2.5,
                            transformOrigin: 'left top'
                        },
                    },
                },
            },
        },
    },
});

interface IProps {
    value: string;
    name: string;
    type?: 'text' | 'password' | 'email';
    onChange: ( event: ChangeEvent<HTMLInputElement> ) => void;
    placeholder?: string;
}

const InputFloating = ({ value, type = 'text', name, onChange, placeholder }: IProps ) => {

    return (
        <ChakraProvider theme={ theme }>
            <Box w="full">
                <FormControl variant="floating" id="first-name" isRequired isInvalid={ value === '' }>
                    <Input
                        name={ name }
                        value={ value }
                        onChange={ onChange }
                        type={ type }
                        placeholder=" "
                        isRequired
                    />
                    <FormLabel>{ placeholder }</FormLabel>
                </FormControl>
            </Box>
        </ChakraProvider>
    )
}

export default InputFloating;
