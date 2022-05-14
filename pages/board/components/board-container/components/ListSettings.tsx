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
    useEditableControls,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GiCheckMark, GiCancel } from 'react-icons/gi';

import { IList } from '../../../interfaces';

interface IProps {
    list: IList;
}

const Controls = () => {

    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing
        ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <Button
                    as={ IconButton }
                    icon={<GiCheckMark />}
                    variant="ghost"
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
                    <MenuItem>Eliminar esta lista</MenuItem>
                </MenuList>
            </Menu>
        )
}

const ListSettings = ({ list }: IProps ) => {

    const { name, id } = list;

    return (
        <Editable
            defaultValue={ name }
            fontSize="lg"
            fontWeight="500"
            isPreviewFocusable={ false }
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="5"
        >
            <EditablePreview isTruncated />
            <Input as={ EditableInput } />
            <Controls />
        </Editable>
    )
}

export default ListSettings;
