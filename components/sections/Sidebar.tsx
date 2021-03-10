import React from "react";
import { Flex, Button, Stack, Heading, Icon } from "@chakra-ui/react";
import {
  BsFillPersonFill,
  BsFillHouseDoorFill,
  BsFillChatDotsFill,
} from "react-icons/bs";

const Sidebar = () => (
  <Flex
    as="nav"
    align="left"
    padding="0rem"
    bg="black"
    color="white"
    width="10vw"
    height="100vh"
    direction="column"
  >
    <Stack spacing={50}
    // align="center"
    >
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

      <Stack
        direction="column"
        spacing={3}
        width="100%"
        justify="flex-start"
        align="flex-start"
      >
        <Button
          paddingLeft={0}
          width="100%"
          leftIcon={<Icon as={BsFillHouseDoorFill} />}
          bg="transparent"
          rounded="none"
          fontWeight="bold"
          _hover={{ bg: "gray" }}
        >
          Listings
        </Button>
        <Button
          paddingLeft={0}
          width="100%"
          leftIcon={<Icon as={BsFillPersonFill} />}
          bg="transparent"
          rounded="none"
          fontWeight="bold"
          _hover={{ bg: "gray" }}
        >
          Tenants
        </Button>
        <Button
          paddingLeft={0}
          width="100%"
          leftIcon={<Icon as={BsFillChatDotsFill} />}
          bg="transparent"
          rounded="none"
          fontWeight="bold"
          _hover={{ bg: "gray", borderLeft: "10px", borderLeftColor: "red" }}
        >
          Chat
        </Button>
        <Button
          bg="transparent"
          fontWeight="bold"
          _hover={{ bg: "gray" }}
          borderColor="white"
          border="1px"
          width="8vw"
        >
          Log out
        </Button>
      </Stack>
    </Stack>
  </Flex>
);

export default Sidebar;
