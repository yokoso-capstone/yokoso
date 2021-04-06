import React, { ReactElement } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { ButtonPrimary } from "@/components/core/Button";
import { LogoWhite, LogoBlack } from "@/components/core/Branding";
import SearchInput from "@/components/core/SearchInput";

interface HeaderProps {
  darkTheme: boolean;
  searchInput: boolean;
  isWide: boolean;
}

function Header(props: HeaderProps): ReactElement {
  const { darkTheme, searchInput, isWide } = props;
  const Logo = darkTheme ? LogoWhite : LogoBlack;
  const background = darkTheme ? "black" : "white";
  const buttonBorder = darkTheme ? "white" : "";
  const margin = isWide ? "84px" : "64px";

  return (
    <Flex
      as="nav"
      align="center"
      justify={["center", "center", "center", "space-between", "space-between"]}
      wrap="wrap"
      padding={["8px", "8px", "8px", "1rem", "1rem"]}
      bg={background}
      height={["170px", "170px", "170px", "78px", "78px"]}
      boxShadow="md"
      maxWidth="100%"
      position="sticky"
    >
      <Flex
        align="center"
        direction="row"
        display={["none", "none", "none", "block", "block"]}
      >
        <Logo width="150px" marginLeft={margin} />
      </Flex>

      <Flex
        align="center"
        direction="row"
        display={["none", "none", "none", "block", "block"]}
        width={[0, 0, 0, 300, 400, 500]}
      >
        {searchInput && (
          <SearchInput
            placeholder="Where are you staying?"
            ariaLabel="Search for homes based on location"
            onSubmit={() => undefined}
          />
        )}
      </Flex>

      <Stack
        spacing={3}
        direction="row"
        display={["none", "none", "none", "block", "block"]}
        marginRight={margin}
      >
        <ButtonPrimary>Post Listing</ButtonPrimary>
        <ButtonPrimary borderColor={buttonBorder}>Get Started</ButtonPrimary>
      </Stack>

      {/* Smaller screen size display */}
      <Stack
        spacing={2}
        direction="column"
        display={["block", "block", "block", "none", "none"]}
      >
        <Flex justify="center">
          <Logo width="150px" background={background} />
        </Flex>
        <Flex align="center">
          {searchInput && (
            <SearchInput
              placeholder="Where are you staying?"
              ariaLabel="Search for homes based on location"
              onSubmit={() => undefined}
            />
          )}
        </Flex>
        <Stack spacing={2} justify="center" direction="row">
          <ButtonPrimary>Post Listing</ButtonPrimary>
          <ButtonPrimary borderColor={buttonBorder}>Get Started</ButtonPrimary>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Header;
