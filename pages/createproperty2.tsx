import React, { ReactElement, useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Flex,
  Box,
  Stack,
  Divider,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";
import { Heading6 } from "@/components/core/Text";
import { ButtonPrimary } from "@/components/core/Button";
import { Formik, Form, Field } from "formik";
import DatePicker from "@/components/core/DatePicker";
import {
  CheckboxContainer,
  CheckboxControl,
  SelectControl,
  SwitchControl,
} from "formik-chakra-ui";
import Dropzone from "react-dropzone";

// Any number
function validateNumber(num: any) {
  let error;
  const re = /^[0-9]*$/;

  if (!num || !re.test(num)) {
    error = "Please enter a valid number.";
  }

  return error;
}

function validateAvailabilityDate(date: any) {
  let error;

  if (!date) {
    error = "Please enter availability date";
  }
  return error;
}

const initialValues = {
  size: "",
  privateBathrooms: "",
  sharedBathrooms: "",
  occupancy: "",
  furnishedStatus: "",
  smokingAllowed: false,
  petsAllowed: false,
  rentalPrice: "",
  paymentFrequency: "",
  leaseType: "",
  availabilityDate: "",
  minLeaseDuration: "",
  features: [],
  featureDescription: "",
  utilities: [],
  utilitiesDescription: "",
  propertyDescription: "",
  files: [] as any,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = (values: any) => {
  sleep(300).then(() => {
    // eslint-disable-next-line no-alert
    window.alert(JSON.stringify(values, null, 2));
  });
};

function CreateProperty(): ReactElement {
  const [availabilityDate, setAvailabilityDate] = useState<Date>();
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
              {({ setFieldValue, isSubmitting }) => (
                <Form>
                  <Stack spacing={8}>
                    <Heading6 textAlign="center" marginTop={8}>
                      Enter Details
                    </Heading6>
                    <Box
                      p={8}
                      borderWidth={1}
                      borderRadius={8}
                      boxShadow="md"
                      marginBottom={8}
                    >
                      <Stack spacing={5}>
                        <Stack direction="row" spacing={5}>
                          <Field name="size" validate={validateNumber}>
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.size && form.touched.size
                                }
                              >
                                <FormLabel>Rental Size (Sq.Ft)</FormLabel>
                                <Input
                                  {...field}
                                  variant="flushed"
                                  borderBottomColor="gray"
                                  placeholder="500"
                                  isRequired
                                />
                                <FormErrorMessage>
                                  {form.errors.size}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Box width="100%">
                            <FormLabel>Private Bathrooms</FormLabel>
                            <SelectControl
                              name="privateBathrooms"
                              selectProps={{ placeholder: "Select option" }}
                              isRequired
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4+">4+</option>
                            </SelectControl>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={5}>
                          <Box width="100%">
                            <FormLabel>Shared Bathrooms</FormLabel>
                            <SelectControl
                              name="sharedBathrooms"
                              selectProps={{ placeholder: "Select option" }}
                              isRequired
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4+">4+</option>
                            </SelectControl>
                          </Box>
                          <Box width="100%">
                            <FormLabel>Max Occupancy</FormLabel>
                            <SelectControl
                              name="occupancy"
                              selectProps={{ placeholder: "Select option" }}
                              isRequired
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8+">8+</option>
                            </SelectControl>
                          </Box>
                        </Stack>
                        <Box>
                          <FormLabel>Furnished Status</FormLabel>
                          <SelectControl
                            name="furnishedStatus"
                            selectProps={{ placeholder: "Select option" }}
                            isRequired
                          >
                            <option value="unfurnished">Unfurnished</option>
                            <option value="furnished">Furnished</option>
                            <option value="semi-furnished">
                              Semi-Furnished
                            </option>
                          </SelectControl>
                        </Box>
                        <Divider />
                        <Stack direction="row" spacing={5}>
                          <FormControl>
                            <FormLabel mb={2}>Smoking Allowed</FormLabel>
                            <SwitchControl name="smokingAllowed" />
                          </FormControl>
                          <FormControl>
                            <FormLabel mb={2}>Pets Allowed</FormLabel>
                            <SwitchControl name="petsAllowed" />
                          </FormControl>
                        </Stack>
                      </Stack>
                    </Box>

                    <Heading6 textAlign="center">Define Lease Terms</Heading6>
                    <Box
                      p={8}
                      borderWidth={1}
                      borderRadius={8}
                      boxShadow="md"
                      marginBottom={8}
                    >
                      <Stack spacing={5}>
                        <Stack direction="row" spacing={5}>
                          <Field name="rentalPrice" validate={validateNumber}>
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.rentalPrice &&
                                  form.touched.rentalPrice
                                }
                              >
                                <FormLabel>Rental Price (CAD)</FormLabel>
                                <Input
                                  {...field}
                                  variant="flushed"
                                  borderBottomColor="gray"
                                  placeholder="750"
                                  isRequired
                                />
                                <FormErrorMessage>
                                  {form.errors.rentalPrice}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Box width="100%">
                            <FormLabel>Payment Frequency</FormLabel>
                            <SelectControl
                              name="paymentFrequency"
                              selectProps={{ placeholder: "Select Frequency" }}
                              isRequired
                            >
                              <option value="monthly">Monthly</option>
                              <option value="semester">
                                Semester (4 Months)
                              </option>
                              <option value="twoSemester">
                                Two Semesters (8 Months)
                              </option>
                              <option value="year">Yearly</option>
                            </SelectControl>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={5}>
                          <Box width="100%">
                            <FormLabel>Lease Type</FormLabel>
                            <SelectControl
                              name="leaseType"
                              selectProps={{ placeholder: "Select Lease Type" }}
                              isRequired
                            >
                              <option value="Sublet">Sublet</option>
                              <option value="Lease">Lease</option>
                            </SelectControl>
                          </Box>
                          <Field
                            name="availabilityDate"
                            validate={validateAvailabilityDate}
                          >
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.availabilityDate &&
                                  form.touched.availabilityDate
                                }
                              >
                                <FormLabel>Availability Date</FormLabel>
                                <DatePicker
                                  {...field}
                                  selectedDate={availabilityDate}
                                  onChange={(d: Date) => {
                                    setAvailabilityDate(d);
                                    setFieldValue("availabilityDate", d);
                                  }}
                                  showPopperArrow={false}
                                  placeholderText="MM/DD/YYYY"
                                  minDate={new Date()}
                                />
                                <FormErrorMessage>
                                  {form.errors.availabilityDate}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Stack>
                        <Box width="100%">
                          <FormLabel>Min Lease Duration</FormLabel>
                          <SelectControl
                            name="minLeaseDuration"
                            selectProps={{ placeholder: "Select Duration" }}
                            isRequired
                          >
                            <option value="monthly">Monthly</option>
                            <option value="semester">
                              Semester (4 Months)
                            </option>
                            <option value="twoSemester">
                              Two Semesters (8 Months)
                            </option>
                            <option value="year">Yearly</option>
                          </SelectControl>
                        </Box>
                      </Stack>
                    </Box>

                    <Heading6 textAlign="center">
                      Select All Features Included
                    </Heading6>
                    <Box
                      p={8}
                      borderWidth={1}
                      borderRadius={8}
                      boxShadow="md"
                      marginBottom={8}
                    >
                      <Stack direction="row">
                        <CheckboxContainer
                          name="features"
                          label="Standard Features"
                        >
                          <Stack direction="column">
                            <CheckboxControl name="features" value="bathtub">
                              Bathtub
                            </CheckboxControl>
                            <CheckboxControl name="features" value="bbqReady">
                              BBQ Ready
                            </CheckboxControl>
                            <CheckboxControl name="features" value="carpets">
                              Carpets
                            </CheckboxControl>
                            <CheckboxControl name="features" value="laundry">
                              Laundry
                            </CheckboxControl>
                            <CheckboxControl name="features" value="dishwasher">
                              Dishwasher
                            </CheckboxControl>
                            <CheckboxControl name="features" value="fridge">
                              Fridge
                            </CheckboxControl>
                            <CheckboxControl name="features" value="jacuzzi">
                              Jacuzzi
                            </CheckboxControl>
                            <CheckboxControl name="features" value="microwave">
                              Microwave
                            </CheckboxControl>
                            <CheckboxControl
                              name="features"
                              value="snowRemoval"
                            >
                              Snow Removal
                            </CheckboxControl>
                            <CheckboxControl name="features" value="tv">
                              TV Unit
                            </CheckboxControl>
                            <CheckboxControl
                              name="features"
                              value="wheelchairAccessible"
                            >
                              Wheelchair Accessible
                            </CheckboxControl>
                          </Stack>
                        </CheckboxContainer>
                        <Field name="featureDescription">
                          {({ field, form }: any) => (
                            <FormControl>
                              <FormLabel>
                                Describe Additional Features
                              </FormLabel>
                              <Textarea
                                {...field}
                                borderColor="lightgray"
                                placeholder="Include any additional features not present on the left."
                                height="90%"
                              />
                              <FormErrorMessage>
                                {form.errors.featureDescription}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                    </Box>

                    <Heading6 textAlign="center">
                      Select All Utilities Included
                    </Heading6>
                    <Box
                      p={8}
                      borderWidth={1}
                      borderRadius={8}
                      boxShadow="md"
                      marginBottom={8}
                    >
                      <Stack direction="row">
                        <CheckboxContainer
                          name="utilities"
                          label="Standard Utilities"
                        >
                          <Stack direction="column">
                            <CheckboxControl name="utilities" value="cable">
                              Cable
                            </CheckboxControl>
                            <CheckboxControl
                              name="utilities"
                              value="electricity"
                            >
                              Electricity
                            </CheckboxControl>
                            <CheckboxControl name="utilities" value="heating">
                              Heating
                            </CheckboxControl>
                            <CheckboxControl name="utilities" value="hydro">
                              Hydro
                            </CheckboxControl>
                            <CheckboxControl name="utilities" value="internet">
                              Internet
                            </CheckboxControl>
                            <CheckboxControl
                              name="utilities"
                              value="naturalGas"
                            >
                              Natural Gas
                            </CheckboxControl>
                          </Stack>
                        </CheckboxContainer>
                        <Field name="utilitiesDescription">
                          {({ field, form }: any) => (
                            <FormControl>
                              <FormLabel>
                                Describe Additional Utilities
                              </FormLabel>
                              <Textarea
                                {...field}
                                borderColor="lightgray"
                                placeholder="Include any additional utilities not present on the left."
                                height="90%"
                              />
                              <FormErrorMessage>
                                {form.errors.featureDescription}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                    </Box>

                    <Heading6 textAlign="center">
                      Describe Your Property
                    </Heading6>
                    <Box
                      p={8}
                      borderWidth={1}
                      borderRadius={8}
                      boxShadow="md"
                      marginBottom={8}
                    >
                      <Field name="propertyDescription">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel>Add Description</FormLabel>
                            <Textarea
                              {...field}
                              borderColor="lightgray"
                              placeholder="Include additional information on your property."
                              maxLength="2000"
                              height="200px"
                            />
                            <FormErrorMessage>
                              {form.errors.propertyDescription}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Heading6 textAlign="center">
                      Upload Your Property Photos
                    </Heading6>
                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        setFieldValue("files", acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          p={8}
                          borderWidth={1}
                          borderRadius={8}
                          boxShadow="md"
                          marginBottom={8}
                          borderColor="green"
                        >
                          <input {...getInputProps()} />
                          <Box textAlign="center">
                            Drag and drop files here, or click to select files
                          </Box>
                        </Box>
                      )}
                    </Dropzone>
                    <ButtonPrimary type="submit" isLoading={isSubmitting}>
                      Submit Listing
                    </ButtonPrimary>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default CreateProperty;
