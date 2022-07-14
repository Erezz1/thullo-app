import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
    Button,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spinner,
    useEditableControls,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GiCheckMark, GiCancel } from 'react-icons/gi';

import { IList } from 'types';
import { deleteList, updateList } from 'utils';
import { BoardContext } from 'contexts/context';

interface IProps {
    list: IList;
}

const Controls = ({ listId }: { listId: string }) => {

    const board = useContext( BoardContext );

    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls();

    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(
        ( listId: string ) => deleteList({ listId, boardId: board.id }),
    );

    const handleDeleteList = () => {
        mutate(
            listId,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['board', board.id ]);
                }
            }
        );
    }

    if ( isLoading ) {
        return <Spinner />
    }

    return isEditing
        ? (
            <ButtonGroup justifyContent="center" size="sm">
                <Button
                    as={ IconButton }
                    icon={<GiCheckMark />}
                    variant="ghost"
                    type="submit"
                    { ...getSubmitButtonProps() }
                />
                <Button
                    as={ IconButton }
                    icon={<GiCancel />}
                    variant="ghost"
                    { ...getCancelButtonProps() }
                />
            </ButtonGroup>
        )
        : (
            <Menu>
                <MenuButton
                    as={ IconButton }
                    variant="ghost"
                    _focus={{ outline: 'none' }}
                    icon={ <FiMoreHorizontal /> }
                />

                <MenuList>
                    <MenuItem { ...getEditButtonProps() }>Renombrar</MenuItem>
                    <MenuItem onClick={ handleDeleteList }>Eliminar esta lista</MenuItem>
                </MenuList>
            </Menu>
        )
}

const ListSettings = ({ list }: IProps ) => {

    const [ newName, setNewName ] = useState<string>( list.name );

    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(
        ( newName: string ) => updateList({
            listId: list.id,
            name: newName
        })
    )

    const handleSubmit = () => {
        mutate(
            newName,
            {
                onSuccess: data => {
                    queryClient.invalidateQueries(['list', list.id ]);
                }
            }
        );
    }

    return (
        <Editable
            defaultValue={ newName }
            value={ newName }
            onChange={ setNewName }
            fontSize="lg"
            fontWeight="500"
            isPreviewFocusable={ false }
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="5"
            as="form"
            onSubmit={ handleSubmit }
        >
            <EditablePreview isTruncated />
            <Input as={ EditableInput } />
            { !isLoading && <Controls listId={ list.id } /> }
        </Editable>
    )
}

export default ListSettings;
