import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Icon, Text, Textarea } from '@chakra-ui/react';
import { MdDescription } from 'react-icons/md';

const descriptionS = `Simple board to start on a project.

Each list can hold items (cards) that represent ideas or tasks.

There 4 lists here:

* Backlog 🤔 : Ideas are created here. Here people can describe the idea following three simple questions: Why you wish to do it, What it is, how can you do it.

* In Progress📚: Once the ideas is clearly defined, the task can move to #todo stage. Here the owner of the idea can move to #doing once s/he is ready. He can also wait a bit for other members to join.
* In Review ⚙️: On-going
* Completed 🙌🏽**: Finished`;

const Description = () => {

    const [ isEditing, setIsEditing ] = useState<boolean>( false );
    const [ description, setDescription ] = useState<string>( descriptionS );

    const handleEdit = () => setIsEditing( true );
    const handleCancelEdit = () => setIsEditing( false );

    const handleChangeDescription = ( event: ChangeEvent<HTMLTextAreaElement> ) => setDescription( event.target.value );
    const handleSave = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
    };

    return (
        <>
        <Text
                fontWeight="500"
                fontSize="sm"
                color="gray.500"
                display="flex"
                alignItems="center"
        ><Icon as={ MdDescription } mr="2" />Descripcion</Text>

        <form onSubmit={ handleSave }>
            <Textarea
                h={["sm", "sm", "md"]}
                resize="none"
                my="3"
                border="none"
                p="0"
                spellCheck="false"
                style={{
                    padding: isEditing ? "7px" : "0px",
                    border: isEditing ? "1px solid #ccc" : "none",
                }}
                _focus={{ outline: "none" }}
                value={ description }
                onChange={ handleChangeDescription }
                onFocus={ handleEdit }
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
                        onClick={ handleCancelEdit }
                    >Cancelar</Button>
                </>)
            }
        </form>
        </>
    )
}

export default Description;
