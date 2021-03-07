import Password from "@/components/core/Password";
import {RedButton} from "@/components/core/Button";
import { useState } from "react";
import DatePicker from "@/components/core/DatePicker";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Stack,
    FormControl,
    FormLabel,
    FormHelperText
} from "@chakra-ui/react"

interface SignupProps {
    isOpen: boolean,
    onClose: any,
}

function Signup(props: SignupProps) {
    const [dob, setDob] = useState(undefined);
    const [error, setError] = useState(true);
    const errorMsg = " Pasword must contain 1 number, 1 uppercase character and be 8 characters or more."

    const validatePassword = (value : any) => {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/

        if (re.test(value)) {
            setError(false);
            console.log(error);
        }
        else if (!re.test(value)){
            setError(true);
            console.log(error)
        }
    }
    
    return(
        <Modal isOpen = {props.isOpen} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader margin="0 auto">Sign up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl id="first-name">
                            <FormLabel>First Name</FormLabel>
                            <Input variant="outline" placeholder="First Name"/>
                        </FormControl>
                        <FormControl id="last-name">
                            <FormLabel>Last Name</FormLabel>
                            <Input variant="outline" placeholder="Last Name"/>
                        </FormControl>
                        <FormControl id="dob-form">
                            <FormLabel>Date of Birth</FormLabel>
                            <DatePicker
                                selectedDate = {dob}
                                onChange={(d : any) => setDob(d)}
                                showPopperArrow={false}
                                placeholderText="MM/DD/YYYY"
                                maxDate={new Date()}
                            /> 
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" variant="outline" placeholder="Email"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Stack spacing ={2}>
                                <Password
                                    isInvalid={error}
                                    onChange = {value => validatePassword(value.target.value)}
                                    focusBorderColor={error? undefined: "green.300"}
                                />
                                <FormHelperText>{errorMsg}</FormHelperText>
                            </Stack>
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <RedButton size="md" onClick={props.onClose}>Sign up</RedButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Signup;