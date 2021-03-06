import Password from "@/components/core/Password";
import {RedButton} from "@/components/core/Button";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
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
                <ModalHeader margin="0 auto">Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing = {4}>
                        <Input variant="outline" placeholder="Email"/>
                        <Password/>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <RedButton size="md" onClick={props.onClose}>Login</RedButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Login;