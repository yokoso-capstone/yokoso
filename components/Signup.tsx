import Password from "@/components/core/Password";
import { BlackButton } from "@/components/core/Button";
import { useState } from "react";
import DatePicker from "@/components/core/DatePicker";
import { Formik, Form, Field } from "formik";
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
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Headline5 } from "@/components/core/Text";

interface SignupProps {
  isOpen: boolean;
  onClose: any;
}

function Signup(props: SignupProps) {
  const [dob, setDob] = useState(undefined);
  const { isOpen, onClose } = props;
  const helperMsg =
    " Pasword must contain 1 number, 1 uppercase character, 1 lowercase character and be 8 characters or more.";

  function validatePassword(password: any) {
    let error;
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    if (!password || !re.test(password)) {
      error = "Please enter a valid password.";
    }

    return error;
  }

  function validateEmail(email: any) {
    let error;
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email || !re.test(email)) {
      error = "Please enter a valid email.";
    }

    return error;
  }

  function validateFirstName(name: any) {
    let error;
    const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

    if (!name || !re.test(name)) {
      error = "Please enter a valid first name";
    }

    return error;
  }

  function validateLastName(name: any) {
    let error;
    const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

    if (!name || !re.test(name)) {
      error = "Please enter a valid last name";
    }

    return error;
  }

  function validateDob() {
    let error;

    if (!dob) {
      error = "Please enter date of birth";
    }
    return error;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="outside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        width="100%"
        minWidth="256px"
        maxWidth={["100%", "4.5in", "5in", "5in", "5.5in"]}
        max-height="100vh"
        paddingX={["2.5rem", "3.5rem", "3.5rem"]}
        paddingTop={["3rem", "4rem", "3.5rem"]}
        paddingBottom={["4rem", "5rem", "4rem"]}
      >
        <ModalHeader>
          <Headline5 marginBottom="12px">Sign up</Headline5>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              dob: "",
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            <Form>
              <Stack spacing={4}>
                <Field name="firstName" validate={validateFirstName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.firstName && form.touched.firstName
                      }
                    >
                      <FormLabel>First Name</FormLabel>
                      <Input
                        {...field}
                        variant="outline"
                        placeholder="First Name"
                        isRequired
                      />
                      <FormErrorMessage>
                        {form.errors.firstName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="lastName" validate={validateLastName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.lastName && form.touched.lastName}
                    >
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        {...field}
                        variant="outline"
                        placeholder="Last Name"
                      />
                      <FormErrorMessage>
                        {form.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="dob" validate={validateDob}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.dob && form.touched.dob}
                    >
                      <FormLabel>Date of Birth</FormLabel>
                      <DatePicker
                        {...field}
                        selectedDate={dob}
                        onChange={(d: any) => {
                          setDob(d);
                        }}
                        showPopperArrow={false}
                        placeholderText="MM/DD/YYYY"
                        maxDate={new Date()}
                      />
                      <FormErrorMessage>{form.errors.dob}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }: any) => (
                    <FormControl
                      id="email"
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        {...field}
                        type="email"
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
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <Stack spacing={2}>
                        <Password {...field} />
                        <FormHelperText>{helperMsg}</FormHelperText>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </Stack>
                    </FormControl>
                  )}
                </Field>
                <BlackButton size="md" type="submit">
                  Sign up
                </BlackButton>
              </Stack>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default Signup;
