import React, { useEffect, useState, ReactElement } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Flex,
  Box,
  Divider,
  Stack,
  HStack,
  Radio,
  Text,
  Icon,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { Heading6 } from "@/components/core/Text";
import { ButtonPrimary } from "@/components/core/Button";
import { Formik, Form, Field } from "formik";
import {
  CheckboxContainer,
  CheckboxControl,
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
import DatePicker from "@/components/core/DatePicker";
import Dropzone from "react-dropzone";

function CreateListingView(): ReactElement {
  const [partNum, setPartNum] = useState(0);
  // @ts-ignore
  const [part0Data, setPart0Data] = useState({});
  // @ts-ignore
  const [part1Data, setPart1Data] = useState({});
  const [availabilityDate, setAvailabilityDate] = useState<Date>();

  const content = [
    <Part0 key={0} setPartNum={setPartNum} setPart0Data={setPart0Data} />,
    <Part1
      key={1}
      availabilityDate={availabilityDate}
      setAvailabilityDate={setAvailabilityDate}
      setPart1Data={setPart1Data}
    />,
  ][partNum];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [partNum]);

  return content;
}

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

function validateAvailabilityDate(date: any) {
  let error;

  if (!date) {
    error = "Please enter availability date";
  }
  return error;
}

const initialValuesPart0 = {
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

const initialValuesPart1 = {
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

const Part0 = (props: {
  setPartNum: React.Dispatch<React.SetStateAction<number>>;
  setPart0Data: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}) => {
  const { setPartNum, setPart0Data } = props;

  return (
    <Flex width="full" justifyContent="center">
      <Box
        border="1px solid #E9EEF4"
        borderRadius="8px"
        boxShadow="md"
        background="white"
      >
        <Box textAlign="left" padding={8}>
          <Formik
            initialValues={initialValuesPart0}
            onSubmit={(values) => {
              setPart0Data(values);
              setPartNum(1);
            }}
          >
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
  );
};

const Part1 = (props: {
  availabilityDate: Date | undefined;
  setAvailabilityDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setPart1Data: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}) => {
  const { availabilityDate, setAvailabilityDate, setPart1Data } = props;

  return (
    <Flex width="full" justifyContent="center">
      <Box
        border="1px solid #E9EEF4"
        borderRadius="8px"
        boxShadow="md"
        background="white"
      >
        <Box textAlign="left" padding={8}>
          <Formik
            initialValues={initialValuesPart1}
            onSubmit={(values, actions) => {
              setPart1Data(values);
              // TODO: submit to db
              actions.setSubmitting(false);
            }}
          >
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
                              isInvalid={form.errors.size && form.touched.size}
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
                          <option value="semi-furnished">Semi-Furnished</option>
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
                          <option value="semester">Semester (4 Months)</option>
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
                          <CheckboxControl name="features" value="snowRemoval">
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
                            <FormLabel>Describe Additional Features</FormLabel>
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
                          <CheckboxControl name="utilities" value="electricity">
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
                          <CheckboxControl name="utilities" value="naturalGas">
                            Natural Gas
                          </CheckboxControl>
                        </Stack>
                      </CheckboxContainer>
                      <Field name="utilitiesDescription">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel>Describe Additional Utilities</FormLabel>
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

                  <Heading6 textAlign="center">Describe Your Property</Heading6>
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
  );
};

export default CreateListingView;
