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

interface SignupProps {
    isOpen: boolean,
    onClose: any,
}

function Signup(props: SignupProps) {
    return(
        <Modal isOpen = {props.isOpen} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing = {4}>
                        <Input isRequired = {true} tyep="email" variant="outline" placeholder="First Name"/>
                        <Input isRequired = {true} variant="outline" placeholder="Last Name"/>
                        <Input isRequired = {true} variant="outline" placeholder="Birthday"/>
                        <Input isRequired = {true} variant="outline" placeholder="Email"/>
                        <Password/>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button>Sign up</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Signup;