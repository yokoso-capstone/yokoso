import React, { ReactElement } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Flex,
  Box,
  Stack,
  Radio,
  RadioGroup,
  Switch,
} from "@chakra-ui/react";
import Head from "next/head";
import { Heading6 } from "@/components/core/Text";
import Sidebar from "@/components/sections/Sidebar";
import ProvinceSelector from "@/components/core/ProvinceSelector";
import { ButtonSecondary } from "@/components/core/Button";

function CreateProperty(): ReactElement {
  const [propertyValue, setPropertyValue] = React.useState("1");
  const [rentalValue, setRentalValue] = React.useState("1");
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>

      <Flex direction="row">
        <Sidebar />
        <Flex width="full" align="center" justifyContent="center">
          <Box
            p={8}
            // maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Box my={4} textAlign="left">
              <form>
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
                  <RadioGroup onChange={setPropertyValue} value={propertyValue}>
                    <Stack
                      direction="row"
                      spacing={8}
                      justifyContent="space-between"
                    >
                      <Radio value="1">Apartment</Radio>
                      <Radio value="2">House</Radio>
                      <Radio value="3">Townhouse</Radio>
                    </Stack>
                  </RadioGroup>
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
                  justifyContent="center"
                >
                  <RadioGroup onChange={setRentalValue} value={rentalValue}>
                    <Stack
                      direction="row"
                      spacing={8}
                      justifyContent="space-between"
                    >
                      <Radio value="1">Entire Building</Radio>
                      <Radio value="2">Partial Building</Radio>
                      <Radio value="3">Single Room</Radio>
                    </Stack>
                  </RadioGroup>
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
                    <FormControl>
                      <FormLabel>Street Address</FormLabel>
                      <Input
                        variant="flushed"
                        borderBottomColor="gray"
                        placeholder="Belleview Drive"
                        isRequired
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Unit Number</FormLabel>
                      <Input
                        variant="flushed"
                        borderBottomColor="gray"
                        placeholder="88"
                        width="50%"
                        isRequired
                      />
                    </FormControl>
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
                    <Box width="50%">
                      <FormLabel>Postal Code</FormLabel>
                      <Input isRequired placeholder="A2B 3C4" />
                    </Box>
                    <Box width="50%">
                      <FormLabel>City</FormLabel>
                      <Input isRequired placeholder="Ottawa" />
                    </Box>
                  </Stack>
                </Box>
                <Box display="flex" justifyContent="center">
                  <ButtonSecondary type="submit" width="50%">
                    Next
                  </ButtonSecondary>
                </Box>
              </form>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default CreateProperty;
