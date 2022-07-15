import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import {
    Box,
    Button,
    Icon,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { MdDescription } from 'react-icons/md';

interface IProps {
    title: string;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
}

const Description = ({ title, description, setDescription }: IProps ) => {

    const [ isEditing, setIsEditing ] = useState<boolean>( false );

    const handleSave = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
    };

    return (
        <Box>
            <Text fontWeight="500">{ title }</Text>
            <form onSubmit={ handleSave }>
                <Text
                    fontWeight="500"
                    fontSize="sm"
                    color="gray.500"
                    display="flex"
                    alignItems="center"
                    my="3"
                >
                    <Icon mr="2" as={ MdDescription } />
                    Descripcion
                </Text>
                <Textarea
                    h="2xs"
                    resize="none"
                    mb="3"
                    border="none"
                    p="0"
                    spellCheck="false"
                    fontSize="sm"
                    style={{
                        padding: isEditing ? "7px" : "0px",
                        border: isEditing ? "1px solid #ccc" : "none",
                    }}
                    _focus={{ outline: "none" }}
                    value={ description }
                    onChange={ event => setDescription( event.target.value ) }
                    onFocus={ () => setIsEditing( true ) }
                />
                {
                    isEditing && (<>
                        <Button
                            colorScheme="green"
                            size="sm"
                            type="submit"
                        >Guardar</Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            ml="3"
                            onClick={ () => setIsEditing( false ) }
                        >Cancelar</Button>
                    </>)
                }
            </form>
        </Box>
    )
}

export default Description;
