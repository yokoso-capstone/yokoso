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
    justify={[
      "center",
      "center",
      "space-between",
      "space-between",
      "space-between",
    ]}
    wrap="wrap"
    padding={["8px", "8px", "1rem", "1rem", "1rem"]}
    bg="black"
    height={["110px", "110px", "78px", "78px", "78px"]}
    position="absolute"
    w="100%"
  >
    <Flex
      align="center"
      direction="row"
      display={["none", "none", "block", "block", "block"]}
    >
      <LogoWhite width="150px" background="black" marginLeft="64px" />
    </Flex>

    <Stack
      spacing={3}
      direction="row"
      marginRight="64px"
      display={["none", "none", "block", "block", "block"]}
    >
      <HeaderButton>Post Listing</HeaderButton>
      <HeaderButton borderColor="white">Get Started</HeaderButton>
    </Stack>

    {/* Smaller screen size display */}
    <Stack
      spacing={2}
      direction="column"
      display={["block", "block", "none", "none", "none"]}
    >
      <Flex justify="center">
        <LogoWhite width="150px" background="black" />
      </Flex>
      <Stack spacing={2} justify="center" direction="row">
        <HeaderButton>Post Listing</HeaderButton>
        <HeaderButton borderColor="white">Get Started</HeaderButton>
      </Stack>
    </Stack>
  </Flex>
);

export default HeaderHome;
