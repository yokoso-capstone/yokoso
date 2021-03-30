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
} from "@chakra-ui/react";
import Head from "next/head";
import { Heading6 } from "@/components/core/Text";
import Sidebar from "@/components/sections/Sidebar";
import ProvinceSelector from "@/components/core/ProvinceSelector";
import { ButtonSecondary } from "@/components/core/Button";
import PropertyRadio from "@/components/core/PropertyRadio";

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

function CreateProperty(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>

      <Flex direction="row" >
        <Sidebar />
        <Flex
          width="full"
          align="center"
          justifyContent="center"
          marginLeft="200px"
        >
          <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
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
                  <PropRadio />
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
                  <RentalRadio />
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
