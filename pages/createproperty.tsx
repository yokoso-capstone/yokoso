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
import Sidebar from "@/components/sections/Sidebar";
import { ButtonSecondary } from "@/components/core/Button";
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
  const [value, setValue] = React.useState("1");
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
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                  {/* Property Type Radio Buttons */}
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
                    <RadioGroupControl name="propertyType">
                      <HStack>
                        <Stack
                          direction="column"
                          // I had to use padding here because radiogroupcontrol not 
                          // working with justify, if you make it work tell me how lmao
                          paddingLeft={["10%", "15%", "33%", "33%", "33%"]}
                          paddingRight={["5%", "5%", "25%", "25%", "25%"]}
                        >
                          <Icon
                            as={BiBuilding}
                            alignSelf="center"
                            boxSize={16}
                          />
                          <Text textAlign="center">Apartment</Text>
                          <Radio value="Apartment" justifyContent="center" />
                        </Stack>
                        <Stack direction="column">
                          <Icon as={BiHome} alignSelf="center" boxSize={16} />
                          <Text textAlign="center">House</Text>
                          <Radio value="House" justifyContent="center" />
                        </Stack>
                        <Stack
                          direction="column"
                          paddingLeft={["5%", "5%", "25%", "25%", "25%"]}
                          paddingRight={["10%", "15%", "33%", "33%", "33%"]}
                        >
                          <Icon
                            as={BiBuildingHouse}
                            alignSelf="center"
                            boxSize={16}
                          />
                          <Text textAlign="center">Townhouse</Text>
                          <Radio value="Townhouse" justifyContent="center" />
                        </Stack>
                      </HStack>
                    </RadioGroupControl>
                  </Box>
                  {/* Rental Type Radio Buttons */}
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
                    <RadioGroupControl name="rentalType">
                      <HStack spacing={8}>
                        <Stack
                          direction="column"
                          paddingLeft={["0%", "0%", "18%", "18%", "18%"]}
                          paddingRight={["5%", "5%", "20%", "20%", "20%"]}
                        >
                          <Icon
                            as={BsCircleFill}
                            alignSelf="center"
                            boxSize={16}
                          />
                          <Text textAlign="center">Entire Building</Text>
                          <Radio
                            value="Entire Building"
                            justifyContent="center"
                          />
                        </Stack>
                        <Stack direction="column">
                          <Icon
                            as={BsCircleHalf}
                            alignSelf="center"
                            boxSize={16}
                          />
                          <Text textAlign="center">Partial Building</Text>
                          <Radio
                            value="Partial Building"
                            justifyContent="center"
                          />
                        </Stack>
                        <Stack
                          direction="column"
                          paddingLeft={["5%", "5%", "20%", "20%", "20%"]}
                          paddingRight={["0%", "0%", "18%", "18%", "18%"]}
                        >
                          <Icon
                            as={BiDoorOpen}
                            alignSelf="center"
                            boxSize={16}
                          />
                          <Text textAlign="center">Single Room</Text>
                          <Radio value="Single Room" justifyContent="center" />
                        </Stack>
                      </HStack>
                    </RadioGroupControl>
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
