import React from "react";
import { Box, Heading, Flex, Button, Stack, Image } from "@chakra-ui/react";

const Header = () => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    padding="2rem"
    bg="white"
    color="black"
    borderBottom="1px solid black"
  >
    <Flex align="center" direction="row">
      <Box>
        <Image src="/logo.png" />
      </Box>
    </Flex>

    <Stack spacing={3} direction="row">
      <Button bg="transparent" border="1px">
        Login
      </Button>
      <Button bg="transparent" border="1px">
        Sign Up
      </Button>
    </Stack>
  </Flex>
);

export default Header;
