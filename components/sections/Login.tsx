import Password from "@/components/core/Password";
import { ButtonPrimary } from "@/components/core/Button";
import { Formik, Form, Field } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Stack,
  FormControl,
  FormLabel,
  ModalHeader,
} from "@chakra-ui/react";
import { Body2, Heading5, Link } from "@/components/core/Text";
import NextLink from "next/link";
import RoutePath from "@/src/routes";

interface LoginProps {
  isOpen: boolean;
  onClose: any;
}

function Login(props: LoginProps) {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            <Form>
              <Stack spacing="16px">
                <Field name="email" type="email">
                  {({ field }: any) => (
                    <FormControl>
                      <FormLabel>Email Adress</FormLabel>
                      <Input {...field} variant="outline" placeholder="Email" />
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field }: any) => (
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Password {...field} />
                    </FormControl>
                  )}
                </Field>
                <ButtonPrimary isFullWidth marginTop="24px" type="submit">
                  Log in
                </ButtonPrimary>
              </Stack>
            </Form>
          </Formik>
          <Body2 marginTop="36px">
            New to The Yōkoso?{" "}
            <NextLink href={RoutePath.SignUp} passHref>
              <Link>Sign up</Link>
            </NextLink>
          </Body2>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default Login;
