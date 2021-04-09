import Password from "@/components/core/Password";
import { ButtonLink, ButtonPrimary } from "@/components/core/Button";
import { Formik, Form, Field } from "formik";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  ModalHeader,
} from "@chakra-ui/react";
import { Body2, Heading5 } from "@/components/core/Text";
import { auth } from "@/src/firebase";

function validateEmail(email: string) {
  let error;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) {
    error = "Please enter an email";
  } else if (!re.test(email)) {
    error = "Please enter a valid email";
  }

  return error;
}

function validatePassword(password: string) {
  let error;

  if (!password) {
    error = "Please enter your password.";
  }

  return error;
}

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

function Login(props: LoginProps) {
  const { isOpen, onClose, onOpenSignUp } = props;
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        width="100%"
        minWidth="256px"
        maxWidth={["4.5in", "5in", "5in", "5.5in"]}
        paddingX={["2.5rem", "3.5rem", "3.5rem"]}
        paddingTop={["3rem", "4rem", "5rem"]}
        paddingBottom={["4rem", "5rem", "6rem"]}
      >
        <ModalHeader>
          <Heading5 marginBottom="12px">Log in</Heading5>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, actions) => {
              const { email, password } = values;
              try {
                await auth.signInWithEmailAndPassword(email, password);
                onClose();
              } catch (error) {
                actions.setSubmitting(false);
                const wrongPassword = error.code === "auth/wrong-password";
                toast({
                  title: wrongPassword ? "Incorrect password" : "Invalid email",
                  description: wrongPassword
                    ? "The password is invalid."
                    : "The account does not exist.",
                  status: "error",
                  duration: 4000,
                  isClosable: true,
                });
              }
            }}
          >
            {(props) => (
              <Form>
                <Stack spacing="16px">
                  <Field name="email" type="email" validate={validateEmail}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email Address</FormLabel>
                        <Input
                          {...field}
                          variant="outline"
                          placeholder="Email"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <Password {...field} />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <ButtonPrimary
                    isFullWidth
                    marginTop="24px"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Log in
                  </ButtonPrimary>
                </Stack>
              </Form>
            )}
          </Formik>
          <Body2 marginTop="36px">
            New to The Yōkoso?{" "}
            <ButtonLink
              fontWeight="bold"
              onClick={() => {
                onClose();
                onOpenSignUp();
              }}
            >
              Sign up
            </ButtonLink>
          </Body2>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default Login;
