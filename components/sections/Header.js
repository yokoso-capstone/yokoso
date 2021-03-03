import React from "react";
import { Box, Heading, Flex, Text, Button, Stack, Divider, Image } from "@chakra-ui/react";

const Header = () => {
  return (
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
        <Flex align="center" isInline>
            <Box>
                <Image src='@/components/img/logo.png' />
            </Box>
            <Heading letterSpacing={"-.1rem"} color="black">
                Y
            </Heading>
            <Heading letterSpacing={"-.1rem"} color="red">
                o
            </Heading>
            <Heading letterSpacing={"-.1rem"} color="black">
                koso
            </Heading>
        </Flex>
        
        <Stack spacing={3} isInline >
            <Button bg="transparent" border="1px">
                Login
            </Button>
            <Button bg="transparent" border="1px">
                Sign Up
            </Button>
        </Stack>
    </Flex>
  );
};

export default Header;
