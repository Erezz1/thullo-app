import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

const Seeker = () => {
    return (
        <InputGroup
            size="md"
            w="80"
            as="form"
            display={["none", "block"]}
        >
            <Input
                pr="4.5rem"
                placeholder="Buscar"
                fontSize="sm"
                rounded="xl"
                border="none"
                boxShadow="0px 2px 7px rgba(0, 0, 0, 0.1)"
                _focus={{
                    outline: "none",
                }}
            />

            <InputRightElement w="auto">
                <Button
                    fontSize="sm"
                    rounded="xl"
                    backgroundColor="#2F80ED"
                    color="#fff"
                    h="8"
                    mr="1"
                    _hover={{
                        backgroundColor: "#265DA5",
                    }}
                    _focus={{
                        outline: "none",
                    }}
                    _active={{
                        backgroundColor: "#2F80ED",
                    }}
                    type="submit"
                >
                    Buscar
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default Seeker;
