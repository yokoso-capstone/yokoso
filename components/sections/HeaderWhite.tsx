import React from "react";
import { chakra, Flex, Stack } from "@chakra-ui/react";
import { ButtonPrimary } from "@/components/core/Button";
import { LogoBlack } from "@/components/core/Branding";

import SearchInput from "@/components/core/SearchInput";

const HeaderButton = chakra(ButtonPrimary, {
  baseStyle: {
    bg: "black",
    _hover: { bg: "gray" },
  },
});

const Header = () => (
  <>
    <Flex
      as="nav"
      align="center"
      justify={["center", "center", "center", "space-between", "space-between"]}
      wrap="wrap"
      padding={["8px", "8px", "8px", "1rem", "1rem"]}
      bg="white"
      height={["170px", "170px", "170px", "78px", "78px"]}
    >
      <Flex
        align="center"
        direction="row"
        display={["none", "none", "none", "block", "block"]}
      >
        <LogoBlack width="150px" marginLeft="64px" />
      </Flex>

      <Flex
        align="center"
        direction="row"
        display={["none", "none", "none", "block", "block"]}
        width={[0, 0, 0, 300, 400, 500]}
      >
        <SearchInput
          placeholder="Where are you staying?"
          ariaLabel="Search for homes based on location"
          onSubmit={() => undefined}
        />
      </Flex>

      <Stack
        spacing={3}
        direction="row"
        marginRight="64px"
        display={["none", "none", "none", "block", "block"]}
      >
        <HeaderButton bg="white" color="black">Post Listing</HeaderButton>
        <HeaderButton borderColor="white">Get Started</HeaderButton>
      </Stack>

      {/* Smaller screen size display */}
      <Stack
        spacing={2}
        direction="column"
        display={["block", "block", "block", "none", "none"]}
      >
        <Flex justify="center">
          <LogoBlack width="150px" />
        </Flex>
        <Flex align="center" >
          <SearchInput
            placeholder="Where are you staying?"
            ariaLabel="Search for homes based on location"
            onSubmit={() => undefined}
          />
        </Flex>
        <Stack spacing={2} justify="center" direction="row">
          <HeaderButton bg="white" color="black">Post Listing</HeaderButton>
          <HeaderButton borderColor="white">Get Started</HeaderButton>
        </Stack>
      </Stack>
    </Flex>
  </>
);

export default Header;
