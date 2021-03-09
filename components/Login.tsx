import Password from "@/components/core/Password";
import {RedButton} from "@/components/core/Button";
import {Formik, Form, Field} from "formik";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Input,
    Stack,
    FormControl,
    FormLabel
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
                    <Formik 
                        initialValues={{
                            email:'',
                            password:''
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                actions.setSubmitting(false)
                            }, 1000)
                        }}
                    >
                        <Form>
                            <Stack spacing = {4}>
                                <Field name="email" type="email">
                                    {({field} : any) => (
                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Input {...field} variant="outline" placeholder="Email"/>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({field} : any) => (
                                        <FormControl>
                                            <FormLabel>Password</FormLabel>
                                            <Password {...field}/>
                                        </FormControl>
                                    )}
                                </Field>
                                <RedButton size="md" type="submit">Login</RedButton>
                            </Stack>
                        </Form>
                    </Formik>
                </ModalBody>
                <ModalFooter/>
            </ModalContent>
        </Modal>
    );
}

export default Login;