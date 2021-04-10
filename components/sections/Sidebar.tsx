import React, { Dispatch, SetStateAction } from "react";
import NextLink from "next/link";
import { chakra, Flex, Icon, Link } from "@chakra-ui/react";
import {
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { ButtonPrimary, SideBarButton } from "@/components/core/Button";
import { LogoWhite } from "@/components/core/Branding";
import RoutePath from "@/src/routes";
import { DashboardDisplay } from "@/src/enum";
import { auth } from "@/src/firebase";

interface SidebarProps {
  activeDashboardType: DashboardDisplay;
  setDashboardType: Dispatch<SetStateAction<DashboardDisplay>>;
}

const LogOutButton = chakra(ButtonPrimary, {
  baseStyle: {
    bg: "transparent",
    marginBottom: "32px",
    fontWeight: "bold",
    width: "80%",
    _hover: { background: "common.dark" },
    _active: { background: "transparent" },
  },
});

const Sidebar = (props: SidebarProps) => {
  const { activeDashboardType, setDashboardType } = props;
  const sideButtons: {
    dashboardType: DashboardDisplay;
    label: string;
    icon: IconType;
  }[] = [
    {
      dashboardType: DashboardDisplay.Listings,
      label: "Listings",
      icon: BsFillHouseDoorFill,
    },
    {
      dashboardType: DashboardDisplay.Tenants,
      label: "Tenants",
      icon: BsFillPersonFill,
    },
    {
      dashboardType: DashboardDisplay.Chat,
      label: "Chat",
      icon: BsFillChatDotsFill,
    },
  ];

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
      <Flex justify="center" marginBottom="32px">
        <NextLink href={RoutePath.Home} passHref>
          <Link>
            <LogoWhite width="100px" background="black" />
          </Link>
        </NextLink>
      </Flex>

      <Flex
        direction="column"
        height="100%"
        justify="space-between"
        align="center"
      >
        <Flex direction="column" width="100%">
          {sideButtons.map((sideButtonData) => (
            <SideBarButton
              key={sideButtonData.dashboardType}
              borderLeftColor={
                activeDashboardType === sideButtonData.dashboardType
                  ? "brand.primary"
                  : "transparent"
              }
              background={
                activeDashboardType === sideButtonData.dashboardType
                  ? "common.dark"
                  : "transparent"
              }
              onClick={() => setDashboardType(sideButtonData.dashboardType)}
              leftIcon={
                <Icon
                  as={sideButtonData.icon}
                  width={4}
                  height={4}
                  marginRight="6px"
                />
              }
            >
              {sideButtonData.label}
            </SideBarButton>
          ))}
        </Flex>
        <LogOutButton borderColor="white" onClick={() => auth.signOut()}>
          Log out
        </LogOutButton>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
