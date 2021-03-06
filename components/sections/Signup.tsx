import Password from "@/components/core/Password";
import { ButtonLink, ButtonPrimary } from "@/components/core/Button";
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
import { Body2, Heading5 } from "@/components/core/Text";
import {
  auth,
  firestore,
  firestoreTimestamp,
  serverTimestamp,
} from "@/src/firebase";
import { usersPrivate, usersPublic } from "@/src/api/collections";
import { UserPrivate, UserPublic } from "@/src/api/types";

const helperMsg =
  "Password must contain 1 number, 1 uppercase character, 1 lowercase character and be 8 characters or more.";

function validatePassword(password: string) {
  let error;
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  if (!password || !re.test(password)) {
    error = "Please enter a valid password";
  }

  return error;
}

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

function validateFirstName(name: string) {
  let error;
  const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

  if (!name || !re.test(name)) {
    error = "Please enter a valid first name";
  }

  return error;
}

function validateLastName(name: string) {
  let error;
  const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

  if (!name || !re.test(name)) {
    error = "Please enter a valid last name";
  }

  return error;
}

interface SignupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogIn: () => void;
}

function Signup(props: SignupProps) {
  const [dob, setDob] = useState<Date>();
  const { isOpen, onClose, onOpenLogIn } = props;

  function validateDob() {
    let error;

    if (!dob) {
      error = "Please enter date of birth";
    }
    return error;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent
        width="100%"
        minWidth="256px"
        maxWidth={["5.5in", "5in", "5in", "5.5in"]}
        max-height="100vh"
        paddingX={["2.5rem", "3.5rem", "3.5rem"]}
        paddingTop={["3rem", "4rem", "3.5rem"]}
        paddingBottom={["4rem", "5rem", "4rem"]}
      >
        <ModalHeader>
          <Heading5 marginBottom="12px">Sign up</Heading5>
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
            onSubmit={async (values, actions) => {
              // TODO: handle situation where account is created but following db write fails
              // TODO: display error status if sign up fails
              const { email, password } = values;
              const userCredential = await auth.createUserWithEmailAndPassword(
                email,
                password
              );
              const uid = userCredential.user?.uid;

              if (uid) {
                const userPublicData: UserPublic = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  // TODO:
                  profilePicture: "https://placekitten.com/400/400",
                  createdAt: serverTimestamp,
                };

                const userPrivateData: UserPrivate = {
                  // TODO: improve dob handling
                  dob: firestoreTimestamp.fromDate(dob || new Date()),
                  createdAt: serverTimestamp,
                };

                const batch = firestore.batch();

                batch.set(usersPublic.doc(uid), userPublicData);
                batch.set(usersPrivate.doc(uid), userPrivateData);

                await batch.commit();

                actions.setSubmitting(false);
                onClose();
              }
            }}
          >
            {(props) => (
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
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
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
                          onChange={(d: Date) => {
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
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
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
                  <ButtonPrimary
                    size="md"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Sign up
                  </ButtonPrimary>
                </Stack>
              </Form>
            )}
          </Formik>
          <Body2 marginTop="36px">
            Already have an account?{" "}
            <ButtonLink
              fontWeight="bold"
              onClick={() => {
                onClose();
                onOpenLogIn();
              }}
            >
              Log in
            </ButtonLink>
          </Body2>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default Signup;
