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
  <>
    <Flex
      as="nav"
      align="center"
      justify={["center", "center", "center", "space-between", "space-between"]}
      wrap="wrap"
      padding={["8px", "8px", "1rem", "2rem", "2rem"]}
      bg="black"
    >
      <Flex
        align="center"
        direction="row"
        display={["none", "none", "none", "block", "block"]}
      >
        <LogoWhite width="150px" background="black" marginLeft="64px" />
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
        <HeaderButton>Post Listing</HeaderButton>
        <HeaderButton borderColor="white">Get Started</HeaderButton>
      </Stack>

      {/* Smaller screen size display */}
      <Stack
        spacing={3}
        direction="column"
        display={["block", "block", "block", "none", "none"]}
      >
        <Flex justify="center">
          <LogoWhite width="150px" background="black" />
        </Flex>
        <Flex align="center">
          <SearchInput
            placeholder="Where are you staying?"
            ariaLabel="Search for homes based on location"
            onSubmit={() => undefined}
          />
        </Flex>
        <Stack justify="center" direction="row">
          <HeaderButton>Post Listing</HeaderButton>
          <HeaderButton borderColor="white">Get Started</HeaderButton>
        </Stack>
      </Stack>
    </Flex>
  </>
);

export default Header;
