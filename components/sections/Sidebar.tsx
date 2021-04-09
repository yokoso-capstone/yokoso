import React from "react";
import { Flex, chakra, Stack, Icon } from "@chakra-ui/react";
import {
  BsFillPersonFill,
  BsFillHouseDoorFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { ButtonPrimary, SideBarButton } from "@/components/core/Button";
import { LogoWhite } from "@/components/core/Branding";

interface SidebarProps {
  onClickTenant?: () => any;
  onClickLandlord?: () => any;
  onClickChat?: () => any;
}

const LogOutButton = chakra(ButtonPrimary, {
  baseStyle: {
    bg: "transparent",
    marginBottom: "32px",
    fontWeight: "bold",
    width: "80%",
    _hover: { bg: "gray" },
  },
});

const Sidebar = (props: SidebarProps) => {
  const { onClickTenant, onClickLandlord, onClickChat } = props;
  return (
    <Flex
      as="nav"
      paddingTop="32px"
      bg="black"
      color="white"
      width="200px"
      height="100%"
      direction="column"
      position="fixed"
    >
      <Flex justify="center" paddingBottom="32px">
        <LogoWhite width="100px" background="black" />
      </Flex>

      <Flex
        direction="column"
        height="100%"
        justify="space-between"
        align="center"
      >
        <Stack direction="column" spacing={2} width="100%">
          <SideBarButton
            onClick={onClickLandlord}
            leftIcon={<Icon as={BsFillHouseDoorFill} />}
          >
            Listings
          </SideBarButton>
          <SideBarButton
            onClick={onClickTenant}
            leftIcon={<Icon as={BsFillPersonFill} />}
          >
            Tenants
          </SideBarButton>
          <SideBarButton
            onClick={onClickChat}
            leftIcon={<Icon as={BsFillChatDotsFill} />}
          >
            Chat
          </SideBarButton>
        </Stack>
        <LogOutButton borderColor="white">Log out</LogOutButton>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
