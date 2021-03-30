import React from "react";
import { Flex, chakra, Stack, Icon } from "@chakra-ui/react";
import {
  BsFillPersonFill,
  BsFillHouseDoorFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { ButtonPrimary, SideBarButton } from "@/components/core/Button";
import { LogoWhite } from "@/components/core/Branding";

const LogOutButton = chakra(ButtonPrimary, {
  baseStyle: {
    bg: "transparent",
    marginBottom: "32px",
    fontWeight: "bold",
    width: "80%",
    _hover: { bg: "gray" },
  },
});

const Sidebar = () => (
  <Flex
    as="nav"
    paddingTop="32px"
    bg="black"
    color="white"
    width="200px"
    height="100vh"
    direction="column"
    position="fixed"
  >
    <Flex justify="center" paddingBottom="32px" >
      <LogoWhite width="100px" background="black" />
    </Flex>
    
    <Flex
      direction="column"
      height="100%"
      justify="space-between"
      align="center"
    >
      <Stack direction="column" spacing={2} width="100%">
        <SideBarButton leftIcon={<Icon as={BsFillHouseDoorFill} />}>
          Listings
        </SideBarButton>
        <SideBarButton leftIcon={<Icon as={BsFillPersonFill} />}>
          Tenants
        </SideBarButton>
        <SideBarButton leftIcon={<Icon as={BsFillChatDotsFill} />}>
          Chat
        </SideBarButton>
      </Stack>
      <LogOutButton borderColor="white">Log out</LogOutButton>
    </Flex>
  </Flex>
);

export default Sidebar;