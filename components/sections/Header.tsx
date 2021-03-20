import React from "react";
import { chakra, Flex, Stack } from "@chakra-ui/react";
import { ButtonPrimary } from "@/components/core/Button";
import { LogoWhite } from "@/components/core/Branding";

import SearchInput from "@/components/core/SearchInput";

const HeaderButton = chakra(ButtonPrimary, {
  baseStyle: {
    bg: "black",
    _hover: { bg: "gray" },
  },
});

const Header = () => (
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

    <Flex align="center" direction="row">
      <SearchInput
        placeholder="Where are you staying?"
        ariaLabel="Search for homes based on location"
        onSubmit={() => undefined}
      />
    </Flex>

    <Stack spacing={3} direction="row" marginRight="64px">
      <HeaderButton>Post Listing</HeaderButton>
      <HeaderButton borderColor="white">Get Started</HeaderButton>
    </Stack>
  </Flex>
);

export default Header;
