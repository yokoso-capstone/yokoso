import Password from "@/components/core/Password";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Stack
} from "@chakra-ui/react"

interface LoginProps {
    isOpen: boolean,
    onClose: any,
}

function Login(props: LoginProps) {
    return(
        <Modal isOpen = {props.isOpen} onClose={props.onClose} isCentered={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing = {4}>
                        <Input variant="outline" placeholder="Email"/>
                        <Password/>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button>Login</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Login;