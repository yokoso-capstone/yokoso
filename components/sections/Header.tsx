import React, { ReactElement } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  useDisclosure,
  Box,
  ButtonProps,
  Flex,
  Link,
  Stack,
  IconButton,
  Image,
  Divider,
  Center
} from "@chakra-ui/react";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { LogoWhite, LogoBlack } from "@/components/core/Branding";
import { ContainerPrimary } from "@/components/core/Layout";
import SearchInput from "@/components/core/SearchInput";
import HamburgerMenu from "react-hamburger-menu";

import Login from "@/components/sections/Login";
import Signup from "@/components/sections/Signup";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import RoutePath, { RoutePathDashboard } from "@/src/routes";

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

  const [user] = useAuthState(auth);
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push(RoutePath.Dashboard);
    } else {
      onOpenLogin();
    }
  };

  const handlePostListing = () => {
    if (user) {
      router.push(`${RoutePath.Dashboard}/${RoutePathDashboard.Create}`);
    } else {
      onOpenLogin();
    }
  };

  return (
    <>
      <Login
        isOpen={isOpenLogin}
        onClose={onCloseLogin}
        onOpenSignUp={onOpenSignUp}
      />
      <Signup
        isOpen={isOpenSignUp}
        onClose={onCloseSignUp}
        onOpenLogIn={onOpenLogin}
      />

      <Box
        as="nav"
        bg={background}
        boxShadow="md"
        width="100%"
        zIndex={100}
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
                />
              )}
            </Box>

            <Stack
              spacing="12px"
              direction="row"
              display={["none", "none", "none", "flex"]}
            >
              <ButtonSecondary
                {...(darkTheme && darkThemeSecondaryButtonProps)}
                onClick={handlePostListing}
              >
                Post Listing
              </ButtonSecondary>
              <ButtonPrimary
                {...(darkTheme && darkThemePrimaryButtonProps)}
                onClick={handleGetStarted}
              >
                Get Started
              </ButtonPrimary>
              <Center height="50px">
                <Divider orientation="vertical" />
              </Center>
              {user && (
                <IconButton
                  aria-label="Profile"
                  width="44px"
                  height="44px"
                  isRound
                  icon={
                    <Image
                      borderRadius="full"
                      src="https://placekitten.com/300/300"
                    />
                  }
                />
              )}
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
    </>
  );
}

export default Header;
