import React from "react";
import { chakra, Flex, Button, Stack, Heading, Icon } from "@chakra-ui/react";
import {
  BsFillPersonFill,
  BsFillHouseDoorFill,
  BsFillChatDotsFill,
} from "react-icons/bs";

const SideButton = chakra(Button, {
  baseStyle: {
    paddingLeft: "8px",
    width: "100%",
    bg: "transparent",
    rounded: "none",
    fontWeight: "bold",
    justifyContent: "start",
    borderLeft: "4px",
    borderLeftColor: "transparent",
    _hover: { bg: "gray", borderLeftColor: "red" },
  },
});

const Sidebar = () => (
  <Flex
    as="nav"
    align="left"
    paddingTop="32px"
    bg="black"
    color="white"
    width="200px"
    height="100vh"
    direction="column"
  >
    <Stack align="center" paddingBottom="32px">
      <Flex>
        <Heading letterSpacing="-.1rem" color="white">
          Y
        </Heading>
        <Heading letterSpacing="-.1rem" color="red">
          o
        </Heading>
        <Heading letterSpacing="-.1rem" color="white">
          koso
        </Heading>
      </Flex>
    </Stack>

    <Flex
      direction="column"
      height="100%"
      justify="space-between"
      align="center"
    >
      <Stack direction="column" spacing={2} width="100%">
        <SideButton leftIcon={<Icon as={BsFillHouseDoorFill} />}>
          Listings
        </SideButton>
        <SideButton leftIcon={<Icon as={BsFillPersonFill} />}>
          Tenants
        </SideButton>
        <SideButton leftIcon={<Icon as={BsFillChatDotsFill} />}>
          Chat
        </SideButton>
      </Stack>
      <Button
        bg="transparent"
        fontWeight="bold"
        _hover={{ bg: "gray" }}
        borderColor="white"
        border="1px"
        width="80%"
        marginBottom="16px"
      >
        Log out
      </Button>
    </Flex>
  </Flex>
);

export default Sidebar;
