import React, { ReactElement } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Flex,
  Box,
  Stack,
  HStack,
  Radio,
  Text,
  Icon,
  FormErrorMessage,
} from "@chakra-ui/react";
import Head from "next/head";
import { Heading6 } from "@/components/core/Text";
import { ButtonPrimary } from "@/components/core/Button";
import { Formik, Form, Field } from "formik";
import {
  RadioGroupControl,
  SelectControl,
  SwitchControl,
} from "formik-chakra-ui";
import {
  BiBuildingHouse,
  BiBuilding,
  BiHome,
  BiDoorOpen,
} from "react-icons/bi";
import { BsCircleFill, BsCircleHalf } from "react-icons/bs";

// Any string with only letters
function validateLetterString(string: any) {
  let error;
  const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

  if (!string || !re.test(string)) {
    error = "Please enter a valid input - no numbers.";
  }

  return error;
}

// Any number
function validateNumber(num: any) {
  let error;
  const re = /^[0-9]*$/;

  if (!num || !re.test(num)) {
    error = "Please enter a valid number.";
  }

  return error;
}

// 6 digit postal code
function validatePostalCode(string: any) {
  let error;
  const re = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  if (!string || !re.test(string)) {
    error = "Please enter a valid postal code.";
  }

  return error;
}

const initialValues = {
  propertyType: "Apartment",
  rentalType: "Entire Building",
  address: "",
  unitNum: "",
  hideUnit: false,
  country: "Canada",
  province: "",
  postalCode: "",
  city: "",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = (values: any) => {
  sleep(300).then(() => {
    // eslint-disable-next-line no-alert
    window.alert(JSON.stringify(values, null, 2));
  });
};

function CreateProperty(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>

      <Flex width="full" justifyContent="center">
        <Box
          border="1px solid #E9EEF4"
          borderRadius="8px"
          boxShadow="md"
          background="white"
        >
          <Box textAlign="left" padding={8}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form>
                <Stack spacing={8}>
                  {/* Property Type Radio Buttons */}
                  <Heading6 textAlign="center" marginTop={8}>
                    First select a property type
                  </Heading6>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="md"
                    marginBottom={8}
                  >
                    <RadioGroupControl name="propertyType">
                      <HStack spacing="6rem" width="100%" justify="center">
                        <Stack align="center">
                          <Icon as={BiBuilding} boxSize={16} />
                          <Text>Apartment</Text>
                          <Radio value="Apartment" />
                        </Stack>
                        <Stack align="center">
                          <Icon as={BiHome} boxSize={16} />
                          <Text>House</Text>
                          <Radio value="House" />
                        </Stack>
                        <Stack align="center">
                          <Icon as={BiBuildingHouse} boxSize={16} />
                          <Text>Townhouse</Text>
                          <Radio value="Townhouse" />
                        </Stack>
                      </HStack>
                    </RadioGroupControl>
                  </Box>

                  {/* Rental Type Radio Buttons */}
                  <Heading6 textAlign="center">
                    Then select your rental space
                  </Heading6>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="md"
                    marginBottom={8}
                  >
                    <RadioGroupControl name="rentalType">
                      <HStack spacing="5rem" width="100%" justify="center">
                        <Stack align="center">
                          <Icon as={BsCircleFill} boxSize={16} />
                          <Text>Entire Building</Text>
                          <Radio value="Entire Building" />
                        </Stack>
                        <Stack align="center">
                          <Icon as={BsCircleHalf} boxSize={16} />
                          <Text>Partial Building</Text>
                          <Radio value="Partial Building" />
                        </Stack>
                        <Stack align="center">
                          <Icon as={BiDoorOpen} boxSize={16} />
                          <Text>Single Room</Text>
                          <Radio value="Single Room" />
                        </Stack>
                      </HStack>
                    </RadioGroupControl>
                  </Box>

                  <Heading6 textAlign="center">
                    Tell us where it is located
                  </Heading6>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="md"
                    marginBottom={8}
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
                        <FormLabel mb={1.5}>
                          Hide unit number on listing
                        </FormLabel>
                        <SwitchControl name="hideUnit" />
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
                        <SelectControl
                          name="province"
                          selectProps={{ placeholder: "Select option" }}
                          isRequired
                        >
                          <option value="Alberta">Alberta</option>
                          <option value="British Columbia">
                            British Columbia
                          </option>
                          <option value="Manitoba">Manitoba</option>
                          <option value="New Brunswick">New Brunswick</option>
                          <option value="Newfoundland and Labrador">
                            Newfoundland and Labrador
                          </option>
                          <option value="Northwest Territories">
                            Northwest Territories
                          </option>
                          <option value="Nova Scotia">Nova Scotia</option>
                          <option value="Nunavut">Nunavut</option>
                          <option value="Ontario">Ontario</option>
                          <option value="Prince Edward Island">
                            Prince Edward Island
                          </option>
                          <option value="Quebec">Quebec</option>
                          <option value="Saskatchewan">Saskatchewan</option>
                          <option value="Yukon">Yukon</option>
                        </SelectControl>
                      </Box>
                    </Stack>
                    <Stack spacing={3} direction="row">
                      <Field name="postalCode" validate={validatePostalCode}>
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
                  <ButtonPrimary type="submit">Next</ButtonPrimary>
                </Stack>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default CreateProperty;
