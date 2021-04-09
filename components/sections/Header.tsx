import React, { ReactElement } from "react";
import NextLink from "next/link";
import {
  useDisclosure,
  Box,
  ButtonProps,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { LogoWhite, LogoBlack } from "@/components/core/Branding";
import { ContainerPrimary } from "@/components/core/Layout";
import SearchInput from "@/components/core/SearchInput";
import HamburgerMenu from "react-hamburger-menu";

const darkThemeSecondaryButtonProps: ButtonProps = {
  color: "white",
  background: "black",
  _hover: { background: "common.dark" },
  _active: { background: "black" },
};

const darkThemePrimaryButtonProps: ButtonProps = {
  ...darkThemeSecondaryButtonProps,
  borderColor: "white",
};

interface HeaderProps {
  darkTheme?: boolean;
  searchInput?: boolean;
  maxWidth?: string | string[];
  paddingX?: string | string[];
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
}

function Header(props: HeaderProps): ReactElement {
  const { darkTheme, searchInput, maxWidth, paddingX, position } = props;
  const Logo = darkTheme ? LogoWhite : LogoBlack;
  const background = darkTheme ? "black" : "white";

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      as="nav"
      bg={background}
      boxShadow="md"
      width="100%"
      zIndex={10000}
      position={position || "sticky"}
      top={0}
      paddingY="1rem"
    >
      <ContainerPrimary
        {...(maxWidth && { maxWidth })}
        {...(paddingX && { paddingX })}
      >
        <Flex
          marginX="auto"
          direction="row"
          align="center"
          justify="space-between"
        >
          <NextLink href="/" passHref>
            <Link>
              <Logo height="32px" />
            </Link>
          </NextLink>

          <Box
            display={["none", "none", "none", "block"]}
            width={[300, 300, 275, 300, 400]}
          >
            {searchInput && (
              <SearchInput
                placeholder="Where are you staying?"
                ariaLabel="Search for homes based on location"
                onSubmit={() => undefined}
              />
            )}
          </Box>

          <Stack
            spacing="12px"
            direction="row"
            display={["none", "none", "none", "block"]}
          >
            <ButtonSecondary {...(darkTheme && darkThemeSecondaryButtonProps)}>
              Post Listing
            </ButtonSecondary>
            <ButtonPrimary {...(darkTheme && darkThemePrimaryButtonProps)}>
              Get Started
            </ButtonPrimary>
          </Stack>
          <Box display={["block", "block", "block", "none"]} cursor="pointer">
            {/* TODO: show overlay with options (search, post listing, and get started) */}
            <HamburgerMenu
              isOpen={isOpen}
              menuClicked={onToggle}
              height={18}
              width={28}
              strokeWidth={3}
              rotate={180}
              color={darkTheme ? "white" : "black"}
            />
          </Box>
        </Flex>
      </ContainerPrimary>
    </Box>
  );
}

export default Header;
