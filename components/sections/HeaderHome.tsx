import React from "react";
import { chakra, Flex, Stack } from "@chakra-ui/react";
import { ButtonPrimary } from "@/components/core/Button";
import { LogoWhite } from "@/components/core/Branding";

const HeaderButton = chakra(ButtonPrimary, {
  baseStyle: {
    bg: "black",
    _hover: { bg: "gray" },
  },
});

const HeaderHome = () => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    padding="2rem"
    bg="black"
  >
    <Flex align="center" direction="row">
      <LogoWhite width="150px" background="black" marginLeft="64px" />
    </Flex>

    <Stack spacing={3} direction="row" marginRight="64px">
      <HeaderButton>Post Listing</HeaderButton>
      <HeaderButton borderColor="white">Get Started</HeaderButton>
    </Stack>
  </Flex>
);

export default HeaderHome;
