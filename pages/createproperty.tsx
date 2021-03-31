import React, { ReactElement } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Flex,
  Box,
  Stack,
  Switch,
  useRadioGroup,
  HStack,
  FormErrorMessage
} from "@chakra-ui/react";
import Head from "next/head";
import { Heading6 } from "@/components/core/Text";
import Sidebar from "@/components/sections/Sidebar";
import ProvinceSelector from "@/components/core/ProvinceSelector";
import { ButtonSecondary } from "@/components/core/Button";
import PropertyRadio from "@/components/core/PropertyRadio";
import { Formik, Form, Field } from "formik";

function PropRadio() {
  const options = ["Apartment", "House", "Town House"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
  });

  const group = getRootProps();

  return (
    <HStack {...group} justify="space-between">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <PropertyRadio key={value} {...radio}>
            {value}
          </PropertyRadio>
        );
      })}
    </HStack>
  );
}

function RentalRadio() {
  const options = ["Entire Building", "Partial Building", "Single Room"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
  });

  const group = getRootProps();

  return (
    <HStack {...group} justify="space-between">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <PropertyRadio key={value} {...radio}>
            {value}
          </PropertyRadio>
        );
      })}
    </HStack>
  );
}

function validatePropertyType(type: any) {
  let error;
  const re = "None";

  if (!type || re === type) {
    error = "Please make a selection.";
  }

  return error;
}

function validateLetterString(string: any) {
  let error;
  const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

  if (!string || !re.test(string)) {
    error = "Please enter a valid input.";
  }

  return error;
}

function validateNumber(num: any) {
  let error;
  const re = /^[0-9]*$/;

  if (!num || !re.test(num)) {
    error = "Please enter a valid number.";
  }

  return error;
}

function validateString(string: any) {
  let error;
  const re = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  if (!string || !re.test(string)) {
    error = "Please enter a valid input.";
  }

  return error;
}

function CreateProperty(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>

      <Flex direction="row">
        <Box display={["none", "none", "none", "block", "block"]}>
          <Sidebar />
        </Box>
        <Flex
          width="full"
          align="center"
          justifyContent="center"
          marginLeft={["0px", "0px", "0px", "200px", "200px"]}
          marginTop="10px"
        >
          <Box borderWidth={1} boxShadow="lg">
            <Box my={4} textAlign="left">
              <Formik
                initialValues={{
                  propertyType: "None",
                  rentalType: "None",
                  address: "",
                  unitNum: "",
                  hideUnit: "",
                  country: "Canada",
                  province: "",
                  postalCode: "",
                  city: "",
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 1000);
                }}
              >
                <Form>
                  <Heading6 textAlign="center" mb={4}>
                    First select a property type
                  </Heading6>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="md"
                    margin={8}
                  >
                    <Field name="propertyType" validate={validatePropertyType}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.propertyType &&
                            form.touched.propertyType
                          }
                        >
                          <PropRadio {...field} />
                          <FormErrorMessage>
                            {form.errors.propertyType}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Heading6 textAlign="center" mb={4}>
                    Then select your rental space
                  </Heading6>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="md"
                    margin={8}
                  >
                    <Field name="rentalType" validate={validatePropertyType}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.rentalType && form.touched.rentalType
                          }
                        >
                          <RentalRadio {...field} />
                          <FormErrorMessage>
                            {form.errors.rentalType}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Heading6 textAlign="center" mb={4}>
                    Tell us where it is located
                  </Heading6>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="md"
                    margin={8}
                    justifyContent="center"
                  >
                    <Stack spacing={3}>
                      <Field name="address" validate={validateLetterString}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.address && form.touched.address
                            }
                          >
                            <FormLabel>Street Address</FormLabel>
                            <Input
                              {...field}
                              variant="flushed"
                              borderBottomColor="gray"
                              placeholder="Belleview Drive"
                              isRequired
                            />
                            <FormErrorMessage>
                              {form.errors.address}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="unitNum" validate={validateNumber}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.unitNum && form.touched.unitNum
                            }
                          >
                            <FormLabel>Unit Number</FormLabel>
                            <Input
                              {...field}
                              variant="flushed"
                              borderBottomColor="gray"
                              placeholder="88"
                              width="50%"
                              isRequired
                            />
                            <FormErrorMessage>
                              {form.errors.unitNum}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb={3}>Hide unit number on listing</FormLabel>
                        <Switch id="hide-unit-number" size="lg" />
                      </FormControl>
                    </Stack>
                    <Stack paddingBottom={3} spacing={3} direction="row">
                      <Box width="50%">
                        <FormLabel>Country</FormLabel>
                        <Input
                          placeholder="Canada"
                          isDisabled
                          borderColor="gray"
                        />
                      </Box>
                      <Box width="50%">
                        <FormLabel>Province</FormLabel>
                        <ProvinceSelector />
                      </Box>
                    </Stack>
                    <Stack spacing={3} direction="row">
                      <Field name="postalCode" validate={validateString}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.postalCode && form.touched.postalCode
                            }
                          >
                            <FormLabel>Postal Code</FormLabel>
                            <Input
                              {...field}
                              variant="flushed"
                              borderBottomColor="gray"
                              placeholder="A0B 1C2"
                              isRequired
                            />
                            <FormErrorMessage>
                              {form.errors.postalCode}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="city" validate={validateLetterString}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.city && form.touched.city}
                          >
                            <FormLabel>City</FormLabel>
                            <Input
                              {...field}
                              variant="flushed"
                              borderBottomColor="gray"
                              placeholder="Ottawa"
                              isRequired
                            />
                            <FormErrorMessage>
                              {form.errors.city}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <ButtonSecondary type="submit" width="50%">
                      Next
                    </ButtonSecondary>
                  </Box>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default CreateProperty;
